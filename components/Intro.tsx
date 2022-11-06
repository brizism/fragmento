import React from "react";
import styles from "../styles/Intro.module.scss";
import { useAccount } from "wagmi";
// import useIsMounted from "../hooks/useIsMounted";
import Connect from "./Connect";
import Account from "./Account";
import Image from "next/image";
import homePic from "../public/homePic.png";

export default function Intro() {
  // const isMounted = useIsMounted();
  const { isConnected } = useAccount();

  // if (!isMounted) return null;

  return (
    <div className={styles.intro}>
      <div className={styles.content}>
        <h1 className={styles.headline}>Bring your data to Web3</h1>
        <Connect />
        {/* {isConnected && (
          <>
            <Account />
          </>
        )} */}
      </div>
      <div className={styles.visual}>
        <Image
          src={homePic}
          alt="Welcome illustration"
          width={623}
          height={530}
        />
      </div>
    </div>
  );
}
