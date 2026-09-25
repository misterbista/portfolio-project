"use client"

import React from 'react';
import {useGithubPatAuth} from "@/hooks/useGithubPatAuth";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";


function GithubLoginDialog(
  {show, hide}: {
    show: boolean,
    hide: () => void
  }
) {
  const {
    setGithubPat,
    updatingPat
  } = useGithubPatAuth();
  const [pat, setPat] = React.useState("");

  const savePat = async () => {
    try {
      await setGithubPat(pat);
      hide();
    } catch (ex){
      if (ex instanceof Error) {
        toast.error(ex.message);
      } else if (typeof ex === "string") {
        toast.error(ex);
      } else {
        toast.error("Failed to save GitHub PAT");
      }
    }
  };

  return (
    <Dialog open={show} onOpenChange={(open) => {
      if (!open) {
        hide();
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle><b>Login to GitHub</b></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p>To use this application, you need to provide a GitHub Personal Access Token (PAT) with the necessary permissions.</p>
          <p>Please <a className={"underline!"} href={"https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"} target="_blank">generate a token on GitHub</a> and enter it below.</p>
          <Input
            type="password"
            placeholder="Enter your GitHub Personal Access Token"
            value={pat}
            onChange={(e) => setPat(e.target.value)}
          />
          <Button
            className="px-4 py-2 cursor-pointer"
            disabled={!pat}
            onClick={() => savePat()}
          >
            {updatingPat ? <Spinner/> : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GithubLoginDialog;
