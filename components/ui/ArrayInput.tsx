"use client"

import React, {useState} from 'react';
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"
import {XIcon} from "lucide-react";

type ArrayInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> & {
  value: string[] | undefined;
  onChange?: (value: string[] | undefined) => void;
};

function ArrayInput({ className, value, onChange, ...props }: ArrayInputProps) {
  const [intermediateValue, setIntermediateValue] = useState("");
  
  function remove(index: number) {
    const newValue = [...(value || [])];
    newValue.splice(index, 1);
    onChange?.(newValue);
  }

  function add(item: string) {
    onChange?.([...(value || []), item]);
  }

  return (<span className={cn("flex flex-wrap gap-1")}>
    <InputPrimitive
      {...props}
      type={"text"}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:font-medium placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      value={intermediateValue}
      onChange={(event) => setIntermediateValue(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" && intermediateValue.trim() !== "") {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onKeyUp={(event) => {
        if (event.key === "Enter" && intermediateValue.trim() !== "") {
          event.preventDefault();
          event.stopPropagation();
          add(intermediateValue);
          setIntermediateValue("");
        }
      }}
    />
    <span className={cn("inline-flex items-center gap-1 flex-wrap mt-1")}>
      {value && value.map((value, index) => <span
        key={index}
        className={cn("inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/80 text-xs font-medium h-5 px-2 py-1 cursor-pointer break-inside-avoid whitespace-nowrap")}
        onClick={ async (event) => {
          event.stopPropagation();
          event.preventDefault();
          await navigator.clipboard.writeText(value);
        }}
      >
        {value}
        <XIcon size={12} className={"ml-2 cursor-pointer"} onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          remove(index);
        }}/>
      </span>)}
    </span>
  </span>)
}

export { ArrayInput }
