import { Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface CopyAddressButtonProps {
    address: string;
}

export const CopyAddressButton = ({ address }: CopyAddressButtonProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(address);
    }

    return (
        <Button variant="outlined" onClick={handleCopy} sx={{
            width: 160,
            height: 56,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }} >
            <ContentCopyIcon sx={{fontSize: 20}}/>
            复制地址
        </Button>
    );
}