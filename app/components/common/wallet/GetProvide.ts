
export type ProviderType = {
    info: WalletInfo,
    provider: WalletProvider
}

export enum WalletType {
    METAMASK = "MetaMask",
    OKX = "OKX Wallet",
    COINBASE = "Coinbase Wallet"
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
    const providrType: ProviderType | undefined = connectedWallet ? walletProviders.get(connectedWallet) : undefined;
    if (connectedWallet && providrType) {
        return providrType.provider;
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