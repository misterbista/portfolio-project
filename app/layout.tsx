'use client';
import React from "react";
import {AppendToType, PrimeReactProvider} from "primereact/api";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-amber/theme.css';
import "./globals.css";
import MenuBar from "@/app/MenuBar";
import GoToTop from "@/app/GoToTop";

export default function MainLayout(
  {
    children
  }: Readonly<{ children: React.ReactNode; }>,
) {
  const primeReactConfiguration = {
    appendTo: 'self' as AppendToType,
    ripple: true,
  };

  return (
    <html lang="en" data-google-analytics-opt-out="">
    <body>
    <PrimeReactProvider value={primeReactConfiguration}>
      <MenuBar/>
      {children}
      <GoToTop />
    </PrimeReactProvider>
    </body>
    </html>
  );
}
