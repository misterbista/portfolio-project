"use client"

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {LockIcon, UnlockIcon} from "lucide-react";
import {useGitHubPatAuth} from "@/hooks/useGitHubPatAuth";
import GitHubLoginDialog from "@/components/ui/GitHubLoginDialog";

function Layout({ children }: LayoutProps<"/">) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const {gitHubSession} = useGitHubPatAuth();
  return (<>
    {gitHubSession && <span className={"absolute top-2 left-2 text-2xl"}>
      Your changes will save to: {gitHubSession.repository?.full_name}
    </span>}
    <Button
      variant={"outline"}
      className={"absolute top-2 right-2 text-2xl cursor-pointer"}
      onClick={() => setShowLoginDialog(true)}
    >
      {gitHubSession ? <UnlockIcon/> : <LockIcon/>}
    </Button>
    {children}
    <GitHubLoginDialog
      show={showLoginDialog}
      hide={() => setShowLoginDialog(false)}
    />
  </>);
}

export default Layout;
