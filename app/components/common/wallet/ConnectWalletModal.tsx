import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton } from "@mui/material";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AddressContext } from "./context/AddressContext";
import { connectMetamask, connectOKXWallet } from "./WalletConnect";
import { BalanceContext } from "./context/BalanceContext";
import { getCurrentProvider } from "./GetProvide";

interface ConnectWalletModalProps {
    isOpen: boolean;
    onClose: ()=>void;
}

export const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps)=> {

    const { setAddress } = useContext(AddressContext);
    const { setBalance } = useContext(BalanceContext);

    const onCloseDialog = ()=> {
        // Currently does nothing; modal remains open
        if (onClose) {
            onClose();
        }
    }

    const onAccountChange = (accounts: `0x${string}`[]) => {
        if (accounts.length === 0) {
            console.log("账户已断开连接");
            setAddress("0x00");
            setBalance(BigInt(0));
            localStorage.removeItem("connectedWallet");
        }
    }

    const onClickMetaMask = async ()=> {
        // Logic to connect to MetaMask goes here
        console.log("Connecting to MetaMask...");
        await connectMetamask(setAddress);
        const targetProvider = getCurrentProvider();
        if (targetProvider) {
            targetProvider.on('accountsChanged', onAccountChange);
        }

        onCloseDialog();
    }

    const onClickOKX = async ()=> {
        // Logic to connect to OKX Wallet goes here
        console.log("Connecting to OKX Wallet...");
        await connectOKXWallet(setAddress);
        const targetProvider = getCurrentProvider();
        if (targetProvider) {
            targetProvider.on('accountsChanged', onAccountChange);
        }
        onCloseDialog();
    }

    useEffect(() => {
        return () => {
            const targetProvider = getCurrentProvider();
            if (targetProvider) {
                targetProvider.off('accountsChanged', onAccountChange);
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Dialog open={isOpen} slotProps ={{
            paper: {
                sx: { 
                    width: '500px',
                    height: '400px',
                    padding: '1rem',
                    backgroundColor: (theme) => theme.palette.background.paper,
                }
            }
        }}>
            <DialogTitle sx={{
                    textAlign: "center",
                }}>
                连接钱包
                <IconButton
                    aria-label="close"
                    onClick={onCloseDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                        padding: '2px 10px', // 减小内边距
                        borderRadius: '50%', // 强制圆形
                    }}
                >
                    X
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <List sx={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center'}}>
                    <ListItem sx={{width: "auto"}}>
                        <ListItemButton onClick={onClickMetaMask}>
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="" style={{ marginRight: 8 }} width="32" height="32"/>
                            MetaMask
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{width: "auto"}}>
                        <ListItemButton onClick={onClickOKX}>
                            <Image src ="https://upload.wikimedia.org/wikipedia/commons/e/e4/OKX_Logo.svg" alt="" style={{ marginRight: 8 }} width="32" height="32"/>
                            OKX Wallet
                        </ListItemButton>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
}