import React from "react";
import SiteShell from "@/app/(app)/SiteShell";
import {CoreConfig, LeftPanelConfig, QuickLinksConfig} from "@/configuration";

function Layout({children}: LayoutProps<"/">) {
  return (
    <SiteShell
      coreConfig={CoreConfig}
      leftPanelConfig={LeftPanelConfig}
      quickLinksConfig={QuickLinksConfig}
    >
      {children}
    </SiteShell>
  );
}

export default Layout;

