"use client";

import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { http, WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // 注意导入来源

// 1. 创建 Wagmi 客户端配置
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'c9d5a536ee966c073daf48e1b0444207', // 请务必替换为你在 WalletConnect Cloud 申请的真实 Project ID [5](@ref)
  chains: [mainnet, sepolia],
  ssr: true, // 如果你的应用使用了服务端渲染
  transports: {
    [mainnet.id]: http('https://eth.rpc.blxrbdn.com'),
    [sepolia.id]: http('https://sepolia.drpc.org'),
  },
});

// 2. 初始化 React Query 的客户端
const queryClient = new QueryClient();

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
