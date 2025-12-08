import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { switchToChain } from "../GetProvide";
import { useContext } from "react";
import { ChainContext } from "../context/ChainContext";
import { BalanceContext } from "../context/BalanceContext";
interface SelectChainItemButtonProps {
  txt: string;
  chainId: number;
  curChainId?: number;
  onClose: ()=>void;
}

export const SelectChainItemButton = ({ txt, chainId, curChainId, onClose }: SelectChainItemButtonProps) => {
	const {setChainId} = useContext(ChainContext);
	
  const onClickButton = async () => {
    console.log("点击了切换网络按钮，目标链ID:", chainId);

    if (chainId === curChainId) {
      console.log("已在目标链，无需切换");
      return;
    }

    if (onClose) {
      onClose();
    }

    const newChainId:number = await switchToChain(chainId);
		setChainId(newChainId);
  }

  return (
    <Button onClick={onClickButton} sx={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: chainId === curChainId && chainId > 0 ? "#0E76FD" : "#f5f5f5",
      color: chainId === curChainId && chainId > 0 ? "white" : "black",
    }}>
      <Box sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}>
          <Image src="ethereum_icon.svg" alt="" width="20" height="20" style={{ marginRight: 8 }}/>
          <Typography>{txt}</Typography>
        </Box>

        <Box sx={{
          display: chainId === curChainId && chainId > 0 ? "flex" : "none",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
          已连接🟢
        </Box>
      </Box>
    </Button>
  );
}