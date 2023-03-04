import React, { useState } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

import {
  STATUS,
  STATUS_ICONS,
  STATUS_TITLES,
  STATUS_DESCRIPTION,
} from "./constants";

function PopupContainer({ status = STATUS.WARN }) {
  const StatusIcon = STATUS_ICONS[status];

  return (
    <div className={styles.popupContainer}>
      <div className={styles.statusIcon}>
        <StatusIcon className={clsx(styles.statusIcon, styles[status])} />
        <StatusIcon className={clsx(styles.ghost, styles[status])} />
      </div>
      <div className={styles.statusHeading}>
        <h1 className={clsx(styles.title, styles[status])}>
          {STATUS_TITLES[status]}
        </h1>
        <p className={styles.description}>{STATUS_DESCRIPTION[status]}</p>
      </div>
      <ul className={styles.rules}>
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
      </ul>
    </div>
  );
}

export { PopupContainer };
