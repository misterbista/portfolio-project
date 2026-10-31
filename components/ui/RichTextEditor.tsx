"use client";

import { useCallback, useEffect, useState } from "react";
import type { Range } from "@tiptap/core";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {
  BlockEditor,
  SlashCommand,
  defaultSlashCommandItems,
  getSlashCommandSuggestion,
} from "@/components/block-editor";
import type { SlashCommandSuggestionItem } from "@/components/block-editor";
import "@/components/block-editor/style.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {cn} from "@/lib/utils";

function createSlashCommandItems(
  onImageRequest: (range: Range) => void
): SlashCommandSuggestionItem[] {
  return [
    ...defaultSlashCommandItems,
    {
      id: "image",
      title: "Image",
      description: "Insert an image.",
      keywords: ["image", "img", "picture", "photo"],
      command: ({ range }) => {
        onImageRequest(range);
      },
    },
    {
      id: "table",
      title: "Table",
      description: "Insert a table.",
      keywords: ["table", "grid"],
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run();
      },
    },
  ];
}

export interface RichTextEditorProps {
  id?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  id,
  className,
  value,
  onChange,
  placeholder = "Type / for commands...",
}: RichTextEditorProps) {
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageRange, setImageRange] = useState<Range | null>(null);

  const requestImage = useCallback((range: Range) => {
    setImageRange(range);
    setImageUrl("");
    setImageDialogOpen(true);
  }, []);

  const slashCommandItems = createSlashCommandItems(requestImage);
  const editor = useEditor({
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor: updatedEditor }) => {
      onChange(updatedEditor.getHTML());
    },
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({ placeholder }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Image,
      SlashCommand.configure({
        suggestion: getSlashCommandSuggestion(slashCommandItems),
      }),
    ],
  });

  useEffect(() => {
    if (!editor) return;
    if (value === "" ? editor.isEmpty : editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  const closeImageDialog = () => {
    setImageDialogOpen(false);
    setImageRange(null);
    setImageUrl("");
  };

  const insertImage = () => {
    const url = imageUrl.trim();
    if (!url || !imageRange || !editor) return;

    editor
      .chain()
      .focus()
      .deleteRange(imageRange)
      .setImage({ src: url })
      .run();
    closeImageDialog();
  };

  return (
    <div id={id} className={cn("border rounded-md", className)} style={{paddingRight: "1rem"}}>
      <BlockEditor editor={editor} />
      <Dialog
        open={imageDialogOpen}
        onOpenChange={(open) => {
          if (open) {
            setImageDialogOpen(true);
          } else {
            closeImageDialog();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image</DialogTitle>
            <DialogDescription>
              Paste the URL of the image you want to add.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              insertImage();
            }}
          >
            <Input
              autoFocus
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              aria-label="Image URL"
            />
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={closeImageDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={!imageUrl.trim()}>
                Insert image
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
