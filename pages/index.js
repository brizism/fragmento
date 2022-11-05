import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useProfile } from "@memester-xyz/lens-use";
import { useEffect, useState } from "react";

export default function Home() {
  const { data } = useProfile("stani.lens");
  console.log("✨  ", data);

  return <div className={styles.container}></div>;
}
