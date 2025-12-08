import { stakeAbi } from "@/constants/abi/stakeABI";
import { stakeAddress } from "@/constants/address";
import { Context, createContext, useContext, useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useChainId, useReadContract } from "wagmi";
import { AddressContext } from "./AddressContext";
import { ChainContext } from "./ChainContext";

type MetaNodeContextType = {
		metaNodeBalance: bigint;
		setMetaNodeBalance: (balance: bigint) => void;
		refetchMetaNodeBalance: () => Promise<void>;
}

const metaNodeBalanceType: MetaNodeContextType = {
		metaNodeBalance: BigInt(0),
		setMetaNodeBalance: () => {},
		refetchMetaNodeBalance: async () => {}
};

export const MetaNodeContext: Context<MetaNodeContextType> = createContext<MetaNodeContextType>(metaNodeBalanceType);

export const MetaNodeProvider = ({ children }: { children: React.ReactNode })=> {
		const [metaNodeBalance, setMetaNodeBalance] =  useState<bigint>(BigInt(0));
		const {address: myAddress} = useContext(AddressContext);

		const {chainId} = useContext(ChainContext);

		// 获取质押代币地址
		const { data: tokenAddress } = useReadContract({
			address: stakeAddress,
			abi: stakeAbi,
			functionName: 'MetaNode',
			chainId
		});

		const { data: balanceData, refetch: refetchBalance } = useReadContract({
			address: tokenAddress as `0x${string}`,
			abi: erc20Abi,
			functionName: 'balanceOf', 
			args: [myAddress!],
			query: { enabled: !!myAddress },
			chainId
		});

		useEffect(() => {
			if (!tokenAddress) {
				setMetaNodeBalance(BigInt(0));
			}
			else if (typeof balanceData === 'bigint') {
				setMetaNodeBalance(balanceData);
			}
		}, [balanceData, tokenAddress]);

		const refetchMetaNodeBalance = async () => {
			await refetchBalance();
		}

		return (
				<MetaNodeContext.Provider value={{ metaNodeBalance, setMetaNodeBalance, refetchMetaNodeBalance }}>
						{children}
				</MetaNodeContext.Provider>
		)
}