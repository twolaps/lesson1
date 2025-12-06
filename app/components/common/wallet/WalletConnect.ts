import { WalletProvider, walletProviders, WalletType } from "./GetProvide";

/**
 * 连接metamask钱包
 * @param setAddress 
 */
export const connectMetamask = async (setAddress: (address: `0x${string}`) => void) => {
    try {
        const targetProvider: WalletProvider = walletProviders.get(WalletType.METAMASK)?.provider as WalletProvider;

        if (targetProvider) {
            const accounts = await targetProvider.request({
                method: "eth_requestAccounts" 
            });

            console.log(`✅ MetaMask 已连接成功！`);
            console.log("连接的账户:", accounts);
            localStorage.setItem("connectedWallet", WalletType.METAMASK);

            if (accounts instanceof Array && accounts.length > 0) {
                setAddress(accounts[0]);
            }
        }

    } catch (error) {
        console.error(`❌ 连接 Metamask 失败:`, error);
    }
}


/**
 * 连接OKXWallet钱包
 * @param setAddress 
 */
export const connectOKXWallet = async (setAddress: (address: `0x${string}`) => void) => {
    try {
        const targetProvider: WalletProvider = walletProviders.get(WalletType.OKX)?.provider as WalletProvider;
        if (targetProvider) {
            const accounts = await targetProvider.request({
                method: "eth_requestAccounts" 
            });

            console.log(`✅ OKX Wallet 已连接成功！`);
            console.log("连接的账户:", accounts);
            localStorage.setItem("connectedWallet", WalletType.OKX);

            if (accounts instanceof Array && accounts.length > 0) {
                setAddress(accounts[0]);
            }
        }
        else {
            console.error("❌ 未检测到 OKX Wallet 提供程序。请确保已安装并启用 OKX Wallet 扩展程序。");
        }

    } catch (error) {
        console.error(`❌ 连接 OKX Wallet 失败:`, error);
    }
}

/**
 * 连接Coinbase钱包
 * @param setAddress 
 */
export const connectCoinbaseWallet = async (setAddress: (address: `0x${string}`) => void) => {
    try {
        const targetProvider: WalletProvider = walletProviders.get(WalletType.COINBASE)?.provider as WalletProvider;
        if (targetProvider) {
            const accounts = await targetProvider.request({
                method: "eth_requestAccounts" 
            });

            console.log(`✅ Coinbase Wallet 已连接成功！`);
            console.log("连接的账户:", accounts);
            localStorage.setItem("connectedWallet", WalletType.COINBASE);

            if (accounts instanceof Array && accounts.length > 0) {
                setAddress(accounts[0]);
            }
        }
        else {
            console.error("❌ 未检测到 Coinbase Wallet 提供程序。请确保已安装并启用 Coinbase Wallet 扩展程序。");
        }

    } catch (error) {
        console.error(`❌ 连接 Coinbase Wallet 失败:`, error);
    }
}

