import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton } from "@mui/material";
import Image from "next/image";
import { ProviderType, WalletProvider, walletProviders, WalletType } from "./GetProvide";
import { useContext } from "react";
import { AddressContext } from "./context/AddressContext";

interface ConnectWalletModalProps {
    isOpen: boolean;
    onClose: ()=>void;
}

export const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps)=> {

    const { setAddress } = useContext(AddressContext);

    const onCloseDialog = ()=> {
        // Currently does nothing; modal remains open
        if (onClose) {
            onClose();
        }
    }

    const connectWallet = async (name: string) => {
        const metamaskEntry: ProviderType | undefined = walletProviders.find(
            (provider: ProviderType) => {
                return provider.info.name === name
            }
        );

        if (metamaskEntry) {
            const metamaskProvider: WalletProvider = metamaskEntry.provider;

            try {
            // 2. 发送连接请求（eth_requestAccounts）
                const accounts = await metamaskProvider.request({ 
                    method: "eth_requestAccounts" 
                });

                console.log(`✅ ${name} 已连接成功！`);
                console.log("连接的账户:", accounts);

                if (accounts instanceof Array && accounts.length > 0) {
                    setAddress(accounts[0]);
                }

            } catch (error) {
                console.error(`❌ 连接 ${name} 失败:`, error);
            }
        }
        else {
            console.error(`❌ 未找到 ${name} 提供者`);
        }
    }


    const onClickMetaMask = async ()=> {
        // Logic to connect to MetaMask goes here
        console.log("Connecting to MetaMask...");
        await connectWallet(WalletType.METAMASK);
        onCloseDialog();
    }

    const onClickOKX = async ()=> {
        // Logic to connect to OKX Wallet goes here
        console.log("Connecting to OKX Wallet...");
        await connectWallet(WalletType.OKX);
        onCloseDialog();
    }

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
            {/* Modal content for connecting wallet goes here */}
        </Dialog>
    );
}