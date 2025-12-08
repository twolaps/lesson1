import { Button } from "@mui/material";
import { ConnectWalletModal } from "./notConnected/ConnectWalletModal";
import { useContext, useEffect, useState } from "react";
import { CustomConnectedView } from "./connected/CustomConnectedView";
import { AddressContext } from "./context/AddressContext";
import { isAddress } from "viem";
import { addProvidersListeners, getCurrentProvider, removeProvidersListeners } from "./GetProvide";
import { BalanceContext } from "./context/BalanceContext";
import { ChainContext } from "./context/ChainContext";
import { MetaNodeContext } from "./context/MetaNodeContext";

export const CustomConnectButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { address: userAddress, setAddress } = useContext(AddressContext);
  const { balance: userBalance, setBalance, refetchBalance: fetchBalance } = useContext(BalanceContext);
	const { metaNodeBalance } = useContext(MetaNodeContext);
	const { chainId, setChainId } = useContext(ChainContext);

  const onClickConnect = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    addProvidersListeners();

    const accountOnChange = (accounts: `0x${string}`[]) => {
      if (accounts.length === 0) {
        console.log("账户已断开连接");
        setAddress("0x00");
        setBalance(BigInt(0));
        localStorage.removeItem("connectedWallet");
      }
    };

    const checkConnection = async () => {
      try {
        const targetProvider = getCurrentProvider();
        if (!targetProvider) {
          console.log("未检测到 提供程序。请确保已安装并启用 扩展程序。");
          return;
        }
        const accounts: `0x${string}`[] = await targetProvider.request({ method: 'eth_accounts', params: [] }) as `0x${string}`[];
        if (accounts && accounts.length > 0 && localStorage.getItem("connectedWallet")) {
          setAddress(accounts[0]);
          targetProvider.on('accountsChanged', accountOnChange);
					const id = await getCurrentProvider();
					console.log("当前链ID:", id);
					if (Number(id) > 0) {
						setChainId(Number(id));
					}
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
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress, chainId]);

  return (
    <div>
      {
        !isAddress(userAddress) &&
        <Button onClick={onClickConnect} sx={{ margin: "1rem 1rem" }} variant="contained" color="primary">连接钱包</Button>
      }

      {
        isAddress(userAddress) &&
        <CustomConnectedView balanceETH={userBalance} address={userAddress} metaNodeBalance={metaNodeBalance} />
      }

      <ConnectWalletModal isOpen={isModalOpen} onClose={onCloseModal} />
    </div>
  );
}