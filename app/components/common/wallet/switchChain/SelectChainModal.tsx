import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem } from "@mui/material"
import { SelectChainItemButton } from "./SelectChainItemButton";
import { useEffect, useState } from "react";
import { getCurrentChainId } from "../GetProvide";
interface SelectChainModalProps {
  isOpen: boolean;
  onClose: ()=>void;
	curChainId: number;
}
export const SelectChainModal = ({ isOpen, onClose, curChainId }: SelectChainModalProps) => {

  const onCloseDialog = ()=> {
    if (onClose) {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} slotProps ={{
      paper: {
        sx: { 
          width: '363px',
          height: '180px',
          padding: '0rem',
          borderRadius: '8px',
          backgroundColor: (theme) => theme.palette.background.paper,
        }
      }
    }}>
      <IconButton
        aria-label="close"
        onClick={onCloseDialog}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
          padding: '0px 9px', // 减小内边距
          borderRadius: '50%', // 强制圆形
        }}
      >
        X
      </IconButton>

      <DialogTitle>
        切换网络
      </DialogTitle>

      <DialogContent sx={{
        overflowY: "hidden",
      }}>
        <List>
          <ListItem disableGutters sx={{ py: 0, my: '0.25rem', minHeight: 0 }}>
            <SelectChainItemButton txt="Ethereum" chainId={1} curChainId={curChainId} onClose={onCloseDialog}/>
          </ListItem>
          <ListItem disableGutters sx={{ py: 0, my: '0.25rem', minHeight: 0 }}>
            <SelectChainItemButton txt="Sepolia" chainId={11155111} curChainId={curChainId} onClose={onCloseDialog}/>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  )
}