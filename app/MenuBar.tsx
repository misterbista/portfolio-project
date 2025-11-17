'use client';
import styles from "./MenuBar.module.css";
import React, {RefObject, useState} from 'react';
import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";
import SocialLinks, {SocialMedia} from "@nightmaregaurav/react-social-media-links";
import {Divider} from "primereact/divider";
import {PanelMenu} from "primereact/panelmenu";

const MenuBar = () => {
  const [visible, setVisible] = useState(false);
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      url: ''
    },
    {
      label: 'Downloads',
      icon: 'pi pi-download',
      items: [
        {
          label: 'Short Resume',
          icon: 'pi pi-file',
          target: '_blank',
          url: 'https://docs.google.com/document/d/1OvxmbaNJZu-Si9Pm0RfjTQ7iFkajFDYcLKLBphiiH7c/edit?tab=t.0'
        },
        {
          label: 'Full Resume',
          icon: 'pi pi-file-plus',
          target: '_blank',
          url: 'https://docs.google.com/document/d/1gO7-1Uu5yIZLX-LXakb_II96pjjCFr1AB2132fjwUww/edit?tab=t.0'
        }
      ]
    }
  ];

  return (<>
    {!visible && <Button
      className={styles.openButton}
      type="button"
      icon="pi pi-bars"
      rounded
      outlined
      onClick={() => setVisible(true)}
    />}
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      content={({ closeIconRef, hide }) => (<>
        <div className={styles.avatarBlock}>
          <Avatar
            className={styles.avatar}
            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            shape="circle"
            label="GN"
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
          socialLinks={[
            {
              media: SocialMedia.GitHub,
              link: ""
            },
            {
              media: SocialMedia.LinkedIn,
              link: ""
            }
          ]}
          iconSize={25}
        />
        <div className={styles.menuSection}>
          <PanelMenu model={items}/>
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

export default MenuBar;