import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteGitHubFiles,
  GitHubContent,
  GitHubCreateFileRequest,
  listGitHubFiles,
  uploadGitHubFiles
} from "@/lib/github";
import {useGithubPatAuth} from "@/hooks/useGithubPatAuth";
import {toast} from "sonner";

const EMPTY_FILES: GitHubContent[] = [];
export function useGitHubFolder(
  folderPath?: string,
){
  const queryClient = useQueryClient();
  const normalizedFolderPath = folderPath?.replace(/^\/+|\/+$/g, "") ?? "";

  const {
    githubPat,
    githubSession,
  } = useGithubPatAuth();

  const {
    data: files,
    isLoading: loadingFiles,
  } = useQuery({
    queryKey: ["github-folder", normalizedFolderPath],
    queryFn: async () => {
      try {
        await listGitHubFiles(
          githubPat ?? "",
          githubSession!.user!.login ?? "",
          githubSession!.repository!.name ?? "",
          normalizedFolderPath
        )
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : typeof error === "string" ? error : `Something went wrong!`;
        toast.error(errorMessage);
        return EMPTY_FILES;
      }
    },
    enabled: !!githubPat && !!githubSession && githubSession!.user && !!githubSession!.repository && !!normalizedFolderPath,
  });

  const {
    mutateAsync: deleteFiles,
    isPending: deletingFiles
  } = useMutation({
    mutationFn: async (fileNames: string[]) => await deleteGitHubFiles(
      githubPat ?? "",
      githubSession!.user!.login ?? "",
      githubSession!.repository!.name ?? "",
      normalizedFolderPath,
      fileNames
    ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["github-folder", normalizedFolderPath],
      });
    },
    onError: async (error) => {
      const errorMessage = error instanceof Error ? error.message : typeof error === "string" ? error : `Something went wrong!`;
      toast.error(errorMessage);
    }
  });

  const {
    mutateAsync: uploadFiles,
    isPending: uploadingFiles
  } = useMutation({
    mutationFn: async (files: GitHubCreateFileRequest[]) => await uploadGitHubFiles(
      githubPat ?? "",
      githubSession!.user!.login,
      githubSession!.repository!.name,
      normalizedFolderPath,
      files
    ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["github-folder", normalizedFolderPath],
      });
    },
    onError: async (error) => {
      const errorMessage = error instanceof Error ? error.message : typeof error === "string" ? error : `Something went wrong!`;
      toast.error(errorMessage);
    }
  });

  return {
    files: files ?? EMPTY_FILES,
    loadingFiles,

    deleteFiles,
    deletingFiles,
    uploadFiles,
    uploadingFiles
  };
}
