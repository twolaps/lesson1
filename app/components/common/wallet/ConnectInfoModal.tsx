import { bigintToString, truncateString } from "@/tool/StringUtils";
import { Box, Dialog, IconButton, Typography } from "@mui/material"

interface ConnectWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    address: `0x${string}` | undefined;
}

export const ConnectInfoModal = ({ isOpen, onClose, address }: ConnectWalletModalProps) => {

    const onCloseClose = () => {
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
                onClick={onCloseClose}
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

            <Box>
                <Typography>
                    {truncateString(address, 4, 4)}
                </Typography>
            </Box>

        </Dialog>);
}

    