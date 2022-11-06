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
  function replaceWithBr(string) {
    return string.replace(/\\n/g, " <br /> ");
  }
  // get the date wiithout the day of the week
  const formattedDate = date && new Date(date).toDateString();
  const dateWithoutDay = formattedDate.split(" ").slice(1).join(" ");

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Image src={avatarURL} alt="avatar" width={50} height={50} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.name}>{name}</p>
          <p className={styles.username}>{`@${username}`}</p>
          <p className={styles.date}>• {dateWithoutDay}</p>
        </div>
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: replaceWithBr(text) }}
        />
        {image ? (
          <Image src={image} alt="tweet image" width={400} height={400} />
        ) : null}
        <div className={styles.footer}>
          <div className={styles.comments}>
            <Image src="/comment.png" alt="comment" width={20} height={20} />2
          </div>
          <div className={styles.retweets}>
            <Image src="/retweet.png" alt="comment" width={20} height={20} />
            45
          </div>
          <div className={styles.likes}>
            <Image src="/heart.png" alt="comment" width={20} height={20} />
            234
          </div>
        </div>
      </div>
    </div>
  );
}
