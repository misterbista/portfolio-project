import {ReactNode} from "react";
import {useRouter} from "next/navigation";
import {Card} from "primereact/card";
import styles from "./page.module.css";
import {Button} from "primereact/button";
import {PrimeIcons} from "primereact/api";

const ConfigurationGroupCard = (
  {icon, title, description, pagePath}: { icon: ReactNode; title: string; description: string, pagePath: string}
) => {
  const router = useRouter()
  return <Card
    className={styles.card}
    header={icon}
    title={title}
    subTitle={description}
    footer={<Button
      label="Setup"
      className="p-button-outlined p-button-secondary"
      icon={PrimeIcons.ANGLE_RIGHT}
      iconPos={"right"}
      onClick={() => router.push(pagePath)}
    />}
  />;
};

export default ConfigurationGroupCard;