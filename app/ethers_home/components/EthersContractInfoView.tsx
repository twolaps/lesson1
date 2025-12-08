import { AddressContext } from "@/app/components/common/wallet/context/AddressContext";
import { getCurrentChainId, getCurrentProvider } from "@/app/components/common/wallet/GetProvide";
import { contractAddress } from "@/constants/address";
import { ETHERS_CONTRACT_TRANSACT_EVENT, ETHERS_MINT_EVENT, eventBus } from "@/tool/EventBus";
import { Contract, formatUnits } from "ethers";
import { BrowserProvider } from "ethers";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { erc20Abi } from "viem";

export const EthersContractInfoView = ()=> {
    const {address} = useContext(AddressContext);
    const [balanceTxt, setBalanceTxt] = useState('my_balance: 余额加载中...');
    const [contractBalanceTxt, setContractBalanceTxt] = useState("contract_balance: 余额加载中...");

    useEffect(()=>{
        const fetchBalance = async (title:string, checkAddress: string, setFunction:Dispatch<SetStateAction<string>>) => {
						const eip1193Provider = getCurrentProvider();
						if (!eip1193Provider) {
								alert('未检测到 提供程序。请确保已安装并启用 扩展程序。');
								return;
						}

            const provider: BrowserProvider = new BrowserProvider(eip1193Provider);
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