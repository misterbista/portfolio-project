"use client"

import React, { useMemo } from 'react';
import styles from './LeftPanel.module.css';
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu, SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { AlignJustify, Heart, XIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import SocialLinks from "@/components/ui/SocialLinks";
import { cn } from "@/lib/utils";
import SidebarCustomMenuItem from "@/app/(app)/SidebarCustomMenuItem";
import SmartLink from "@/components/ui/SmartLink";
import ImageLightbox from "@/components/ui/ImageLightbox";
import type { TModel as CoreModel } from "@/configuration/core";
import type { TModel as LeftPanelModel } from "@/configuration/leftPanel";
import type { TModel as QuickLinksModel } from "@/configuration/quickLinks";

class LeftPanelItem {
  label: string;
  icon: string;
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
    icon: 'House',
    url: '/',
    show: allowedMenus.includes('home')
  },
  {
    label: "About",
    icon: 'User',
    url: '/about',
    show: allowedMenus.includes('about')
  },
  {
    label: 'My Journey',
    icon: 'Milestone',
    url: '/journey',
    show: allowedMenus.includes('journey')
  },
  {
    label: 'Projects',
    icon: 'FolderOpenDot',
    url: '/projects',
    show: allowedMenus.includes('projects')
  },
  {
    label: 'Skills',
    icon: 'Brain',
    url: '/skills',
    show: allowedMenus.includes('skills')
  },
  {
    label: 'Services',
    icon: 'BriefcaseBusiness',
    url: '/services',
    show: allowedMenus.includes('services')
  },
  {
    label: 'Testimonials',
    icon: 'MessageCircleMore',
    url: '/testimonials',
    show: allowedMenus.includes('testimonials')
  },
  {
    label: 'Gallery',
    icon: 'Images',
    url: '/gallery',
    show: allowedMenus.includes('gallery')
  },
  {
    label: 'Blogs',
    icon: 'NotebookPen',
    url: '/blogs',
    show: allowedMenus.includes('blogs')
  }
] as LeftPanelItem[]

function LeftPanel({
  coreConfig,
  leftPanelConfig,
  quickLinksConfig,
}: {
  coreConfig: CoreModel;
  leftPanelConfig: LeftPanelModel;
  quickLinksConfig: QuickLinksModel;
}) {
  const pathname = usePathname();
  const { open, openMobile, isMobile } = useSidebar();

  const menuItems = useMemo(
    () => getMenuItems(leftPanelConfig.enabledMenus),
    [leftPanelConfig.enabledMenus]
  );

  const sidebarContent = {
    profile: (
      (leftPanelConfig.profilePicture || coreConfig.fullName) && <div className={styles.avatarBlock} data-slot="sidebar-profile">
        {leftPanelConfig.profilePicture ? (
          <ImageLightbox
            src={leftPanelConfig.profilePicture}
            name={`${coreConfig.fullName}`}
            trigger={
              <div className="flex justify-center">
                <Avatar className={styles.avatar}>
                  <AvatarImage src={leftPanelConfig.profilePicture} alt={coreConfig.fullName} style={{ objectFit: 'cover' }} />
                </Avatar>
              </div>
            }
          />
        ) : (
          <Avatar className={styles.avatar}>
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
        )}
      </div>
    ),
    socials: <SocialLinks links={leftPanelConfig.socials} />,
    navigation: (
      menuItems.filter((item) => item.show).length > 0 &&
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.filter((item) => item.show).map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarCustomMenuItem
                  label={item.label}
                  link={item.url}
                  icon={item.icon}
                  show={item.show}
                  currentPath={pathname}
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    ),
    quickLinks: (
      leftPanelConfig.enabledMenus.includes('quickLinks') &&
      quickLinksConfig.links.length > 0 &&
      <SidebarGroup>
        <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {quickLinksConfig.links.map((link, index) => (
              <SidebarMenuItem key={index}>
                <SidebarCustomMenuItem
                  label={link.title}
                  link={link.link}
                  icon={link.icon}
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    ),
  };

  const showOpenTrigger = isMobile ? !openMobile : !open;

  return (
    <>
      {showOpenTrigger && (
        <SidebarTrigger
          className={styles.openButton}
          variant="outline"
          aria-label="Open navigation"
          aria-expanded={isMobile ? openMobile : open}
        >
          <AlignJustify aria-hidden="true" />
        </SidebarTrigger>
      )}
      <Sidebar>
        <SidebarTrigger
          className={styles.closeButton}
          variant="outline"
          aria-label="Close navigation"
          aria-expanded={isMobile ? openMobile : open}
        >
          <XIcon aria-hidden="true" />
        </SidebarTrigger>
        <SidebarHeader>
          {sidebarContent.profile}
          {sidebarContent.socials}
        </SidebarHeader>
        <SidebarContent>
          {sidebarContent.navigation}
          {sidebarContent.quickLinks}
        </SidebarContent>
        <SidebarFooter className={cn(styles.footer, "text-secondary-foreground")}>
          &copy; {(new Date()).getFullYear()} Created using <SmartLink href={"https://github.com/nightmaregaurav/portfolio"} target={"_blank"}>Portfolio</SmartLink>.
          Provided with <Heart className={"inline"} size={14} aria-hidden="true" /> by <SmartLink href={"https://www.gauravnyaupane.com.np/"} target={"_blank"}>Gaurav Nyaupane</SmartLink>.
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

export default LeftPanel;
