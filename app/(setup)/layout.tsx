"use client"

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {LockIcon, UnlockIcon} from "lucide-react";
import {useGithubPatAuth} from "@/hooks/useGithubPatAuth";
import GithubLoginDialog from "@/components/ui/GithubLoginDialog";

function Layout({ children }: LayoutProps<"/">) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const {githubSession} = useGithubPatAuth();
  return (<>
    {githubSession && <span className={"absolute top-2 left-2 text-2xl"}>
      Your changes will save to: {githubSession.repository?.full_name}
    </span>}
    <Button
      variant={"outline"}
      className={"absolute top-2 right-2 text-2xl cursor-pointer"}
      onClick={() => setShowLoginDialog(true)}
    >
      {githubSession ? <UnlockIcon/> : <LockIcon/>}
    </Button>
    {children}
    <GithubLoginDialog
      show={showLoginDialog}
      hide={() => setShowLoginDialog(false)}
    />
  </>);
}

export default Layout;

