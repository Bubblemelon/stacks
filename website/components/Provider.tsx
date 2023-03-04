import { WagmiConfig, createClient, useBalance } from "wagmi";
import { getDefaultProvider } from "ethers";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import styles from "../styles/Provider.module.css";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function Profile() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const { data, isError, isLoading } = useBalance({
    address,
  });

  if (isConnected)
    return (
      <div>
        Connected to {address}
        {/* <button onClick={() => disconnect()}>Disconnect</button> */}
        <div>
          Current Balance: {data?.formatted} {data?.symbol}
        </div>
      </div>
    );
  else
    return (
      <div className={styles.description}>
        Get started by signing your wallet
      </div>
    );
  // return <button onClick={() => connect()}>Connect Wallet</button>;
}

export default function Provider() {
  return (
    <WagmiConfig client={client}>
      <Profile />
    </WagmiConfig>
  );
}
