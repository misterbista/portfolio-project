'use client';
import styles from "./page.module.css";
import {useSetup} from "../useSetup";
import {SetupIdentifiers} from "../SetupIdentifiers";

export default function Setup() {
  const {
    data,
    isLoading
  } = useSetup(SetupIdentifiers.Sidebar);

  return (
    <div className={styles.page}>
      <h1>Sidebar Configuration</h1>
      {isLoading ? "Loading..." : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
