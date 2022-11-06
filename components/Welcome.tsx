import React from "react";
import styles from "../styles/Welcome.module.scss";
import Account from "./Account";
import { Disconnect } from "./Connect";
import Lens from "./Lens";
import Tweets from "./Tweets";

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.disconnect}>
        <Disconnect />
      </div>
      <div className={styles.container}>
        <Account />
        <Lens />
        <div className={styles.cardContainer}>
          <Tweets />
        </div>
      </div>
    </div>
  );
}
