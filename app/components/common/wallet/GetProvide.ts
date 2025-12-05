
export type ProviderType = {
    info: WalletInfo,
    provider: WalletProvider
}

export enum WalletType {
    METAMASK = "MetaMask",
    OKX = "OKX Wallet",
    // 可以根据需要添加更多钱包类型
}

export interface WalletInfo {
  name: string;
  // 可以根据实际情况添加更多字段
}

export interface WalletProvider {
  // EIP-1193 标准方法参数类型
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  // 可以根据实际情况添加更多字段
}

// 存储所有发现的提供者
export const walletProviders: ProviderType[] = [];

function onProviderAnnounce(event: CustomEvent<ProviderType>) {
  const provider: ProviderType = event.detail;
  walletProviders.push(provider);
}  


export function addProvidersListeners() {
    // 监听钱包广播的事件
    window.addEventListener("eip6963:announceProvider", onProviderAnnounce as EventListener);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
}

export function removeProvidersListeners() {
    // 移除监听器
    window.removeEventListener("eip6963:announceProvider", onProviderAnnounce as EventListener);
    walletProviders.length = 0; // 清空已存储的提供者
}