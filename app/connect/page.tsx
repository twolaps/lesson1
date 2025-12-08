'use client';
import { AddressProvider } from "../components/common/wallet/context/AddressContext";
import { BalanceProvider } from "../components/common/wallet/context/BalanceContext";
import { ChainProvider } from "../components/common/wallet/context/ChainContext";
import { CustomConnectButton } from "../components/common/wallet/CustomConnectButton";
import { HeadView } from "../components/HeadView";

export default function ConnectPage() {
  return (
    <div>
			<HeadView/>
			<hr/>
			<CustomConnectButton />
    </div>
  )
}

