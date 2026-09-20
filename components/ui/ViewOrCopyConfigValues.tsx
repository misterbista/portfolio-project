"use client"

import React, {useEffect, useMemo, useState} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import {Check, Copy, Eye} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

function stringify<T>(obj: T){
  return JSON.stringify(obj, null, "  ");
}

function ViewOrCopyConfigValues<T>(
  {config}: { config: T }
) {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    if (!showCheck) return;
    const timer = setTimeout(() => {
      setShowCheck(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showCheck]);

  const copyToClipboard = async (text: string) => {
    setShowCheck(true);
    await navigator.clipboard.writeText(text);
  }

  const configString = useMemo(() => stringify(config), [config]);

  return (
    <span
      style={{
        display: "inline-flex",
        justifyContent: "flex-start",
        gap: "5px",
        alignItems: "center",
        margin: "5px"
      }}
    >
      {showCheck
        ? <Check size={14} className="cursor-pointer" />
        : <Copy size={14} className="cursor-pointer" onClick={async () => {
          await copyToClipboard(configString);
        }}/>
      }

      <Dialog>
        <DialogTrigger>
          <Eye size={14} className="cursor-pointer"/>
        </DialogTrigger>
        <DialogContent
          style={{
            width: 'auto', maxWidth: '100%',
            height: 'auto', maxHeight: '100%'
          }}
        >
          <DialogHeader>
            <DialogTitle>JSON Preview</DialogTitle>
          </DialogHeader>
          <pre
            className="language-json"
            style={{
              width: "100%",
              height: "100%",
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            <code className="language-json">
              {configString}
            </code>
          </pre>
        </DialogContent>
      </Dialog>
    </span>
  );
}

export default ViewOrCopyConfigValues;
