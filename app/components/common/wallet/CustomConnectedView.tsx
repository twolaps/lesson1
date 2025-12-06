import { bigintToString, truncateString } from "@/tool/StringUtils";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { ConnectInfoModal } from "./ConnectInfoModal";

interface CustomConnectedViewProps {
    balanceETH: bigint;
    address: `0x${string}`;
}

export const CustomConnectedView = ({ balanceETH, address: userAddress }: CustomConnectedViewProps)=>{

    const [open, setOpen] = useState(false);

    const onClickConnected = () => {
        setOpen(!open);
    };

    return (
        <div>
           <Button
                onClick={onClickConnected}
                sx={{
                    margin: "2rem 2rem", 
                    width:"245px", 
                    height:"45px", 
                    borderRadius: "12px",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "space-between"}} 
                >
                <Typography sx={{
                    color: "black", 
                    fontSize: "14px",
                    fontWeight:"700"
                }}>
                    {bigintToString(balanceETH, 4)} ETH
                </Typography>


                <Box sx={{
                    width: "150px",
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 10px",
                    borderRadius: "12px",
                    backgroundColor: "#e5e5e5",
                    color: "black",
                    fontSize: "14px",
                    fontWeight:"700"}}>

                    <Typography sx={{
                        fontWeight:"700"
                    }}>
                        {truncateString(userAddress, 5, 5)}
                    </Typography>
                    
                    <KeyboardArrowDown/>
                </Box>
            </Button>


            <ConnectInfoModal isOpen={open} onClose={onClickConnected} address={userAddress} balance={balanceETH}/>
        </div>
    );
}