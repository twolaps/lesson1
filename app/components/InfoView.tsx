'use client'

import { formatUnits } from 'viem'
import { useContext } from "react";
import { BalanceContext } from "./common/wallet/context/BalanceContext";
import { AddressContext } from "./common/wallet/context/AddressContext";

export const InfoView = ()=>{
		const {address} = useContext(AddressContext);
		const {balance} = useContext(BalanceContext);

    let balanceStr: string = '0.0000';
    if (!address){
        balanceStr = '请连接钱包';
    }
    else {
        balanceStr = formatUnits(balance ?? BigInt(0), 18);
    }

		console.log("InfoView 渲染:", {balanceStr});
    return (
        <div>
            <h1>my_address: {address}</h1>
            <h1>eth_balance: {balanceStr}</h1>
        </div>
    )
}