import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton } from "@mui/material";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AddressContext } from "../context/AddressContext";
import { BalanceContext } from "../context/BalanceContext";
import { getCurrentProvider, WalletType } from "../GetProvide";
import { ChainContext } from "../context/ChainContext";
import { connectWallet } from "../WalletConnect";

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: ()=>void;
}

export const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps)=> {

  const { setAddress } = useContext(AddressContext);
  const { setBalance } = useContext(BalanceContext);
	const { setChainId } = useContext(ChainContext);

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

  const onClickCommon = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    const targetId: string = (event.currentTarget as HTMLDivElement).id;
    if (targetId === WalletType.METAMASK) {
      await connectWallet(WalletType.METAMASK, setAddress, setChainId);
    }
    else if (targetId === WalletType.OKX) {
      await connectWallet(WalletType.OKX, setAddress, setChainId);
    }
    else if (targetId === WalletType.COINBASE) {
      await connectWallet(WalletType.COINBASE, setAddress, setChainId);
    }
    else if (targetId === WalletType.PHANTOM) {
      await connectWallet(WalletType.PHANTOM, setAddress, setChainId);
    }
    else {
      console.log("未识别的钱包类型");
      onCloseDialog();
      return;
    }

    const targetProvider = getCurrentProvider();
    if (targetProvider) {
      targetProvider.on('accountsChanged', onAccountChange);
    }
    onCloseDialog();
  }

  // const onClickPhantom = async ()=> {
  //   // Logic to connect to Phantom Wallet goes here
  //   console.log("Connecting to Phantom Wallet...");
  //   await connectPhantomWallet(setAddress);
  //   onCloseDialog();
  // }

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
    <Dialog open={isOpen} onClose={onCloseDialog} slotProps ={{
      paper: {
        sx: { 
          width: '500px',
          height: '440px',
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
            <ListItemButton id={WalletType.METAMASK} onClick={onClickCommon}>
              <Image src="MetaMask_Fox.svg" alt="" style={{ marginRight: 8 }} width="32" height="32"/>
              MetaMask
            </ListItemButton>
          </ListItem>
          <ListItem sx={{width: "auto"}}>
            <ListItemButton id={WalletType.OKX} onClick={onClickCommon}>
              <Image src ="OKX_Logo.svg" alt="" style={{ marginRight: 8 }} width="32" height="32"/>
              OKX Wallet
            </ListItemButton>
          </ListItem>

          <ListItem sx={{width: "auto"}}>
            <ListItemButton id={WalletType.COINBASE} onClick={onClickCommon}>
              <Image src ="COIN-6f1ac628.svg" alt="" style={{ marginRight: 8 }} width="32" height="32"/>
              Coinbase Wallet
            </ListItemButton>
          </ListItem>

          <ListItem sx={{width: "auto"}}>
            <ListItemButton id={WalletType.PHANTOM} onClick={onClickCommon}>
              <Image src ="Phantom_SVG_Icon.svg" alt="" style={{ marginRight: 8 }} width="32" height="32"/>
              Phantom
            </ListItemButton>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}