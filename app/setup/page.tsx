'use client';
import styles from "./page.module.css";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {PrimeIcons} from "primereact/api";

export default function Setup() {
  return (
    <div className={styles.page}>
      <Card
        title="Core"
        subTitle={<>Setup page for the core configuration of the application.</>}
        footer={<Button
          label="Setup"
          className="p-button-outlined p-button-secondary"
          icon={PrimeIcons.ANGLE_RIGHT}
          iconPos={"right"}
          onClick={() => window.location.href = '/core/setup'}
        />}
        header={<>header</>}
        className="md:w-25rem"
      />
    </div>
  );
}
