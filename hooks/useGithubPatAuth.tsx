"use client"

import {createContext, ReactNode, useContext, useState} from "react";

type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
};

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  default_branch: string;
  owner: {
    login: string;
    id: number;
  };
};

type GitHubPatValidation = {
  valid: boolean;
  repository?: GitHubRepo;
  user?: GitHubUser;
  error?: string;
};

const GithubPatContext = createContext<ReturnType<typeof useGithubPatAuthInternal> | null>(null);

export function GithubPatProvider({ children }: { children: ReactNode }) {
  const auth = useGithubPatAuthInternal();
  return (
    <GithubPatContext.Provider value={auth}>
      {children}
    </GithubPatContext.Provider>
  );
}


export function useGithubPatAuth(
) {
  const context = useContext(GithubPatContext);
  if (!context) {
    throw new Error("useGithubPatAuth must be used inside GithubPatProvider");
  }
  return context;
}

function useGithubPatAuthInternal(
) {
  const [updating, setUpdating] = useState(false);

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem("ghPat");
  });

  const [session, setSession] = useState<GitHubPatValidation | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return JSON.parse(localStorage.getItem("ghSession") ?? "null");
  });

  const setGithubPat = async (newToken: string | null, expectedRepositoryName?: string) => {
    setTimeout(() => setUpdating(true), 1);
    if (!newToken) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("ghPat");
        localStorage.removeItem("ghSession");
      }
      setToken(null);
      setSession(null);
      setTimeout(() => setUpdating(false), 1);
      return;
    }

    const validation = await validateGitHubToken(newToken, expectedRepositoryName);

    if (!validation.valid) {
      setTimeout(() => setUpdating(false), 1);
      throw new Error(validation.error ?? "Invalid GitHub PAT");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("ghPat", newToken);
      localStorage.setItem("ghSession", JSON.stringify(validation));
    }
    setToken(newToken);
    setSession(validation);
    setTimeout(() => setUpdating(false), 1);
  };

  return {
    githubPat: token,
    githubSession: session,
    setGithubPat,
    updatingPat: updating,
    clearGithubPat: () => setGithubPat(null)
  };
}

async function validateGitHubToken(
  token: string,
  expectedRepositoryName?: string
) {
  if(!expectedRepositoryName) {
    return {
      valid: false,
      error: 'No repository name was provided. Aborting due to security reasons.'
    };
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2026-03-10",
  };

  const userResponse = await fetch(
    "https://api.github.com/user",
    { headers },
  );

  if (userResponse.status === 401) {
    return {
      valid: false,
      error: "Invalid or expired GitHub token.",
    }
  }

  if (!userResponse.ok) {
    return {
      valid: false,
      error: `Failed to identify GitHub user: HTTP ${userResponse.status}`,
    }
  }

  const user = (await userResponse.json()) as GitHubUser;

  const repositoryParts = expectedRepositoryName
    .trim()
    .split("/")
    .filter(Boolean);

  let owner;
  let repository;

  if (repositoryParts.length === 1) {
    owner = user.login;
    repository = repositoryParts[0];
  } else if (repositoryParts.length === 2) {
    owner = repositoryParts[0];
    repository = repositoryParts[1];
  } else {
    return {
      valid: false,
      error: "Repository must be in the form 'repository' or 'owner/repository'.",
    }
  }

  const repositoryResponse = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`,
    { headers },
  );

  if (repositoryResponse.status === 404) {
    return {
      valid: false,
      error: `Repository '${owner}/${repository}' was not found or is not accessible with this token.`,
    }
  }

  if (repositoryResponse.status === 403) {
    return {
      valid: false,
      error: `GitHub denied access to repository '${owner}/${repository}'.`,
    }
  }

  if (!repositoryResponse.ok) {
    return {
      valid: false,
      error: `Failed to access repository: HTTP ${repositoryResponse.status}`,
    }
  }

  const repositoryData = (await repositoryResponse.json()) as GitHubRepo;

  return {
    valid: true,
    repository: repositoryData,
    user: user
  };
}

