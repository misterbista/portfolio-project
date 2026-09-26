"use client"

import React from 'react';
import {Dialog, DialogContent} from "@/components/ui/dialog";
import GitHubFileManager from "@/components/ui/GitHubFileManager";
import {useGitHubPatAuth} from "@/hooks/useGitHubPatAuth";

function AssetManagerDialog(
  {show, setShow}: {
    show: boolean,
    setShow: (show: boolean) => void
  }
) {
  const {gitHubSession} = useGitHubPatAuth();
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent
        style={{
          width: 'auto', maxWidth: '100%',
          height: 'auto', maxHeight: '100%'
        }}
      >
        {gitHubSession ? <GitHubFileManager
          className={"w-2xl h-full"}
          path={"uploads"}
        /> : <span className={"text-gray-500"}>You have not logged in yet. Please log in to use this feature.</span>}
      </DialogContent>
    </Dialog>
  );
}

export default AssetManagerDialog;
