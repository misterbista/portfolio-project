'use client';
import styles from "./page.module.css";
import ConfigurationGroupCard from "./ConfigurationGroupCard";

export default function Index() {
  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        <ConfigurationGroupCard
          icon={<i className={"pi pi-wrench"}/>}
          title="Core"
          description="Set core configuration values for the website."
          pagePath="/setup/core"
        />
        <ConfigurationGroupCard
          icon={<i className={"pi pi-bars"}/>}
          title="Sidebar"
          description="Customize the sidebar."
          pagePath="/setup/sidebar"
        />
        <ConfigurationGroupCard
          icon={<i className={"pi pi-bars"}/>}
          title="Home"
          description="Customize the Landing page."
          pagePath="/setup/home"
        />
      </div>
    </div>
  );
}
