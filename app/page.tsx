'use client';
import styles from "./page.module.css";
import {useConfig} from "./setup/useConfig";
import {ConfigIdentifiers} from "./setup/ConfigIdentifiers";

export default function Home() {
  const {
    data: coreConfig,
    isLoading: coreConfigLoading
  } = useConfig(ConfigIdentifiers.Core);

  const {
    data: homeConfig,
    isLoading: homeConfigLoading
  } = useConfig(ConfigIdentifiers.Home);

  if (coreConfigLoading || homeConfigLoading || !coreConfig || !homeConfig) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div
        className={styles.heroImage}
        style={{background: `url("${homeConfig.heroPicture}")`}}
      />
      <div className={styles.heroText}>
        <span className={styles.heroTextPrimary}>{coreConfig.fullName}</span>
        <br/><br/>
        <span className={styles.heroTextSecondary}>{homeConfig.bio}</span>
      </div>
    </div>
  );
}
