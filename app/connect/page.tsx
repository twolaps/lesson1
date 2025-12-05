'use client';
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

