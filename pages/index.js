import React from "react";
import Head from "next/head";
import Image from "next/image";
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
  const [connect, setConnect] = useState();

  useEffect(() => {
    setConnect(isConnected);
  }, [isConnected]);

  return (
    <div>
      {!connect && <Intro />}
      {connect && <Welcome />}
    </div>
  );
}
