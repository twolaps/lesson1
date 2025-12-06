
export type ProviderType = {
    info: WalletInfo,
    provider: WalletProvider
}

export enum WalletType {
    METAMASK = "MetaMask",
    OKX = "OKX Wallet",
    COINBASE = "Coinbase Wallet",
    PHANTOM = "Phantom"
    // 可以根据需要添加更多钱包类型
}

export interface WalletInfo {
  name: WalletType;
  // 可以根据实际情况添加更多字段
}

export interface WalletProvider {
  // EIP-1193 标准方法参数类型
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  // 可以根据实际情况添加更多字段

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (event: string, handler: (...args: any[]) => void) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off: (event: string, handler: (...args: any[]) => void) => void;
}

// 存储所有发现的提供者
export const walletProviders: Map<WalletType, ProviderType> = new Map<WalletType, ProviderType>();

function onProviderAnnounce(event: CustomEvent<ProviderType>) {
  const provider: ProviderType = event.detail;
  walletProviders.set(provider.info.name, provider);
  console.log("Discovered wallet provider:", walletProviders.size, provider.info.name);
}

export const getCurrentProvider = (): WalletProvider | undefined => {
    const connectedWallet = localStorage.getItem("connectedWallet") as WalletType | null;
    const providerType: ProviderType | undefined = connectedWallet ? walletProviders.get(connectedWallet) : undefined;
    if (connectedWallet && providerType) {
        return providerType.provider;
    }
    else {
        return undefined;
    }
}


export function addProvidersListeners() {
    // 监听钱包广播的事件

    window.addEventListener("eip6963:announceProvider", onProviderAnnounce as EventListener);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
}

export function removeProvidersListeners() {
    // 移除监听器
    window.removeEventListener("eip6963:announceProvider", onProviderAnnounce as EventListener);
    walletProviders.clear(); // 清空已存储的提供者
}


export const getCurrentChainId = async (): Promise<string> => {
    try {
        const provider = getCurrentProvider();
        if (provider) {
            const chainId: string = await provider.request({
                method: "eth_chainId"
            }) as string;

            console.log("当前 chainId:", chainId);
            return chainId;
        }
        else {
            return "";
        }
    } catch (error) {
        console.log("查询 chainId 失败:", error);
        return "";
    }
};

export const switchToSepolia = async () => {
    try {
        const provider = getCurrentProvider();
        if (provider) {
            await provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0xaa36a7" }] // Sepolia 的 chainId（十六进制）
            });
            console.log("✅ 已切换到 Sepolia");
        }
        else {
            console.log("❌ 未检测到 提供程序。请确保已安装并启用 扩展程序。");
        }
        
    } catch (error) {
        console.error("❌ 切换到 Sepolia 失败:", error);
    }
};
