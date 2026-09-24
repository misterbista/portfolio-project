"use client"

import React, {useMemo, useState} from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Copy, Eye, Settings, File} from "lucide-react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import ConfigPreviewDialog from "@/components/ui/ConfigPreviewDialog";
import AssetManagerDialog from "@/components/ui/AssetManagerDialog";

function stringify<T>(obj: T){
  return JSON.stringify(obj, null, "  ");
}

function ConfigFormTools<T>(
  {config}: { config: T }
) {
  const [showCode, setShowCode] = useState(false);
  const [showAssetManager, setShowAssetManager] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Config copied to clipboard.");
  }

  const configString = useMemo(() => stringify(config), [config]);

  return (<>
    {/* Add an option to manage files in github */}
    {/* This file manager shall list all the files inside public/uploads directory */}
    {/* Allow user to download the file, copy the URL, upload the file, delete the file */}
    {/* Deleting won't use any smart detection, any existing usage will start failing, so just show a warning before deleting */}
    {/* Adding file will expose it to public, so we should show a warning before uploading */}
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="link"><Settings size={16} className="cursor-pointer" /></Button>} />
      <DropdownMenuContent className="w-auto border rounded-md bg-white shadow-lg">
        <DropdownMenuItem className="hover:bg-gray-100 py-1 px-4 pt-2 cursor-pointer flex flex-no gap-2" onClick={async () => {
          await copyToClipboard(configString);
        }}>
          <Copy size={14} />
          Copy config
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-100 py-1 px-4 cursor-pointer flex flex-no gap-2" onClick={() => setShowCode(true)}>
          <Eye size={14} />
          View config
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-100 py-1 px-4 pb-2 cursor-pointer flex flex-no gap-2" onClick={() => setShowAssetManager(true)}>
          <File size={14} />
          Asset manager
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <ConfigPreviewDialog show={showCode} setShow={setShowCode} configString={configString} />
    <AssetManagerDialog show={showAssetManager} setShow={setShowAssetManager}/>
  </>);
}

export default ConfigFormTools;
