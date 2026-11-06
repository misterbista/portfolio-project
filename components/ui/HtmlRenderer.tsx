"use client";

import React from 'react';

type HtmlRendererProps =
  | ({as?: "div"; children: string} & Omit<React.ComponentPropsWithoutRef<"div">, "children" | "dangerouslySetInnerHTML">)
  | ({as: "span"; children: string} & Omit<React.ComponentPropsWithoutRef<"span">, "children" | "dangerouslySetInnerHTML">);

function HtmlRenderer(props: HtmlRendererProps) {
  if (props.as === "span") {
    const {as, children, ...spanProps} = props;
    return <span {...spanProps} dangerouslySetInnerHTML={{__html: children}} />;
  }

  const {as, children, ...divProps} = props;
  return <div {...divProps} dangerouslySetInnerHTML={{__html: children}} />;
}

export default HtmlRenderer;
