import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import useIsMounted from "../hooks/useIsMounted";
import Button from "./Button";

export function Disconnect() {
  const { connector, isConnected } = useAccount();
  const { error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <div>
        {isConnected && (
          <Button onClick={() => disconnect()}>Disconnect</Button>
        )}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
}

export default function Connect() {
  const isMounted = useIsMounted();
  const { connector } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  console.log(connectors);
  return (
    <div>
      <div>
        {connectors
          .filter((x) => isMounted && x.ready && x.id !== connector?.id)
          .map((x) => (
            <Button key={x.id} onClick={() => connect({ connector: x })}>
              Connect wallet
              {isLoading && x.id === pendingConnector?.id && " (connecting)"}
            </Button>
          ))}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
}
