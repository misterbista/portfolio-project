"use client"

import React from 'react';
import {Dialog, DialogContent} from "@/components/ui/dialog";
import GithubFileManager from "@/components/ui/GithubFileManager";
import {useGithubPatAuth} from "@/hooks/useGithubPatAuth";

function AssetManagerDialog(
  {show, setShow}: {
    show: boolean,
    setShow: (show: boolean) => void
  }
) {
  const {githubPat} = useGithubPatAuth();
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent
        style={{
          width: 'auto', maxWidth: '100%',
          height: 'auto', maxHeight: '100%'
        }}
      >
        {githubPat ? <GithubFileManager
          className={"w-2xl h-full"}
          pat={githubPat}
          path={"uploads"}
        /> : <span className={"text-gray-500"}>You have not logged in yet. Please log in to use this feature.</span>}
      </DialogContent>
    </Dialog>
  );
}

export default AssetManagerDialog;
