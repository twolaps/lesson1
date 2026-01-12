/**
 * 钱包提供者管理工具 (基于 EIP-6963 标准)
 * 用于发现、存储以及与浏览器注入的以太坊钱包进行交互
 */

/**
 * 组合类型：包含钱包元数据信息和实际的 EIP-1193 提供者对象
 */
export type ProviderType = {
  info: WalletInfo,     // 钱包的名字、图标等信息
  provider: WalletProvider // 用于发送 RPC 请求的提供者实例
}

/**
 * 支持的钱包类型枚举
 */
export enum WalletType {
  METAMASK = "MetaMask",
  OKX = "OKX Wallet",
  COINBASE = "Coinbase Wallet",
  PHANTOM = "Phantom",
	MY_WALLET = "My Wallet",
  // 可以根据需要在此添加更多支持的钱包
}

/**
 * 链 ID 与名称的映射表
 * 用于将数字格式的 ChainId 转换为可读的名称
 */
export const chainMap: Map<number, string> = new Map<number, string>([
	[1, "Ethereum"],
	[11155111, "Sepolia"],
]);

/**
 * 钱包元数据接口
 * EIP-6963 规范定义的钱包基本信息
 */
export interface WalletInfo {
  name: WalletType; // 钱包名称
  // uuid: string;  // 标准 EIP-6963 通常还包含 uuid, icon, rdns 等，可根据需求扩展
}

/**
 * 钱包提供者接口
 * 遵循 EIP-1193 标准，提供与区块链交互的核心方法
 */
export interface WalletProvider {
  /**
   * 发送 RPC 请求的核心方法
   * @param args 请求参数，包含 method (如 eth_requestAccounts) 和 params
   */
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;

  /**
   * 事件监听：例如监听账户切换 (accountsChanged) 或 链切换 (chainChanged)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (event: string, handler: (...args: any[]) => void) => void;
  
  /**
   * 移除事件监听
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off: (event: string, handler: (...args: any[]) => void) => void;
}

/**
 * 全局存储：用于缓存所有在当前浏览器环境下发现的钱包提供者
 * Key: 钱包名称, Value: 钱包提供者详情
 */
export const walletProviders: Map<WalletType, ProviderType> = new Map<WalletType, ProviderType>();

/**
 * 内部函数：当监听到钱包广播自己的信息时触发
 * @param event 包含 ProviderType 详情的自定义事件
 */
function onProviderAnnounce(event: CustomEvent<ProviderType>) {
  const provider: ProviderType = event.detail;
  // 将发现的钱包存入 Map
  walletProviders.set(provider.info.name, provider);
  console.log("发现钱包提供者:", provider.info.name, "当前总数:", walletProviders.size);
}

/**
 * 获取当前正在使用的钱包提供者
 * 逻辑：从 localStorage 获取上次连接的钱包名称，并从缓存 Map 中提取
 * @returns 返回 WalletProvider 实例或 undefined
 */
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

/**
 * 初始化钱包发现监听器
 * 1. 注册监听 eip6963:announceProvider 事件
 * 2. 派发 eip6963:requestProvider 事件，请求各钱包插件“自我介绍”
 */
export function addProvidersListeners() {
  window.addEventListener("eip6963:announceProvider", onProviderAnnounce as EventListener);
  // 向 window 发送请求，告知所有钱包插件：请广播你们的 Provider
  window.dispatchEvent(new Event("eip6963:requestProvider"));
}

/**
 * 移除监听器并清理缓存
 * 通常在组件卸载时调用，防止内存泄漏
 */
export function removeProvidersListeners() {
  window.removeEventListener("eip6963:announceProvider", onProviderAnnounce as EventListener);
  walletProviders.clear(); // 清空已存储的提供者缓存
}

/**
 * 获取当前已连接钱包的 Chain ID (十六进制字符串)
 * @returns 返回如 "0x1" (主网) 或 "0xaa36a7" (Sepolia)
 */
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

/**
 * 请求钱包切换网络
 * @param chainId 目标网络的数字 ID (如 1 或 11155111)
 * @returns 切换后的 chainId (数字格式)
 */
export const switchToChain = async (chainId: number): Promise<number> => {
  try {
    const provider = getCurrentProvider();
    if (provider) {
      // 切换请求需要将数字转换为十六进制字符串 (如 11155111 -> "0xaa36a7")
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + chainId.toString(16) }] 
      });
      console.log(`✅ 已成功切换到网络: ${chainId}`);
			return chainId;
    }
    else {
      console.log("❌ 未检测到提供程序。请确保已安装并启用钱包扩展程序。");
			const oldId: string = await getCurrentChainId();
			return Number(oldId);
    }
  } catch (error) {
    // 如果用户拒绝切换或网络未添加，会进入此处
    console.log(`❌ 切换到网络 ${chainId} 失败:`, error);
		const oldId: string = await getCurrentChainId();
		return Number(oldId);
  }
}