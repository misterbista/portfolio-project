"use client"

import React, {useState} from "react";
import {Input as InputPrimitive} from "@base-ui/react/input";
import {XIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import SmartLink from "@/components/ui/SmartLink";

type ArrayInputProps = Omit<React.ComponentProps<"input">, "value" | "onChange"> & {
  value: string[] | undefined;
  onChange?: (value: string[] | undefined) => void;
};

function isLink(value: string) {
  return /^https?:\/\//i.test(value);
}

function ArrayInput({className, value, onChange, ...props}: ArrayInputProps) {
  const [inputValue, setInputValue] = useState("");

  function addValue() {
    const nextValue = inputValue.trim();
    if (!nextValue) return;
    onChange?.([...(value || []), nextValue]);
    setInputValue("");
  }

  function removeValue(index: number) {
    onChange?.((value || []).filter((_, valueIndex) => valueIndex !== index));
  }

  return (
    <div className={"grid gap-2"}>
      <InputPrimitive
        {...props}
        type={"text"}
        value={inputValue}
        className={cn(
          "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addValue();
          }
        }}
      />
      {value && value.length > 0 && (
        <div className={"flex flex-wrap gap-2"}>
          {value.map((item, index) => (
            <span key={`${item}-${index}`} className={"inline-flex max-w-full items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground"}>
              {isLink(item) ? (
                <SmartLink href={item} target={"_blank"} rel={"noreferrer"} className={"max-w-[18rem] truncate hover:underline"}>
                  {item}
                </SmartLink>
              ) : (
                <span className={"max-w-[18rem] truncate"}>{item}</span>
              )}
              <button
                type={"button"}
                aria-label={`Remove ${item}`}
                className={"ml-1 inline-flex size-4 shrink-0 items-center justify-center rounded-sm hover:bg-primary-foreground/20"}
                onClick={() => removeValue(index)}
              >
                <XIcon size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export {ArrayInput};
