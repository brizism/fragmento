import React from "react";
import styles from "../styles/Welcome.module.scss";
import Account from "./Account";
import { Disconnect } from "./Connect";
import { signIn, signOut, useSession } from "next-auth/react";
import Lens from "./LensConnect";
import Tweets from "./Tweets";
import Button from "../components/Button";

export default function Welcome() {
  const session = useSession();
  return (
    <div className={styles.welcome}>
      <div className={styles.disconnect}>
        <Disconnect />
      </div>
      <div className={styles.container}>
        <Account />
        <Lens />
        {!session.data && (
          <>
            <Button onClick={() => signIn()}>Sign in with Twitter</Button>
          </>
        )}
        {session.data && (
          <>
            Signed in as @{session.data?.user?.name} <br />
            <Button onClick={() => signOut()}>Sign out</Button>
          </>
        )}
        <div className={styles.cardContainer}>
          <Tweets />
        </div>
      </div>
    </div>
  );
}
