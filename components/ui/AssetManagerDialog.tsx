"use client"

import React from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

function AssetManagerDialog(
  {show, setShow}: {
    show: boolean,
    setShow: (show: boolean) => void
  }
) {
  {/* This file manager shall list all the files inside public/uploads directory */}
  {/* Allow user to download the file, copy the URL, upload the file, delete the file */}
  {/* Deleting won't use any smart detection, any existing usage will start failing, so just show a warning before deleting */}
  {/* Adding file will expose it to public, so we should show a warning before uploading */}
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent
        style={{
          width: 'auto', maxWidth: '100%',
          height: 'auto', maxHeight: '100%'
        }}
      >
        <DialogHeader>
          <DialogTitle>Asset Manager</DialogTitle>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  );
}

export default AssetManagerDialog;
