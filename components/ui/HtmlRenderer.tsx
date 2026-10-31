"use client";

import React from 'react';

function HtmlRenderer(
  {
    children,
    ...props
  }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children: string;
  }
) {
  return (
    <div {...props} dangerouslySetInnerHTML={{ __html: children }} children={undefined}></div>
  );
}

export default HtmlRenderer;
