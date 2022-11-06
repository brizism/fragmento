import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import swr from "swr";
import Card from "./Card";
import { Web3Storage } from "web3.storage";
import { useLens } from "../hooks/useLens";

const formatCIDLink = (cid: string, file: string) => {
  return `ipfs://${cid}/${file}`;
};

function makeStorageClient() {
  return new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0M0UzNTU4NDNBMjhlYzUyNTM1OTQ2Mjc3QmIzRUVlMTRGYzI4NTMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njc3MTkyNDMxMjksIm5hbWUiOiJmcmFnbWVudG8ifQ.gR-2zyiWiflMeOI5zsDUDEgJtwScqms5N8vMQU9TvJM",
  });
}

function makeFileObjects(tweet: any) {
  const blob = new Blob([JSON.stringify(tweet)], { type: "application/json" });

  const files = [
    new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], `tweet_${tweet.id}.json`),
  ];
  return files;
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
}

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
  const { setFileCID } = useLens();

  const [tweets, setTweets] = useState([]);

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
        <span
          key={tweet.id}
          onClick={async () => {
            const cid = await storeFiles(makeFileObjects(tweet));
            console.log(cid);
            setFileCID(formatCIDLink(cid, `tweet_${tweet.id}.json`));
          }}
        >
          <Card
            date={tweet.created_at}
            // key={tweet.id}
            name={name}
            username={username}
            avatarURL={image}
            text={tweet.text}
            metrics={tweet.public_metrics}
          />
        </span>
      ))}
    </>
  );
}
