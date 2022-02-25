import React, { useState } from "react";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Accounts } from "./components/Accounts.tsx";

// @ts-ignore TypeScript says MetaMask isn't derived from Connector when it actually is
const [metaMask, hooks] = initializeConnector<MetaMask>((actions) =>
  new MetaMask(actions)
);

const { useChainId, useAccounts, useIsActive, useProvider, useENSNames } =
  hooks;

export const Index = () => {
  const chainId = useChainId();
  const accounts = useAccounts();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [signature, setSignature] = useState<string | undefined>("");

  const sign = async (msg: string) =>
    await provider?.getSigner().signMessage(msg);

  return (
    <>
      <button
        onClick={() => (isActive ? metaMask.deactivate() : metaMask.activate())}
      >
        {isActive ? "disconnect" : "connect with 🦊"}
      </button>
      {isActive && <div>Network with chainId {chainId}</div>}
      <Accounts {...{ accounts, ENSNames, provider }} />
      {isActive && (
        <>
          <button
            onClick={() => sign("Hello World").then((s) => setSignature(s))}
          >
            sign message
          </button>
          <code>{signature}</code>
        </>
      )}
    </>
  );
};
