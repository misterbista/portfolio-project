"use client"

import React, {useState} from "react";
import styles from "./page.module.css";
import {Identifier} from "@/hooks/useConfig";
import {defaultValues, Model, schema} from "@/configuration/gallery";
import {Input} from "@/components/ui/input";
import {ArrayInput} from "@/components/ui/ArrayInput";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import FullScreenMessage from "@/components/ui/FullScreenMessage";
import ConfigurationFormWrapper from "@/components/ui/ConfigurationFormWrapper";
import {Pencil, Plus, Trash2} from "lucide-react";
import {cn} from "@/lib/utils";
import {Control, Controller, useFieldArray, useWatch} from "react-hook-form";
import {useConfigurationForm} from "@/hooks/useConfigurationForm";
import {withConfigurationId} from "@/lib/configurationIds";
import ImageLightbox from "@/components/ui/ImageLightbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea";

const emptyPhoto: Model["photos"][number] = {
  id: "",
  url: "",
  caption: "",
  categories: [],
};

function PhotoFields(
  {control, index}: {
    control: Control<Model>;
    index: number
  }
) {
  return (
    <>
      <Controller
        control={control}
        name={`photos.${index}.url`}
        render={({field, fieldState: {error}}) =>
          <div className={"grid gap-2"}>
            <Label htmlFor={`photos.${index}.url`}>Photo URL</Label>
            <Input {...field} id={`photos.${index}.url`} placeholder={"https://example.com/photo.jpg"} className={cn("w-full", error && "border-destructive")}/>
            {error && <small className={"text-destructive"}>{error.message}</small>}
          </div>
        }
      />

      <Controller
        control={control}
        name={`photos.${index}.caption`}
        render={({field, fieldState: {error}}) =>
          <div className={"grid gap-2"}>
            <Label htmlFor={`photos.${index}.caption`}>Caption</Label>
            <Textarea id={`photos.${index}.caption`} placeholder={"A short caption"} value={field.value} onChange={field.onChange} className={cn("w-full", error && "border-destructive")}/>
            {error && <small className={"text-destructive"}>{error.message}</small>}
          </div>
        }
      />

      <Controller
        control={control}
        name={`photos.${index}.categories`}
        render={({field, fieldState: {error}}) =>
          <div className={"grid gap-2"}>
            <Label htmlFor={`photos.${index}.categories`}>Categories</Label>
            <ArrayInput value={field.value || []} onChange={field.onChange} id={`photos.${index}.categories`} placeholder={"Type a category and press Enter"} className={cn("w-full", error && "border-destructive")}/>
            {error && <small className={"text-destructive"}>{error.message}</small>}
          </div>
        }
      />
    </>
  );
}

function GalleryPhotoCard(
  {
    photo, index, onEdit, onDelete
  }: {
    photo: Model["photos"][number];
    index: number;
    onEdit: () => void;
    onDelete: () => void;
  }
) {
  const image = photo.url ? (
    <img src={photo.url} alt={photo.caption || `Gallery photo ${index + 1}`} className={"size-full object-cover"}/>
  ) : (
    <div className={"flex size-full items-center justify-center bg-muted text-sm text-muted-foreground"}>No image</div>
  );

  return (
    <div className={"group relative aspect-square overflow-hidden rounded-xl border bg-card shadow-sm"}>
      {photo.url ?
        <ImageLightbox
          src={photo.url}
          name={photo.caption || `Gallery photo ${index + 1}`}
          trigger={image}
        /> : image
      }

      <div className={"pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/30 to-transparent p-3 pt-10"}>
        <p className={"truncate text-sm font-medium text-white"}>{photo.caption || `Photo ${index + 1}`}</p>
        {photo.categories.length > 0 && <p className={"truncate text-xs text-white/75"}>{photo.categories.join(" · ")}</p>}
      </div>

      <div className={"absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100"}>
        <Button
          type={"button"}
          size={"icon-sm"}
          variant={"secondary"}
          className="cursor-pointer hover:-translate-y-px shadow-sm"
          onClick={onEdit}
          aria-label={`Edit ${photo.caption || `photo ${index + 1}`}`}
        >
          <Pencil />
        </Button>

        <Button
          type={"button"}
          size={"icon-sm"}
          variant={"destructive"}
          className="cursor-pointer hover:-translate-y-px shadow-sm"
          onClick={onDelete}
          aria-label={`Delete ${photo.caption || `photo ${index + 1}`}`}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

function Page() {
  const {
    isLoadingConfig,
    saveConfig,
    isSavingConfig,
    form,
    control,
    handleSubmit,
    formValues
  } = useConfigurationForm(
    Identifier.Gallery,
    schema,
    defaultValues
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const {fields: photos, append, remove} = useFieldArray({control, name: "photos", keyName: "fieldArrayId"});
  const photosWatch = useWatch({control, name: "photos"});

  function openEditor(index: number) {
    setEditingIndex(index);
    setDialogOpen(true);
  }

  function addPhoto() {
    const photo = withConfigurationId(emptyPhoto, "photo");
    append(photo);
    setEditingIndex(photosWatch.length);
    setDialogOpen(true);
  }

  async function save(values: Model) {
    await saveConfig(values);
  }

  if (isLoadingConfig) {
    return <FullScreenMessage><Spinner className={"size-10"} /></FullScreenMessage>;
  }

  return (
    <ConfigurationFormWrapper className={styles.page} title={"Gallery Configuration"} config={formValues} form={form}>
      <form onSubmit={handleSubmit(save)} className={cn(styles.form, "grid max-w-3xl gap-6")}>
        <div className={"flex flex-col justify-between gap-3 sm:flex-row sm:items-center"}>
          <div>
            <Label>Gallery photos</Label>
            <p className={"mt-1 text-sm text-muted-foreground"}>Browse your photos. Hover a photo to edit it.</p>
          </div>

          <Button
            type={"button"}
            size={"sm"}
            variant={"outline"}
            onClick={addPhoto}
            className="cursor-pointer hover:-translate-y-px"
          >
            <Plus /> Add photo
          </Button>
        </div>

        {photosWatch.length > 0 && (
          <div className={"grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"}>
            {photosWatch.map((photo, index) => (
              <GalleryPhotoCard
                key={index}
                photo={photo}
                index={index}
                onEdit={() => openEditor(index)}
                onDelete={() => remove(index)}
              />
            ))}
          </div>
        )}

        {photos.length === 0 &&
          <div className={"rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground"}>
            No photos yet. Add your first photo.
          </div>
        }

        <div className={"flex justify-end"}>
          <Button
            type={"submit"}
            size={"sm"}
            variant={"outline"}
            className={"cursor-pointer mt-2 bg-primary text-secondary hover:-translate-y-px"}
            disabled={isSavingConfig}
          >
            {isSavingConfig ? <Spinner /> : "Save"}
          </Button>
        </div>
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className={"max-h-[90vh] overflow-y-auto sm:max-w-lg"}>
          <DialogHeader>
            <DialogTitle>
              {editingIndex === null ? "Edit photo" : photosWatch[editingIndex]?.caption ? "Edit photo" : "Add photo"}
            </DialogTitle>
            <DialogDescription>
              {editingIndex === null ? "Add" : "Update"} the image, caption, and categories for this gallery photo.
            </DialogDescription>
          </DialogHeader>
          {editingIndex !== null && <div className={"grid gap-4"}>
            <PhotoFields control={control} index={editingIndex}/>
          </div>}
          <DialogFooter>
            <Button
              type={"button"}
              variant={"outline"}
              className={"cursor-pointer hover:-translate-y-px"}
              onClick={() => setDialogOpen(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfigurationFormWrapper>
  );
}

export default Page;
