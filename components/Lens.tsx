import React from "react";
import { useChallenge } from "@memester-xyz/lens-use";
import { useAccount } from "wagmi";
import Button from "./Button";

export default function Lens() {
  const { address } = useAccount();
  const { data: challengeData } = useChallenge(address);
  console.log(challengeData);
  return (
    <Button onClick={() => console.log("Login with Lens")}>
      Login with Lens
    </Button>
  );
}
