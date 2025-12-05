import { Context, createContext, ReactNode, useState } from "react";
import { Address } from "viem";

type AddressContextType = {
    address: Address;
    setAddress: (address: Address) => void;
}

const addressType: AddressContextType = {
    address: "0x00",
    setAddress: ()=> {}
};

export const AddressContext: Context<AddressContextType> = createContext<AddressContextType>(addressType);

export const AddressProvider = ({ children }: { children: ReactNode })=> {
    const [address, setAddress] = useState<Address>("0x00");

    return (
        <AddressContext.Provider value={{ address, setAddress }}>
            {children}
        </AddressContext.Provider>
    )
}
