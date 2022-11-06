import React, { useEffect, useState } from "react";

import { useAccount } from "wagmi";
import Intro from "../components/Intro";
import styles from "../styles/Home.module.scss";
import Welcome from "../components/Welcome";

export default function Home() {
  const { isConnected } = useAccount();

  const [connect, setConnect] = useState();

  useEffect(() => {
    setConnect(isConnected);
  }, [isConnected]);

  return (
    <div>
      {!connect && <Intro />}
      {connect && <Welcome />}
      <div className={styles.container}></div>
    </div>
  );
}
