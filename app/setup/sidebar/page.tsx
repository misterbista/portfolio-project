'use client';
import styles from "./page.module.css";
import {useConfig} from "../useConfig";
import {ConfigIdentifiers} from "../ConfigIdentifiers";

export default function Setup() {
  const {
    data,
    isLoading
  } = useConfig(ConfigIdentifiers.Sidebar);

  return (
    <div className={styles.page}>
      <h1>Sidebar Configuration</h1>
      {isLoading ? "Loading..." : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
