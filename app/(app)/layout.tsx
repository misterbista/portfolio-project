import dynamic from "next/dynamic";
import {CoreConfig, LeftPanelConfig, QuickLinksConfig} from "@/configuration";
import type {LayoutContentProps} from "@/app/(app)/layout.types";

const LayoutContent = dynamic<LayoutContentProps>(
  () => import(`@/templates/${CoreConfig.template}/layout.content`),
  {ssr: true}
);

function Layout({children}: LayoutProps<"/">) {
  return (
    <LayoutContent
      coreConfig={CoreConfig}
      leftPanelConfig={LeftPanelConfig}
      quickLinksConfig={QuickLinksConfig}
    >
      {children}
    </LayoutContent>
  );
}

export default Layout;

