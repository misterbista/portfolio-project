import React, {useEffect, useState} from 'react';
import {PrimeIcons} from "primereact/api";
import {Dialog} from "primereact/dialog";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';


const ViewOrCopyConfigValues = (
  {config}: { config: string }
) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    if (!showCheck) return;
    const timer = setTimeout(() => {
      setShowCheck(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showCheck]);

  const copyToClipboard = async (text: string) => {
    setShowCheck(true);
    await navigator.clipboard.writeText(text);
  }

  return (
    <span
      style={{
        display: "inline-flex",
        justifyContent: "flex-start",
        gap: "5px",
        alignItems: "center",
        margin: "5px"
      }}
    >
      <i
        style={{cursor: "pointer"}}
        className={showCheck ? PrimeIcons.CHECK :PrimeIcons.COPY}
        onClick={async () => await copyToClipboard(config)}
      />
      <i
        style={{cursor: "pointer"}}
        className={showPreview ? PrimeIcons.EYE_SLASH : PrimeIcons.EYE}
        onClick={() => setShowPreview(!showPreview)}
      />
      <Dialog
        header="JSON Preview"
        modal={false}
        visible={showPreview}
        maximizable={true}
        resizable={true}
        onHide={() => setShowPreview(false)}
        style={{
          width: 'auto', maxWidth: '100%',
          height: 'auto', maxHeight: '100%'
        }}
      >
        <pre
          className="language-json"
          style={{
            width: "100%",
            height: "100%",
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          <code className="language-json">
            {config}
          </code>
        </pre>
      </Dialog>
    </span>
  );
};

export default ViewOrCopyConfigValues;