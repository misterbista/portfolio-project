import React, {useRef} from 'react';
import {Button} from "@/components/ui/button";
import {FileUp} from "lucide-react";
import {Spinner} from "@/components/ui/spinner";
import {GitHubCreateFileRequest} from "@/lib/gitHub";

function FileUploadButton(
  {
    uploadingFiles,
    uploadFiles
  }: {
    uploadingFiles: boolean,
    uploadFiles: (files: GitHubCreateFileRequest[]) => Promise<void>
  }
) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    let ghFiles: GitHubCreateFileRequest[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      ghFiles.push({
        name: file.name,
        content: file,
      });
    }
    await uploadFiles(ghFiles);
  };

  return (<div className={"flex flex-col gap-1"}>
    <input
      ref={fileInputRef}
      type="file"
      multiple
      className="hidden"
      onChange={handleFileSelect}
    />
    <Button
      type="button"
      size={"lg"}
      className={"cursor-pointer"}
      disabled={uploadingFiles}
      onClick={() => fileInputRef.current?.click()}
    >
      <FileUp/> Upload Files
    </Button>
    {uploadingFiles && <span className={"flex flex-nowrap gap-1 align-center items-center"}>
      <Spinner/> Uploading...
    </span>}
  </div>);
}

export default FileUploadButton;
