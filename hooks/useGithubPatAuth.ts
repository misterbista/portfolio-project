import {useState} from "react";
import {useMutation} from "@tanstack/react-query";

export function useGithubPatAuth(
) {
  const [token, setToken] = useState<string | null>(() => {
    if(typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem("ghPat");
  });

  const setGithubPat = (newToken: string | null) => {
    if (typeof window === "undefined") {
      setToken(newToken);
      return;
    }
    if (newToken) {
      localStorage.setItem("ghPat", newToken);
    } else {
      localStorage.removeItem("ghPat");
    }
    setToken(newToken);
  };

  const {
    mutateAsync,
    isPending
  } = useMutation({
    mutationKey: ["ghPat validation"],
    mutationFn: async (pat: string) => validateGitHubToken(pat)
  });

  return {
    githubPat: token,
    setGithubPat,
    validatePat: mutateAsync,
    isValidating: isPending,
  };
}

async function validateGitHubToken(token: string) {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (response.ok) {
    const user = await response.json();
    return {
      valid: true,
      login: user.login,
      id: user.id,
    };
  }

  if (response.status === 401) {
    return { valid: false, error: "Invalid or expired token" };
  }

  return {
    valid: false,
    error: `GitHub returned HTTP ${response.status}`,
  };
}
