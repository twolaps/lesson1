import { Button } from "@mui/material";
import { ConnectWalletModal } from "./ConnectWalletModal";
import { useEffect, useState } from "react";
import { addProvidersListeners, removeProvidersListeners } from "./GetProvide";


enum ConnectStatus {
    NotConnected = "连接钱包",
    Connected = "已连接"
}

export const CustomConnectButton = ()=>{
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [connectStatus, setConnectStatus] = useState<ConnectStatus>(ConnectStatus.NotConnected);

    const onClickConnect = ()=>{
        setIsModalOpen(true);
    }

    const onCloseModal = ()=>{
        setIsModalOpen(false);
    }

    useEffect(() => {
        addProvidersListeners();

        const checkConnection = async () => {
            if (window && window.ethereum) {
                try {
                    const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
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
    }, []);



    return (
        <div>
            {
                connectStatus === ConnectStatus.NotConnected && 
                <Button onClick={onClickConnect} sx={{margin: "1rem 1rem"}} variant="contained" color="primary">连接钱包</Button>
            }

            {
                connectStatus === ConnectStatus.Connected && 
                <Button sx={{margin: "1rem 1rem"}} variant="outlined" disabled>已连接</Button>
            }
            
            <ConnectWalletModal isOpen={isModalOpen} onClose={onCloseModal} />
        </div>
    );
}