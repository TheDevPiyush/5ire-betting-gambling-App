import { createContext, Dispatch, SetStateAction } from "react";

interface WalletContextType {
    walletAddress: string | undefined;
    setWalletAddress: Dispatch<SetStateAction<string | undefined>>;


    chainName: string | undefined;
    setWalletLoading: Dispatch<SetStateAction<boolean | undefined>>;
    walletLoading: boolean | undefined;
    setChainName: Dispatch<SetStateAction<string | undefined>>;
}
export const WalletContext = createContext<WalletContextType>({
    walletAddress: undefined,
    setWalletAddress: () => { },

    chainName: undefined,
    setChainName: () => { },

    walletLoading: undefined,
    setWalletLoading: () => { },
});