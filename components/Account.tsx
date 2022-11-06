import React from "react";
import styles from "../styles/Account.module.scss";
import { useAccount, useEnsName } from "wagmi";

export default function Account() {
  const { address } = useAccount();
  const { data: ensNameData } = useEnsName({ address });

  return (
    <>
      <h1>Hello!</h1>
      <div className={styles.account}>
        {ensNameData ?? address}
        {ensNameData ? ` (${address})` : null}
      </div>
    </>
  );
}
