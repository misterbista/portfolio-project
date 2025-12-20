'use client';
import styles from "./page.module.css";
import {useConfig} from "../setup/useConfig";
import {ConfigIdentifiers} from "../setup/ConfigIdentifiers";
import {Image} from "primereact/image";
import RenderLink from "../RenderLink";

export default function Setup() {
  const {
    data: coreConfig,
    isLoading: coreConfigLoading
  } = useConfig(ConfigIdentifiers.Core);

  const {
    data: aboutConfig,
    isLoading: aboutConfigLoading
  } = useConfig(ConfigIdentifiers.About);

  if (aboutConfigLoading || coreConfigLoading || !aboutConfig || !coreConfig) {
    return null;
  }

  return (
    <div className={styles.page}>
      <span className={styles.pageHeader}>About</span>
      <div className={styles.pageText}>{aboutConfig.aboutMe}</div>
      <div className={styles.pageContent}>
        <Image
          className={styles.pagePhoto}
          src={aboutConfig.photo}
          alt={coreConfig.fullName}
          width={"100%"}
          height={"auto"}
          preview
        />
        <div className={styles.keypoints}>
          {aboutConfig.keypoints.map(keypoint => (
            <div className={styles.keypoint} key={keypoint.title.replaceAll(/[^a-zA-Z0-9-_]/g, "")}>
              <span className={styles.keypointHead}>{keypoint.title}:</span>
              <span className={styles.keypointValue}>{<RenderLink text={keypoint.value}/>}</span>
            </div>
          ))}
        </div>
      </div>
      { aboutConfig.additionalInformation && <div className={styles.pageText}>{aboutConfig.additionalInformation}</div> }
    </div>
  );
}
