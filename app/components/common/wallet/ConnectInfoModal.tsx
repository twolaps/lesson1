import { bigintToString, truncateString } from "@/tool/StringUtils";
import { Box, Dialog, IconButton, Typography } from "@mui/material"
import { CopyAddressButton } from "./CopyAddressButton";
import { DisconnectButton } from "./DisconnectButton";

interface ConnectWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    address: `0x${string}` | undefined;
    balance: bigint;
}

export const ConnectInfoModal = ({ isOpen, onClose, address, balance }: ConnectWalletModalProps) => {

    const onClickClose = () => {
        // Currently does nothing; modal remains open
        if (onClose) {
            onClose();
        }
    }
    return (
        <Dialog open={isOpen} onClose={onClose} slotProps ={{
            paper: {
                sx: { 
                    width: '363px',
                    height: '243px',
                    padding: '1rem',
                    borderRadius: '20px',
                    backgroundColor: (theme) => theme.palette.background.paper,
                }
            }
        }}>
            <IconButton
                aria-label="close"
                onClick={onClickClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                    padding: '2px 10px', // 减小内边距
                    borderRadius: '50%', // 强制圆形
                }}>
                X
            </IconButton>

            <Box sx={{
                gap: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}>
                <Typography variant="h5">
                    {truncateString(address, 4, 4)}
                </Typography>
                <Typography>
                   {bigintToString(balance, 4)} ETH
                </Typography>

                <Box sx={{
                    display: "flex",
                    gap: 2}}>
                    <CopyAddressButton address={address!} />
                    <DisconnectButton onClose={onClickClose} address={address} />
                </Box>
            </Box>
        </Dialog>);
}

    