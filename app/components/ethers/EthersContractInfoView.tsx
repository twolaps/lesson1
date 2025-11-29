import { contractAddress } from "@/app/const/ContractConst";
import { ETHERS_CONTRACT_TRANSACT_EVENT, ETHERS_MINT_EVENT, eventBus } from "@/app/tool/EventBus";
import { Contract, formatUnits } from "ethers";
import { BrowserProvider } from "ethers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { erc20Abi } from "viem";

interface EthersContractInfoViewProps {
    address: string;
}

export const EthersContractInfoView = ({ address }: EthersContractInfoViewProps)=> {
    const [balanceTxt, setBalanceTxt] = useState('my_balance: 余额加载中...');
    const [contractBalanceTxt, setContractBalanceTxt] = useState("contract_balance: 余额加载中...");

    useEffect(()=>{
        const fetchBalance = async (title:string, checkAddress: string, setFunction:Dispatch<SetStateAction<string>>) => {
            if (typeof window === 'undefined' || !window.ethereum) {
                return;
            }
            const provider: BrowserProvider = new BrowserProvider(window.ethereum);
            const contract:Contract = new Contract(contractAddress, erc20Abi, provider);
            try {
                const balance: bigint = await contract.balanceOf(checkAddress);
                setFunction(`${title}: ${ balance ? formatUnits(balance, 18) : 0}`);
            }
            catch {
                setFunction(`${title}: 查询失败`);
            }
        }

        fetchBalance("my_balance", address, setBalanceTxt);
        fetchBalance("contract_balance", contractAddress, setContractBalanceTxt);

        const onMintSuccess = () => {
            fetchBalance("my_balance", address, setBalanceTxt);
        }

        const onContractTransact = () => {
            fetchBalance("my_balance", address, setBalanceTxt);
            fetchBalance("contract_balance", contractAddress, setContractBalanceTxt);
        }

        eventBus.on(ETHERS_MINT_EVENT, onMintSuccess);
        eventBus.on(ETHERS_CONTRACT_TRANSACT_EVENT, onContractTransact);
        return ()=>{
            eventBus.off(ETHERS_MINT_EVENT, onMintSuccess);
            eventBus.off(ETHERS_CONTRACT_TRANSACT_EVENT, onContractTransact);
        }
    }, [address]);

    return (
        <div>
            <h1>contract_address: {contractAddress}</h1>
            <h1>{balanceTxt}</h1>
            <h1>{contractBalanceTxt}</h1>
        </div>
    );
}