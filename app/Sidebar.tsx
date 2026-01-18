'use client';
import styles from "./Sidebar.module.css";
import React, {RefObject, useMemo, useState} from 'react';
import {Sidebar as PrimeReactSidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";
import SocialLinks from "@nightmaregaurav/react-social-media-links";
import {Divider} from "primereact/divider";
import {PanelMenu} from "primereact/panelmenu";
import {useConfig} from "./setup/useConfig";
import {ConfigIdentifiers} from "./setup/ConfigIdentifiers";
import {MenuItem} from "primereact/menuitem";
import {usePathname} from "next/dist/client/components/navigation";

const getMenuItems = (path: string, activeClass: string) => [
  {
    label: "Home",
    icon: 'pi pi-home',
    url: '/',
    className: path === "/" ? activeClass : ""
  },
  {
    label: "About",
    icon: 'pi pi-user',
    url: '/about',
    className: path === "/about" ? activeClass : ""
  },
  {
    label: 'My Journey',
    icon: 'pi pi-map',
    url: '/journey',
    className: path === "/journey" ? activeClass : ""
  },
  {
    label: 'Projects',
    icon: 'pi pi-briefcase',
    url: '/projects',
    className: path === "/projects" ? activeClass : ""
  },
  {
    label: 'Skills',
    icon: 'pi pi-cog',
    url: '/skills',
    className: path === "/skills" ? activeClass : ""
  },
  {
    label: 'Testimonials',
    icon: 'pi pi-comments',
    url: '/testimonials',
    className: path === "/testimonials" ? activeClass : ""
  },
  {
    label: 'Blogs',
    icon: 'pi pi-pencil',
    url: '/blogs',
    className: path === "/blogs" ? activeClass : ""
  },
  {
    label: 'Gallery',
    icon: 'pi pi-image',
    url: '/gallery',
    className: path === "/gallery" ? activeClass : ""
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
] as MenuItem[]

const Sidebar = () => {
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);

  const {
    data: coreConfig,
    isLoading: coreConfigLoading
  } = useConfig(ConfigIdentifiers.Core);

  const {
    data: sidebarConfig,
    isLoading: sidebarConfigLoading
  } = useConfig(ConfigIdentifiers.Sidebar);

  const menuItems = useMemo(() => getMenuItems(pathname || "", styles.activeMenu), [pathname]);

  if (sidebarConfigLoading || coreConfigLoading || !sidebarConfig || !coreConfig) {
    return null;
  }

  return (<>
    {!visible && <Button
      className={styles.openButton}
      type="button"
      icon="pi pi-bars"
      rounded
      outlined
      onClick={() => setVisible(true)}
    />}
    <PrimeReactSidebar
      visible={visible}
      onHide={() => setVisible(false)}
      content={({ closeIconRef, hide }) => (<>
        <div className={styles.avatarBlock}>
          <Avatar
            className={styles.avatar}
            shape="circle"
            image={sidebarConfig.profilePhoto}
            imageFallback={"default"}
            label={coreConfig.fullName.split(' ').map((n) => n[0]).join('')}
            icon={"pi pi-user"}
            pt={{
              image: {
                alt: coreConfig.fullName,
                style: {objectFit: 'cover'}
              }
            }}
          />
        </div>
        <Button
          className={styles.closeButton}
          type="button"
          icon="pi pi-times"
          rounded
          outlined
          ref={closeIconRef as RefObject<Button>}
          onClick={(e) => hide(e)}
        />
        <SocialLinks
          socialLinks={sidebarConfig.socials}
          iconSize={25}
        />
        <div className={styles.menuSection}>
          <PanelMenu model={menuItems}/>
        </div>
        <Divider/>
        <div className={styles.footer}>
          &copy; {(new Date()).getFullYear()} Created using <a className={"external-link"} href={"https://github.com/nightmaregaurav/portfolio"} target={"_blank"}>QuickPortfolio</a>.
          Provided with <i className={"pi pi-heart-fill"}/> by <a className={"external-link"} href={"https://www.gauravnyaupane.com.np/"} target={"_blank"}>Gaurav Nyaupane</a>.
        </div>
      </>)}
    />
  </>);
};

export default Sidebar;
