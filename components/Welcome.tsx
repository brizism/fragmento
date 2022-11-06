import React from "react";
import styles from "../styles/Welcome.module.scss";
import Account from "./Account";
import { Disconnect } from "./Connect";
import Lens from "./Lens";
import Card from "./Card";

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
          <Card
            avatarURL="https://t4.ftcdn.net/jpg/04/32/19/49/360_F_432194964_DpD6qSbujspDDgVVxOXI8j9ADG1f8LcC.jpg"
            name="brizism"
            username="@brizism"
            date="Oct 27"
            text="when u try to leave the club but then they start playing ur song"
            image="https://t4.ftcdn.net/jpg/04/32/19/49/360_F_432194964_DpD6qSbujspDDgVVxOXI8j9ADG1f8LcC.jpg"
          />
          <Card
            avatarURL="https://t4.ftcdn.net/jpg/04/32/19/49/360_F_432194964_DpD6qSbujspDDgVVxOXI8j9ADG1f8LcC.jpg"
            name="brizism"
            username="@brizism"
            date="Oct 27"
            text="🎟️🎟️🎟️\nRolling out community based invites for ORB! \n\nComment if you are active ORB user and want to bring your other Lens frens here. Will credit a few invites to all the interesting people!\n🎟️🎟️🎟️"
          />
        </div>
      </div>
    </div>
  );
}
