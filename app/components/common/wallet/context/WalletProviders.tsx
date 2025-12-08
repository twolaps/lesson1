// WalletProviders 统一包裹所有钱包相关的 Context Provider，方便在应用中全局管理地址、余额和链ID。
// 使用时只需在根组件外层包裹 <WalletProviders>，即可让所有子组件访问钱包相关的上下文。

import { AddressProvider } from "./AddressContext"
import { BalanceProvider } from "./BalanceContext"
import { ChainProvider } from "./ChainContext"
import { MetaNodeProvider } from "./MetaNodeContext"

/**
 * WalletProviders 统一管理钱包相关的 Context Provider
 * - AddressProvider：管理钱包地址
 * - BalanceProvider：管理余额
 * - ChainProvider：管理链ID
 */

export const WalletProviders = ({children}: {children: React.ReactNode}) => {
		return (
			<AddressProvider>
				<ChainProvider>
					<BalanceProvider>
						<MetaNodeProvider>
							{children}
						</MetaNodeProvider>
					</BalanceProvider>
				</ChainProvider>
			</AddressProvider>	
		)
}