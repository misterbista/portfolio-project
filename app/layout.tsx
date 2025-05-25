'use client';
import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldShowSidebar = true;
  return (
    <html lang="en">
      <body>
      {shouldShowSidebar && "Sidebar"}
        {children}
        GoToTop
      </body>
    </html>
  );
}
