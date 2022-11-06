import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import swr from "swr";
import Card from "./Card";

const fetchTweets = (userId) =>
  swr(
    userId,
    () => fetch(`/api/user-tweets/${userId}`).then((res) => res.json()),
    { revalidateOnFocus: true }
  );

export default function Tweets() {
  const session = useSession() as any;
  const {
    name,
    username,
    profile_image_url: image,
    id: userId,
  } = session.data?.user || {};

  const { data, error, isValidating } = fetchTweets(userId);

  const [tweets, setTweets] = useState([]);

  console.log({ data, error });

  useEffect(() => {
    if (data?.length) {
      setTweets(
        data.filter((tweet) => {
          const isReply = tweet.in_reply_to_user_id !== undefined;
          const isReplyToSelf = tweet.in_reply_to_user_id === tweet.author_id;
          const isRT = tweet.text.split(/RT/)[0] === "";

          return isReplyToSelf || (!isReply && !isRT);
        })
      );
    }
  }, [data]);
  return (
    <>
      {error && <div>Failed to load</div>}

      {!data && isValidating && <div>Loading...</div>}

      {tweets.map((tweet) => (
        <Card
          date={tweet.created_at}
          key={tweet.id}
          name={name}
          username={username}
          avatarURL={image}
          text={tweet.text}
          metrics={tweet.public_metrics}
        />
      ))}
    </>
  );
}
