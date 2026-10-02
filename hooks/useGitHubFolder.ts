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
} from "@/lib/gitHub";
import {useGitHubPatAuth} from "@/hooks/useGitHubPatAuth";
import {toast} from "sonner";

const EMPTY_FILES: GitHubContent[] = [];
export function useGitHubFolder(
  folderPath?: string,
){
  const queryClient = useQueryClient();
  const normalizedFolderPath = folderPath?.replace(/^\/+|\/+$/g, "") ?? "";

  const {
    gitHubPat,
    gitHubSession,
  } = useGitHubPatAuth();

  const {
    data: files,
    isLoading: loadingFiles,
  } = useQuery({
    queryKey: ["gitHub-folder", normalizedFolderPath],
    queryFn: async () => {
      try {
        return await listGitHubFiles(
          gitHubPat ?? "",
          gitHubSession!.repository!.full_name ?? "",
          normalizedFolderPath
        )
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : typeof error === "string" ? error : `Something went wrong!`;
        toast.error(errorMessage);
        return EMPTY_FILES;
      }
    },
    enabled: !!gitHubPat && !!gitHubSession && gitHubSession!.user && !!gitHubSession!.repository,
  });

  const {
    mutateAsync: deleteFiles,
    isPending: deletingFiles
  } = useMutation({
    mutationFn: async (fileNames: string[]) => await deleteGitHubFiles(
      gitHubPat ?? "",
      gitHubSession!.repository!.full_name ?? "",
      normalizedFolderPath,
      fileNames
    ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["gitHub-folder", normalizedFolderPath],
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
      gitHubPat ?? "",
      gitHubSession!.repository!.full_name,
      normalizedFolderPath,
      files
    ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["gitHub-folder", normalizedFolderPath],
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
