import { AddressContext } from "@/app/components/common/wallet/context/AddressContext";
import { BalanceContext } from "@/app/components/common/wallet/context/BalanceContext";
import { formatEther } from "ethers";
import { useContext, useEffect, useState } from "react";

export const EthersInfoView = ()=> {
		const {address} = useContext(AddressContext);
		const {balance} = useContext(BalanceContext);

    return (
        <div>
            <h1>my_address: {address}</h1>
            <h1>eth_balance: {formatEther(balance)}</h1>
        </div>
    );
}