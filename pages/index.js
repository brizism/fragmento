import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/Home.module.scss";
import { useProfile } from "@memester-xyz/lens-use";
import { useEffect, useState } from "react";
import Intro from "../components/Intro";
import { useAccount } from "wagmi";
import Connect, { Disconnect } from "../components/Connect";
import Welcome from "../components/Welcome";

export default function Home() {
  const { data } = useProfile("stani.lens");
  const { isConnected } = useAccount();
  console.log("✨  ", data);
  const session = useSession();
  const [connect, setConnect] = useState();

  useEffect(() => {
    setConnect(isConnected);
  }, [isConnected]);

  return (
    <div>
      {!connect && <Intro />}
      {connect && <Welcome />}
      <div className={styles.container}>
        {!session.data && (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session.data && (
          <>
            Signed in as {session.data?.user?.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </div>
      ;
    </div>
  );
}
