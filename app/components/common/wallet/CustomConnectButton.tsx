import { Button } from "@mui/material";
import { ConnectWalletModal } from "./ConnectWalletModal";
import { useContext, useEffect, useState } from "react";
import { addProvidersListeners, removeProvidersListeners } from "./GetProvide";
import { CustomConnectedView } from "./CustomConnectedView";
import { useAccount } from "wagmi";
import { stringToBigint } from "@/tool/StringUtils";
import { BalanceContext, BalanceProvider } from "./context/BalanceContext";
import { AddressContext } from "./context/AddressContext";
import { isAddress } from "viem";

enum ConnectStatus {
    NotConnected = "连接钱包",
    Connected = "已连接"
}

export const CustomConnectButton = ()=>{
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [connectStatus, setConnectStatus] = useState<ConnectStatus>(ConnectStatus.NotConnected);
    const [userBalance, setUserBalance] = useState<bigint>(BigInt(0));
    const {setBalance} = useContext(BalanceContext);
    const {address: userAddress, setAddress} = useContext(AddressContext);

    const onClickConnect = ()=>{
        setIsModalOpen(true);
    }

    const onCloseModal = ()=>{
        setIsModalOpen(false);
    }

    const checkBalance = async ()=> {
        if (window && window.ethereum) {
            try {
                const balanceStr: string = await window.ethereum.request({ 
                    method: "eth_getBalance", 
                    params: [userAddress!, "latest"],
                    query: {enabled: (connectStatus === ConnectStatus.Connected && !!userAddress)}
                });

                setUserBalance(BigInt(balanceStr));
            } catch (error) {
                console.log("账户余额失败:", error);
            }
        }
    }

    useEffect(() => {
        addProvidersListeners();

        const checkConnection = async () => {
            if (window && window.ethereum) {
                try {
                    const accounts: `0x${string}`[] = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setAddress(accounts[0]);
                        setConnectStatus(ConnectStatus.Connected);
                    }
                    else {
                        setConnectStatus(ConnectStatus.NotConnected);
                    }
                } catch {
                    setConnectStatus(ConnectStatus.NotConnected);
                }
            }
        };
        checkConnection();
        return () => {
            // 清理监听器的逻辑（如果需要）
            removeProvidersListeners();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (connectStatus === ConnectStatus.Connected && isAddress(userAddress)) {
            checkBalance();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connectStatus, userAddress]);

    return (
        <div>
            {
                connectStatus === ConnectStatus.NotConnected && 
                <Button onClick={onClickConnect} sx={{margin: "1rem 1rem"}} variant="contained" color="primary">连接钱包</Button>
            }

            {
                connectStatus === ConnectStatus.Connected && 
                <CustomConnectedView balanceETH={userBalance}/>
            }

            <ConnectWalletModal isOpen={isModalOpen} onClose={onCloseModal} />
        </div>
    );
}