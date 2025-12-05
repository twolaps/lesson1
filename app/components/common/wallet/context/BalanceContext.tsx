import { Context, createContext, ReactNode, useState } from "react";

type BalanceContextType = {
    balance: bigint;
    setBalance: (balance: bigint) => void;
}

const balanceType: BalanceContextType = {
    balance: BigInt(0),
    setBalance: ()=> {}
};

export const BalanceContext: Context<BalanceContextType> = createContext<BalanceContextType>(balanceType);

export const BalanceProvider = ({ children }: { children: ReactNode })=> {
    const [balance, setBalance] = useState<bigint>(BigInt(0));

    return (
        <BalanceContext.Provider value={{ balance, setBalance }}>
            {children}
        </BalanceContext.Provider>
    )
}
