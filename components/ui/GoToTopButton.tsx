"use client"

import React from 'react';
import {Button} from "@/components/ui/button";
import {ArrowUp} from "lucide-react";
import useScrollPosition from "@/hooks/useScrollPosition";

function GoToTopButton() {
  const bodyRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    bodyRef.current = document.documentElement;
  }, []);

  const {
    isAtTop
  } = useScrollPosition(bodyRef);

  if(isAtTop) {
    return <></>;
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      style={{position: 'fixed', bottom: '8px', right: '8px', cursor: 'pointer'}}
      onClick={() => {
        bodyRef.current?.scrollTo({top: 0, behavior: 'smooth'});
      }}
      className="cursor-pointer hover:-translate-y-px"
    >
      <ArrowUp/>
    </Button>
  );
}

export default GoToTopButton;
