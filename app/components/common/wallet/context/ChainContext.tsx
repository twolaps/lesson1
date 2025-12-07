import { Context, createContext, ReactNode, useEffect, useState } from "react";
import { Address } from "viem";
import { getCurrentChainId } from "../GetProvide";

type ChainContextType = {
    chainId: number;
    setChainId: (chainId: number) => void;
}

const chainType: ChainContextType = {
    chainId: 0,
    setChainId: (chainId: number) => {}
};

export const ChainContext: Context<ChainContextType> = createContext<ChainContextType>(chainType);

export const ChainProvider = ({ children }: { children: ReactNode })=> {
    const [chainId, setChainId] = useState<number>(0);

		useEffect(() => {
			const fetchChainId = async () => {
				const id = await getCurrentChainId();
				console.log("当前链ID:", id);
				if (Number(id) > 0) {
					setChainId(Number(id));
				}
			};

			fetchChainId();
		}, []);

    return (
        <ChainContext.Provider value={{ chainId, setChainId }}>
            {children}
        </ChainContext.Provider>
    )
}
