import { ETHERS_TRANSACT_EVENT, eventBus } from "@/app/tool/EventBus";
import { BrowserProvider, formatEther } from "ethers";
import { useEffect, useState } from "react";

interface EthersInfoViewProps {
    address: string;
}

export const EthersInfoView = ({address}: EthersInfoViewProps)=> {
    const [balance, setBalance] = useState<bigint>(BigInt(0));

    useEffect(()=>{
        const getBalance = async () => {
            if (typeof window === 'undefined' || !window.ethereum) {
                return;
            }
            const provider: BrowserProvider = new BrowserProvider(window.ethereum);
            const balance: bigint = await provider.getBalance(address);
            setBalance(balance);
        }

        if (address && address.length > 0) {
            getBalance();
        }


        eventBus.on(ETHERS_TRANSACT_EVENT, getBalance);

        return ()=>{
            eventBus.off(ETHERS_TRANSACT_EVENT, getBalance);
        }
    }, [address]);

    return (
        <div>
            <h1>my_address: {address}</h1>
            <h1>eth_balance: {formatEther(balance)}</h1>
        </div>
    );
}