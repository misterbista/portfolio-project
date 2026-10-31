"use client"

import React, {useMemo} from 'react';
import styles from './LeftPanel.module.css';
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import {Identifier, useConfig} from "@/hooks/useConfig";
import {AlignJustify, Heart, XIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {usePathname} from "next/navigation";
import SocialLinks from "@/components/ui/SocialLinks";
import {cn} from "@/lib/utils";

class LeftPanelItem {
  label: string;
  icon: React.ReactNode;
  url: string;
  show: boolean;
  target?: string
  items?: LeftPanelItem[];
}

const getMenuItems = (
  allowedMenus: string[]
) => [
  {
    label: "Home",
    icon: 'pi pi-home',
    url: '/',
    show: allowedMenus.includes('home')
  },
  {
    label: "About",
    icon: 'pi pi-user',
    url: '/about',
    show: allowedMenus.includes('about')
  },
  {
    label: 'My Journey',
    icon: 'pi pi-map',
    url: '/journey',
    show: allowedMenus.includes('journey')
  },
  {
    label: 'Projects',
    icon: 'pi pi-briefcase',
    url: '/projects',
    show: allowedMenus.includes('projects')
  },
  {
    label: 'Skills',
    icon: 'pi pi-cog',
    url: '/skills',
    show: allowedMenus.includes('skills')
  },
  {
    label: 'Services',
    icon: 'pi pi-cog',
    url: '/services',
    show: allowedMenus.includes('services')
  },
  {
    label: 'Testimonials',
    icon: 'pi pi-comments',
    url: '/testimonials',
    show: allowedMenus.includes('testimonials')
  },
  {
    label: 'Gallery',
    icon: 'pi pi-image',
    url: '/gallery',
    show: allowedMenus.includes('gallery')
  },
  {
    label: 'Blogs',
    icon: 'pi pi-pencil',
    url: '/blogs',
    show: allowedMenus.includes('blogs')
  }
] as LeftPanelItem[]

function LeftPanel() {
  const pathname = usePathname();
  const {open} = useSidebar();

  const {
    config: coreConfig,
    isLoadingConfig: isLoadingCoreConfig
  } = useConfig(Identifier.Core);

  const {
    config: leftPanelConfig,
    isLoadingConfig: isLoadingLeftPanelConfig
  } = useConfig(Identifier.LeftPanel);

  const {
    config: quickLinksConfig,
    isLoadingConfig: isLoadingQuickLinksConfig
  } = useConfig(Identifier.QuickLinks);

  if (
    isLoadingLeftPanelConfig ||
    isLoadingCoreConfig ||
    isLoadingQuickLinksConfig ||
    !leftPanelConfig ||
    !coreConfig ||
    !quickLinksConfig
  ) {
    return <></>;
  }

  const menuItems = useMemo(
    () => getMenuItems(leftPanelConfig.enabledMenus),
    [leftPanelConfig, quickLinksConfig]
  );

  return (<>
    {!open && <SidebarTrigger variant={"outline"} className={styles.openButton}>
      <AlignJustify/>
    </SidebarTrigger>}

    <Sidebar>
      <SidebarHeader>
        {leftPanelConfig.profilePicture && <div className={styles.avatarBlock}>
          <Avatar className={styles.avatar}>
            <AvatarImage src={leftPanelConfig.profilePicture} alt={coreConfig.fullName} style={{objectFit: 'cover'}}/>
            <AvatarFallback>
              {coreConfig
                .fullName
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')
              }
            </AvatarFallback>
          </Avatar>
        </div>}

        <SidebarTrigger  className={styles.closeButton} variant={"outline"}>
          <XIcon/>
        </SidebarTrigger>

        <SocialLinks
          links={leftPanelConfig.socials}
          iconSize={25}
        />
      </SidebarHeader>
      <SidebarContent>
        {/* actual nav menus*/}
        {menuItems.filter((item) => item.show).length > 0 &&
          <SidebarGroup>
          </SidebarGroup>
        }

        {/* quick links */}
        {leftPanelConfig.enabledMenus.includes('quickLinks') && quickLinksConfig.links.length > 0 &&
          <SidebarGroup>
          </SidebarGroup>
        }
      </SidebarContent>
      <SidebarFooter className={cn(styles.footer, "text-secondary-foreground")}>
        &copy; {(new Date()).getFullYear()} Created using <a href={"https://github.com/nightmaregaurav/portfolio"} target={"_blank"}>Portfolio</a>.
        Provided with <Heart className={"inline"} size={14}/> by <a href={"https://www.gauravnyaupane.com.np/"} target={"_blank"}>Gaurav Nyaupane</a>.
      </SidebarFooter>
    </Sidebar>
  </>);
}

export default LeftPanel;
