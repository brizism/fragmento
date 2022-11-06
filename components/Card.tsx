import React from "react";
import styles from "../styles/Card.module.scss";
import Image from "next/image";

type CardProps = {
  avatarURL: string;
  name: string;
  username: string;
  date: string;
  text: string;
  image?: string;
};

export default function Card({
  avatarURL,
  name,
  username,
  date,
  text,
  image,
}: CardProps): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Image src={avatarURL} alt="avatar" width={50} height={50} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.name}>{name}</p>
          <p className={styles.username}>{username}</p>
          <p className={styles.date}>• {date}</p>
        </div>
        <div className={styles.text}>{text}</div>
        {image ? (
          <Image src={image} alt="tweet image" width={400} height={400} />
        ) : null}
      </div>
    </div>
  );
}
