"use client"

import React from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

function AssetManagerDialog(
  {show, setShow}: {
    show: boolean,
    setShow: (show: boolean) => void
  }
) {
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
