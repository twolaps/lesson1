import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem } from "@mui/material"
import { SelectChainItemButton } from "./SelectChainItemButton";
import { useEffect, useState } from "react";
import { getCurrentChainId } from "./GetProvide";
interface SelectChainModalProps {
    isOpen: boolean;
    onClose: ()=>void;
}
export const SelectChainModal = ({ isOpen, onClose }: SelectChainModalProps) => {

    const [curChainId, setCurChainId] = useState<number>(0);

    const onCloseDialog = ()=> {
        if (onClose) {
            onClose();
        }
    }

    useEffect(() => {
        const fetchChainId = async () => {
            const chainId = await getCurrentChainId();
            console.log("当前链ID:", chainId);
            if (Number(chainId) > 0) {
                setCurChainId(Number(chainId));
            }
        };

        fetchChainId();
    }, []);

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
                        <SelectChainItemButton txt="Ethereum" chainId={1} curChainId={curChainId}/>
                    </ListItem>
                    <ListItem disableGutters sx={{ py: 0, my: '0.25rem', minHeight: 0 }}>
                        <SelectChainItemButton txt="Sepolia" chainId={11155111} curChainId={curChainId}/>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    )
}