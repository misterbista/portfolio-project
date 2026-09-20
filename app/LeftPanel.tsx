"use client"

import React from 'react';
import styles from './LeftPanel.module.css';
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import {Identifier, useConfig} from "@/configuration/useConfig";
import {AlignJustify, Heart, XIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {usePathname} from "next/navigation";
import SocialLinks from "@/components/ui/SocialLinks";
import {cn} from "@/lib/utils";

class LeftPanelItem {
  label: string;
  icon: React.ReactNode;
  url: string;
  target?: string
  items?: LeftPanelItem[];
}

const MenuItems = [
  {
    label: "Home",
    icon: 'pi pi-home',
    url: '/',
  },
  {
    label: "About",
    icon: 'pi pi-user',
    url: '/about',
  },
  {
    label: 'My Journey',
    icon: 'pi pi-map',
    url: '/journey',
  },
  {
    label: 'Projects',
    icon: 'pi pi-briefcase',
    url: '/projects',
  },
  {
    label: 'Skills',
    icon: 'pi pi-cog',
    url: '/skills',
  },
  {
    label: 'Testimonials',
    icon: 'pi pi-comments',
    url: '/testimonials',
  },
  {
    label: 'Blogs',
    icon: 'pi pi-pencil',
    url: '/blogs',
  },
  {
    label: 'Gallery',
    icon: 'pi pi-image',
    url: '/gallery',
  },
  {
    label: 'Downloads',
    icon: 'pi pi-download',
    items: [
      {
        label: 'Short Resume',
        icon: 'pi pi-file',
        target: '_blank',
        url: 'https://docs.google.com/document/d/1OvxmbaNJZu-Si9Pm0RfjTQ7iFkajFDYcLKLBphiiH7c/edit?tab=t.0',
      },
      {
        label: 'Full Resume',
        icon: 'pi pi-file-plus',
        target: '_blank',
        url: 'https://docs.google.com/document/d/1gO7-1Uu5yIZLX-LXakb_II96pjjCFr1AB2132fjwUww/edit?tab=t.0',
      }
    ]
  },
  {
    label: 'Links',
    icon: 'pi pi-link',
    items: [
      {
        label: 'Something 1',
        icon: 'pi pi-file',
        target: '_blank',
        url: 'https://docs.google.com/document/d/1OvxmbaNJZu-Si9Pm0RfjTQ7iFkajFDYcLKLBphiiH7c/edit?tab=t.0',
      },
      {
        label: 'Something 2',
        icon: 'pi pi-file-plus',
        target: '_blank',
        url: 'https://docs.google.com/document/d/1gO7-1Uu5yIZLX-LXakb_II96pjjCFr1AB2132fjwUww/edit?tab=t.0',
      }
    ]
  }
] as LeftPanelItem[]

function LeftPanel() {
  const pathname = usePathname();
  const {open} = useSidebar();

  const {
    data: coreConfig,
    isLoading: coreConfigLoading
  } = useConfig(Identifier.Core);

  const {
    data: leftPanelConfig,
    isLoading: leftPanelConfigLoading
  } = useConfig(Identifier.LeftPanel);

  if (leftPanelConfigLoading || coreConfigLoading || !leftPanelConfig || !coreConfig) {
    return null;
  }

  return (<>
    {!open && <SidebarTrigger variant={"outline"} className={styles.openButton}>
      <AlignJustify/>
    </SidebarTrigger>}

    <Sidebar>
      <SidebarHeader>
        <div className={styles.avatarBlock}>
          <Avatar className={styles.avatar}>
            <AvatarImage src={leftPanelConfig.profilePhoto} alt={coreConfig.fullName} style={{objectFit: 'cover'}}/>
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
        </div>

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
        <SidebarGroup>
        </SidebarGroup>

        {/* download and links */}
        <SidebarGroup>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={cn(styles.footer, "text-secondary-foreground")}>
        &copy; {(new Date()).getFullYear()} Created using <a href={"https://github.com/nightmaregaurav/portfolio"} target={"_blank"}>Portfolio</a>.
        Provided with <Heart className={"inline"} size={14}/> by <a href={"https://www.gauravnyaupane.com.np/"} target={"_blank"}>Gaurav Nyaupane</a>.
      </SidebarFooter>
    </Sidebar>
  </>);
}

export default LeftPanel;
