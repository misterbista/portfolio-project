import React from "react";
import dynamic from "next/dynamic";
import {existsSync} from "node:fs";
import {join} from "node:path";
import SiteShell from "@/app/(app)/SiteShell";
import {CoreConfig, LeftPanelConfig, QuickLinksConfig} from "@/configuration";

const themePath = join(process.cwd(), "templates", CoreConfig.template, "theme.tsx");
const Theme = existsSync(themePath) ? dynamic(
  () => import(`@/templates/${CoreConfig.template}/theme`),
  {ssr: true}
) : null;

function Layout({children}: LayoutProps<"/">) {
  return (
    <>
      {Theme && <Theme />}
      <SiteShell
        coreConfig={CoreConfig}
        leftPanelConfig={LeftPanelConfig}
        quickLinksConfig={QuickLinksConfig}
      >
        {children}
      </SiteShell>
    </>
  );
}

export default Layout;

