import styles from "../styles/Home.module.css";
import { useProfile } from "@memester-xyz/lens-use";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import swr from "swr";
// import Tweets from "./api/user-tweets";

const fetchTweets = (userId) => swr(userId, () => fetch(`/api/user-tweets/${userId}`).then(res => res.json()), { revalidateOnFocus: true })

const Tweets = ({ userId = undefined }) => {
  const { data, error, isValidating } = fetchTweets(userId);

  const [tweets, setTweets] = useState([]);

  console.log({ data, error })

  useEffect(() => {
    if (data?.length) {
      setTweets(data);
    }
  }, [data])
  return (
    <div>
      {error && <div>Failed to load</div>}

      {!data && isValidating && <div>Loading...</div>}

      {tweets.map((tweet) => <div key={tweet.id}>{tweet.text}</div>)}
    </div>
  )
}

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
  {session.data?.user?.name && <Tweets userId={session.data?.user?.id} />}
  </div>;
}
