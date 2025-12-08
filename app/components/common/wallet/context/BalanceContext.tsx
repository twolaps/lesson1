import { Context, createContext, ReactNode, useContext, useState } from "react";
import { getCurrentProvider } from "../GetProvide";
import { AddressContext } from "./AddressContext";

type BalanceContextType = {
    balance: bigint;
    setBalance: (balance: bigint) => void;
		refetchBalance: () => Promise<void>;
}

const balanceType: BalanceContextType = {
    balance: BigInt(0),
    setBalance: ()=> {},
		refetchBalance: async () => {},
};

export const BalanceContext: Context<BalanceContextType> = createContext<BalanceContextType>(balanceType);

export const BalanceProvider = ({ children }: { children: ReactNode })=> {
    const [balance, setBalance] = useState<bigint>(BigInt(0));
		const {address: userAddress} = useContext(AddressContext);	

		const refetchBalance = async () => {
			try {
				console.log("检查账户余额...");
				console.log("当前账户地址:", userAddress);
				const targetProvider = getCurrentProvider();
				const balanceStr: string = await targetProvider?.request({
					method: "eth_getBalance",
					params: [userAddress!, "latest"]
				}) as string;
				console.log("账户余额:", Number(balanceStr).toString(10));
				setBalance(BigInt(balanceStr));
			} catch (error) {
				console.log("账户余额失败:", error);
			}
		}

    return (
        <BalanceContext.Provider value={{ balance, setBalance, refetchBalance }}>
            {children}
        </BalanceContext.Provider>
    )
}
