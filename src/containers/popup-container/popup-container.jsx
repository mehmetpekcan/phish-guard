import React, { useEffect, useState } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

import {
  STATUS,
  STATUS_ICONS,
  STATUS_TITLES,
  STATUS_DESCRIPTION,
} from "./constants";

function PopupContainer({ status }) {
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    async function callback(tabs) {
      var [{ active, status, url }] = tabs;

      if (status === "complete" && active && url.startsWith("http")) {
        const { hostname } = new URL(url);

        const verifiedSites = await chrome.storage.local.get();
        setCurrentStatus(verifiedSites[hostname] ?? STATUS.WARN);
      }
    }

    chrome.tabs.query({ active: true, currentWindow: true }, callback);
    chrome.tabs.onUpdated.addListener(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, callback);
    });
  }, []);

  if (!currentStatus) {
    return (
      <div className={styles.popupContainer}>
        <div className={styles.statusHeading}>
          <h1 className={clsx(styles.title)}>
            Loading phishing status powered by AI
          </h1>
        </div>
      </div>
    );
  }

  const StatusIcon = STATUS_ICONS[currentStatus];

  return (
    <div className={styles.popupContainer}>
      <div className={styles.statusIcon}>
        <StatusIcon
          className={clsx(styles.statusIcon, styles[currentStatus])}
        />
        <StatusIcon className={clsx(styles.ghost, styles[currentStatus])} />
      </div>
      <div className={styles.statusHeading}>
        <h1 className={clsx(styles.title, styles[currentStatus])}>
          {STATUS_TITLES[currentStatus]}
        </h1>
        <p className={styles.description}>
          {STATUS_DESCRIPTION[currentStatus]}
        </p>
      </div>
      {/* <ul className={styles.rules}>
        <li className={styles.ruleItem}>
          <StatusIcon />
          <span>URL Correctness</span>
        </li>
        <li className={styles.ruleItem}>
          <StatusIcon />
          <span>SSL Certificate</span>
        </li>
        <li className={styles.ruleItem}>
          <StatusIcon />
          <span>Brand Recognition</span>
        </li>
        <li className={styles.ruleItem}>
          <StatusIcon />
          <span>Fraud Detection</span>
        </li>
      </ul> */}
    </div>
  );
}

export { PopupContainer };
