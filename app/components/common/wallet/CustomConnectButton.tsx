import { Button } from "@mui/material";
import { ConnectWalletModal } from "./ConnectWalletModal";
import { useContext, useEffect, useState } from "react";
import { CustomConnectedView } from "./CustomConnectedView";
import { AddressContext } from "./context/AddressContext";
import { isAddress } from "viem";
import { addProvidersListeners, getCurrentProvider, removeProvidersListeners } from "./GetProvide";
import { BalanceContext } from "./context/BalanceContext";

export const CustomConnectButton = ()=>{
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userBalance, setUserBalance] = useState<bigint>(BigInt(0));
    const {address: userAddress, setAddress} = useContext(AddressContext);
    const {setBalance} = useContext(BalanceContext);

    const onClickConnect = ()=>{
        setIsModalOpen(true);
    }

    const onCloseModal = ()=>{
        setIsModalOpen(false);
    }

    const checkBalance = async ()=> {
        if (window && window.ethereum) {
            try {
                console.log("检查账户余额...");
                console.log("当前账户地址:", userAddress);
                const targetProvider = getCurrentProvider();
                const balanceStr: string = await targetProvider?.request({ 
                    method: "eth_getBalance", 
                    params: [userAddress!, "latest"]
                }) as string;
                console.log("账户余额:", balanceStr);

                setUserBalance(BigInt(balanceStr));
            } catch (error) {
                console.log("账户余额失败:", error);
            }
        }
    }

    useEffect(() => {
        addProvidersListeners();

        const accountOnChange = (accounts: `0x${string}`[])=>{
            if (accounts.length === 0) {
                console.log("账户已断开连接");
                setAddress("0x00");
                setBalance(BigInt(0));
                localStorage.removeItem("connectedWallet");
            }
        }

        const checkConnection = async () => {
            try {
                const targetProvider = getCurrentProvider();
                if (!targetProvider) {
                    console.log("未检测到 提供程序。请确保已安装并启用 扩展程序。");
                    return;
                }
                const accounts: `0x${string}`[] = await targetProvider.request({ method: 'eth_accounts' , params: []}) as `0x${string}`[];
                if (accounts && accounts.length > 0 && localStorage.getItem("connectedWallet")) {
                    setAddress(accounts[0]);
                    targetProvider.on('accountsChanged', accountOnChange);
                }
                else {
                    console.log("钱包未连接");
                }
                
            } catch {
                console.log("检查连接状态失败");
            }
        };
        checkConnection();

        return () => {
            removeProvidersListeners();
            const targetProvider = getCurrentProvider();
            if (targetProvider) {
                targetProvider.off('accountsChanged', accountOnChange);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isAddress(userAddress)) {
            checkBalance();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress]);

    return (
        <div>
            {
                !isAddress(userAddress) && 
                <Button onClick={onClickConnect} sx={{margin: "1rem 1rem"}} variant="contained" color="primary">连接钱包</Button>
            }

            {
                isAddress(userAddress) && 
                <CustomConnectedView balanceETH={userBalance} address={userAddress} />
            }

            <ConnectWalletModal isOpen={isModalOpen} onClose={onCloseModal} />
        </div>
    );
}