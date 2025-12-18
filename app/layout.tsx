'use client';
import React from "react";
import {AppendToType, PrimeReactProvider} from "primereact/api";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-amber/theme.css';
import "./globals.css";
import Sidebar from "./Sidebar";
import GoToTop from "./GoToTop";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

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
      <QueryClientProvider client={queryClient}>
        <PrimeReactProvider value={primeReactConfiguration}>
          <Sidebar/>
          {children}
          <GoToTop />
        </PrimeReactProvider>
      </QueryClientProvider>
    </body>
    </html>
  );
}
