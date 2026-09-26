"use client"

import React from 'react';
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {FileUp} from "lucide-react";
import {Spinner} from "@/components/ui/spinner";
import {Separator} from "@/components/ui/separator";
import {useGitHubFolder} from "@/hooks/useGitHubFolder";

function GitHubFileManager(
  {className, path}: {
    className?: string,
    path: string
  }
) {
  const {
    files,
    loadingFiles
  } = useGitHubFolder(path)
  // design similar UI as https://www.creative-tim.com/ui/block/file-manager
  // but instead of folders it should act as file type filter
  // each file should have the similar option button as folder in that page
  // this option shall allow copying URL, viewing in new tab, downloading, deleting, and validating
  // Validatin will check the file's existance against GitHub these will come handy for files just uploaded. and not yet published by GitHub pages
  // these files will be temporarily stored in local storage right after being uploaded and will be lost on refresh
  // idea is if they are uploaded and published they will come through gh API shortly anyway
  // unverified is a category that lists such local files and won't allow delete. other actions are allowed cause base64 is stored locally
  // This file manager shall list all the files inside public/uploads directory
  // Allow user to download the file, copy the URL, upload the file, delete the file
  // Deleting won't use any smart detection, any existing usage will start failing, so just show a warning before deleting
  // Adding file will expose it to public, so we should show a warning before uploading
  return (
    <div className={cn("p-4", className)}>
      <div className={"flex flex-row justify-between align-center items-center"}>
        <div className={"flex flex-col gap-1"}>
          <span className={"text-xl font-bold"}>
            Asset Manager
          </span>
          <span className={"text-sm text-gray-500"}>
            Organize documents, files, and assets.
          </span>
        </div>
        <div className={"flex flex-col gap-1"}>
          <Button size={"lg"}><FileUp/> Upload Files</Button>
          <span className={"flex flex-nowrap gap-1 align-center items-center"}>
            <Spinner /> Uploading... (1/3)
          </span>
        </div>
      </div>
      <Separator className={"my-3"}/>
      {
        loadingFiles ? <div className={"flex flex-row justify-center align-center items-center"}>
          <Spinner />
        </div> : <div className={"flex flex-col gap-2"}>
          {
            files?.map((file) => (
              <div key={file.name} className={"flex flex-row justify-between align-center items-center p-2 border rounded"}>
                <span>{file.name}</span>
                <div className={"flex flex-row gap-2"}>
                  <Button size={"sm"}>Copy URL</Button>
                  <Button size={"sm"}>View</Button>
                  <Button size={"sm"}>Download</Button>
                  <Button size={"sm"}>Delete</Button>
                  <Button size={"sm"}>Validate</Button>
                </div>
              </div>
            ))
          }
        </div>
      }
    </div>
  );
}

export default GitHubFileManager;
