"use client"

import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Copy, Download, Ellipsis, Eye, FileIcon, Grid, List, Trash} from "lucide-react";
import {Spinner} from "@/components/ui/spinner";
import {Separator} from "@/components/ui/separator";
import {useGitHubFolder} from "@/hooks/useGitHubFolder";
import {Input} from "@/components/ui/input";
import {useDebouncedState} from "@/hooks/useDebouncedState";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {GitHubContent} from "@/lib/gitHub";
import Image from "next/image";
import {Checkbox} from "@/components/ui/checkbox";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {getFileTypeFromMimeType, humanizeFileSize} from "@/lib/files";
import FileUploadButton from "@/components/ui/FileUploadButton";

function GitHubFileManager(
  {className, path}: {
    className?: string,
    path: string
  }
) {
  const {
    state: searchKeyword,
    debouncedState: debouncedSearchKeyword,
    setState: setSearchKeyword
  } = useDebouncedState("", 500);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFileType, setSelectedFileType] = useState<string>();
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const {
    files,
    loadingFiles,
    deleteFiles,
    uploadFiles,
    uploadingFiles
  } = useGitHubFolder(path)

  async function onDownload(fileNames: string[]) {
    for (const fileName of fileNames) {
      const file = files?.find(f => f.name === fileName);
      if (file) {
        const link = document.createElement('a');
        link.href = file.download_url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  async function onDelete(fileNames: string[]) {
    await deleteFiles(fileNames);
  }

  const filteredFiles = files
    ?.filter(file => {
      let typeString = getFileTypeFromMimeType(file.type);
      if(selectedFileType && typeString !== selectedFileType) {
        return false;
      }
      return file.name.toLowerCase().includes(debouncedSearchKeyword.toLowerCase());
      }
    );

  const fileTypes = files?.reduce((acc, file) => {
    const type = getFileTypeFromMimeType(file.type);
    if (!acc[type]) {
      acc[type] = 0;
    }
    acc[type]++;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={cn("p-4", className)}>
      <div className={"flex flex-row justify-between align-center items-center gap-2"}>
        <div className={"flex flex-col gap-1"}>
          <span className={"text-xl font-bold"}>
            Asset Manager
          </span>
          <span className={"text-sm text-gray-500"}>
            Organize documents, files, and assets.
          </span>
        </div>
        <FileUploadButton
          uploadingFiles={uploadingFiles}
          uploadFiles={uploadFiles}
        />
      </div>
      <Separator className={"my-3"}/>
      <div className={"flex flex-row justify-between align-center items-center gap-2 mb-3"}>
        <Input
          placeholder={"Search files..."}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <span className={"flex flex-row gap-1"}>
          <Button
            size={"icon-sm"}
            onClick={() => setViewMode("grid")}
            variant={viewMode === "grid" ? "default" : "outline"}
            className={"cursor-pointer"}
          >
            <Grid/>
          </Button>
          <Button
            size={"icon-sm"}
            onClick={() => setViewMode("list")}
            variant={viewMode === "list" ? "default" : "outline"}
            className={"cursor-pointer"}
          >
            <List/>
          </Button>
        </span>
      </div>
      {loadingFiles && <div className={"flex flex-row justify-center align-center items-center"}>
        <Spinner className={"mr-1"}/> Loading...
      </div>}
      {!loadingFiles && (!files || files.length === 0) && <div className={"flex flex-row justify-center align-center items-center"}>
        <span className={"text-gray-500"}>No files found.</span>
      </div>}
      {!loadingFiles && files && files.length > 0 && filteredFiles && filteredFiles.length === 0 && <div className={"flex flex-row justify-center align-center items-center"}>
        <span className={"text-gray-500"}>No files found matching the search criteria.</span>
      </div>}
      <div className={"flex flex-row gap-2 overflow-x-auto py-1 mb-3"}>
        {Object.entries(fileTypes ?? {}).map(([type, count]) => (
          <Badge
            key={type}
            variant={"secondary"}
            onClick={() => setSelectedFileType(selectedFileType === type ? undefined : type)}
            className={cn(
              "cursor-pointer hover:bg-gray-300",
              {
                "bg-gray-300": selectedFileType === type,
                "border border-gray-400": selectedFileType === type,
              }
            )}
          >
            {`${type} (${count})`}
          </Badge>
        ))}
      </div>
      {selectedFiles.length > 0 && (<div className={"flex flex-row gap-2 mb-3 justify-between align-center items-center"}>
        <span className={"text-sm text-muted-foreground"}>
          {selectedFiles.length} file(s) selected
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button size={"icon-sm"} variant="outline">
            <Ellipsis size={16} className="cursor-pointer" />
          </Button>} />
          <DropdownMenuContent className="w-auto border rounded-md bg-white shadow-lg">
            <DropdownMenuItem className="hover:bg-gray-100 py-1 px-4 pt-2 cursor-pointer flex flex-no gap-2" onClick={async () => {
              await onDownload(selectedFiles);
            }}>
              <Download size={14} />
              Download selected
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 py-1 px-4 cursor-pointer flex flex-no gap-2" onClick={async () => {
              await onDelete(selectedFiles);
            }}>
              <Trash size={14} />
              Delete selected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>)}
      <div
        className={cn(
          "grid gap-2",
          {
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3": viewMode === "grid",
            "flex flex-col": viewMode === "list",
            "overflow-y-auto": viewMode === "list",
            "max-h-100": viewMode === "list",
          }
        )}
      >
        {filteredFiles?.map(file => (viewMode === "grid" ? (<GridCard
          file={file}
          isAnySelected={selectedFiles.length > 0}
          isSelected={selectedFiles.includes(file.name)}
          onSelectionChange={(selected) => {
            if (selected) {
              setSelectedFiles([...selectedFiles, file.name]);
            } else {
              setSelectedFiles(selectedFiles.filter(f => f !== file.name));
            }
          }}
          onDownload={onDownload}
          onDelete={onDelete}
        />) : (<ListCard
          file={file}
          isAnySelected={selectedFiles.length > 0}
          isSelected={selectedFiles.includes(file.name)}
          onSelectionChange={(selected) => {
            if (selected) {
              setSelectedFiles([...selectedFiles, file.name]);
            } else {
              setSelectedFiles(selectedFiles.filter(f => f !== file.name));
            }
          }}
          onDownload={onDownload}
          onDelete={onDelete}
        />)))}
      </div>
    </div>
  );
}

export default GitHubFileManager;

function GridCard(
  {file, isAnySelected, isSelected, onSelectionChange, onDownload, onDelete}: {
    file: GitHubContent,
    isAnySelected: boolean,
    isSelected: boolean,
    onSelectionChange: (selected: boolean) => void,
    onDownload: (fileNames: string[]) => Promise<void>,
    onDelete: (fileNames: string[]) => Promise<void>
  }
) {
  return (
    <Tooltip>
      <TooltipTrigger delay={2000}>
        <div className={cn(
          "rounded p-2 flex flex-col align-center",
          {
            "border": !isSelected,
            "border-2": isSelected,
          }
        )}>
          <div className={"flex flex-row align-center items-center"}>
            <FileIconWithCheckbox
              file={file}
              isAnySelected={isAnySelected}
              isSelected={isSelected}
              onSelectionChange={onSelectionChange}
            />
            <div className="flex min-w-0 grow mx-1">
              <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                {file.name.slice(0, file.name.lastIndexOf("."))}
              </span>
              <span className="shrink-0 whitespace-nowrap">
                .{file.name.slice(file.name.lastIndexOf(".") + 1)}
              </span>
            </div>
            <FileActions file={file} onDownload={onDownload} onDelete={onDelete} />
          </div>
          <span className={"flex flex-row gap-2 justify-between mt-1 text-muted-foreground text-xs"}>
            <span>{humanizeFileSize(file.size)}</span>
            <span>{getFileTypeFromMimeType(file.type)}</span>
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent side={"bottom"}>
        <p>{file.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function ListCard(
  {file, isAnySelected, isSelected, onSelectionChange, onDownload, onDelete}: {
    file: GitHubContent,
    isAnySelected: boolean,
    isSelected: boolean,
    onSelectionChange: (selected: boolean) => void,
    onDownload: (fileNames: string[]) => Promise<void>,
    onDelete: (fileNames: string[]) => Promise<void>
  }
) {
  return (
    <Tooltip>
      <TooltipTrigger delay={2000}>
        <div className={cn(
          "rounded p-2 flex flex-row align-center items-center",
          {
            "border": !isSelected,
            "border-2": isSelected,
          }
        )}>
          <FileIconWithCheckbox
            file={file}
            isAnySelected={isAnySelected}
            isSelected={isSelected}
            onSelectionChange={onSelectionChange}
          />
          <div className="flex min-w-0 flex-col grow mx-1">
            <div className="flex min-w-0 grow mx-1">
              <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                {file.name.slice(0, file.name.lastIndexOf("."))}
              </span>
              <span className="shrink-0 whitespace-nowrap">
                .{file.name.slice(file.name.lastIndexOf(".") + 1)}
              </span>
            </div>
            <div className={"flex flex-row mx-1 gap-1 justify-start text-muted-foreground text-xs"}>
              <span>{humanizeFileSize(file.size)}</span>
              <span>•</span>
              <span>{getFileTypeFromMimeType(file.type)}</span>
            </div>
          </div>
          <FileActions
            file={file}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side={"bottom"}>
        <p>{file.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function FileActions(
  {file, onDownload, onDelete}: {
    file: GitHubContent,
    onDownload: (fileNames: string[]) => Promise<void>,
    onDelete: (fileNames: string[]) => Promise<void>
  }
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size={"icon-sm"} variant="outline">
        <Ellipsis size={16} className="cursor-pointer" />
      </Button>} />
      <DropdownMenuContent className="w-auto border rounded-md bg-white shadow-lg">
        <DropdownMenuItem className="hover:bg-gray-100 py-1 px-4 pt-2 cursor-pointer flex flex-no gap-2" onClick={async () => {
          navigator.clipboard.writeText(file.download_url);
        }}>
          <Copy size={14} />
          CopyLink
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-100 py-1 px-4 cursor-pointer flex flex-no gap-2" onClick={async () => {
          window.open(file.download_url, "_blank");
        }}>
          <Eye size={14} />
          View (open in new tab)
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-100 py-1 px-4 cursor-pointer flex flex-no gap-2" onClick={async () => {
          await onDownload([file.name]);
        }}>
          <Download size={14} />
          Download
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-100 py-1 px-4 cursor-pointer flex flex-no gap-2" onClick={async () => {
          await onDelete([file.name]);
        }}>
          <Trash size={14} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FileIconWithCheckbox(
  {file, isAnySelected, isSelected, onSelectionChange, size=40}: {
    file: GitHubContent;
    isAnySelected: boolean;
    isSelected: boolean;
    onSelectionChange: (selected: boolean) => void;
    size?: number;
  }
) {
  const [hovered, setHovered] = useState(false);
  const showCheckbox = hovered || isAnySelected;

  const isImage = file.type.startsWith("image/");

  return <span
    className="relative inline-flex shrink-0 items-center justify-center cursor-pointer"
    style={{
      width: `${size}px`,
      height: `${size}px`,
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={() => onSelectionChange(!isSelected)}
  >
    {isImage ? (
      <Image
        src={file.download_url}
        alt={file.name}
        width={size}
        height={size}
        className="block h-full w-full rounded object-cover"
        loading="lazy"
      />
    ) : (
      <FileIcon
        aria-hidden="true"
        className="block h-full w-full"
      />
    )}

    {showCheckbox && (
      <Checkbox
        checked={isSelected}
        aria-label={`Select ${file.name}`}
        className="absolute left-1 top-1 z-10 m-0 cursor-pointer h-3 w-3"
      />
    )}
  </span>;
}
