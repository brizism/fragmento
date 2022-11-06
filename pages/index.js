import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import Intro from "../components/Intro";
import styles from "../styles/Home.module.scss";
import Welcome from "../components/Welcome";

export default function Home() {
  const { isConnected } = useAccount();
  const session = useSession();
  const [connect, setConnect] = useState();

  console.log({ session });

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
    </div>
  );
}
