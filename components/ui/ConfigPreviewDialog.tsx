"use client"

import React, {useEffect} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

function ConfigPreviewDialog(
  {show, setShow, configString}: {
    show: boolean,
    setShow: (show: boolean) => void,
    configString: string
  }
) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent
        style={{
          width: 'auto', maxWidth: '100%',
          height: 'auto', maxHeight: '100%'
        }}
      >
        <DialogHeader>
          <DialogTitle><b>JSON Preview</b></DialogTitle>
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
  );
}

export default ConfigPreviewDialog;
