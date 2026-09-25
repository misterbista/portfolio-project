import {useState} from "react";

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  permissions?: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  };
};

type GitHubPatValidation = {
  valid: boolean;
  repository?: GitHubRepo;
  error?: string;
};

export function useGithubPatAuth(
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

  const setGithubPat = async (newToken: string | null) => {
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

    const validation = await validateGitHubToken(newToken);

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
    updatingPat: updating
  };
}

async function validateGitHubToken(
  token: string,
) {
  const response = await fetch(
    "https://api.github.com/user/repos?per_page=100",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (response.status === 401) {
    return {
      valid: false,
      error: "Invalid or expired token",
    };
  }

  if (!response.ok) {
    return {
      valid: false,
      error: `GitHub returned HTTP ${response.status}`,
    };
  }

  const repos = (await response.json()) as GitHubRepo[];

  const writableRepos = repos.filter(
    (repo) => repo.permissions?.push === true
  );

  if (writableRepos.length !== 1) {
    return {
      valid: false,
      error: `Token has write access to more than one repository. Please use a Token limited to just one repository.`,
    };
  }

  return {
    valid: true,
    repository: writableRepos[0],
  };
}

