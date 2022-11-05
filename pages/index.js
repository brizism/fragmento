import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useProfile } from "@memester-xyz/lens-use";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useProfile("stani.lens");
  // console.log("✨  ", data);

  const session = useSession();

  console.log({ session })

  return <div className={styles.container}>
    {!session.data && <>
  Not signed in <br/>
  <button onClick={() => signIn()}>Sign in</button>
</>}
{session.data && <>
  Signed in as {session.data?.user?.name} <br/>
  <button onClick={() => signOut()}>Sign out</button>
</>}
  </div>;
}
