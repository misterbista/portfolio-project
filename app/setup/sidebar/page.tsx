'use client';
import styles from "./page.module.css";
import {useConfig} from "../useConfig";
import {ConfigIdentifiers} from "../ConfigIdentifiers";
import {FloatLabel} from "primereact/floatlabel";
import {InputText} from "primereact/inputtext";
import React, {useEffect, useState} from "react";
import ViewOrCopyConfigValues from "../ViewOrCopyConfigValues";

export default function Index() {
  const {
    data,
    isLoading
  } = useConfig(ConfigIdentifiers.Sidebar);

  const [config, setConfig] = useState<typeof data>({} as typeof data);
  const updateShadowConfig = async (event: React.FormEvent) => {
    const fieldName = (event.target as HTMLInputElement).name;
    const fieldValue = (event.target as HTMLInputElement).value;
    setConfig((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue
      }
    });
  }
  useEffect(() => {
    setConfig(JSON.parse(JSON.stringify(data || {})));
  }, [data]);

  return (
    <div className={styles.page}>
      <h1>Sidebar Configuration <ViewOrCopyConfigValues config={JSON.stringify(
        config,
        null,
        "  "
      )} /></h1>
      {isLoading || !config ? "Loading..." : (
        <form>
          <FloatLabel>
            <InputText name={"profilePhoto"} value={config.profilePhoto || ""} onChange={(e) => updateShadowConfig(e)} />
            <label htmlFor="profilePhoto">Profile Photo URL</label>
          </FloatLabel>
        </form>
      )}
    </div>
  );
}
