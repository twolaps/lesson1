import { KeyboardArrowDown } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import Image from "next/image"
import { SelectChainModal } from "./SelectChainModal"
import { useState } from "react"

export const SwitchChainButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickButton = () => {
        setIsOpen(!isOpen);
    }



    return (
        <Button onClick={onClickButton} sx={{
                width:"130px", 
                height:"45px", 
                borderRadius: "12px",
                backgroundColor: "white",
                color:"black",
                fontSize: "14px",
                fontWeight:"700",
                gap: 0.5,
        }}>
            <Image src ="ethereum_icon.svg" alt="" width="26" height="26"/>

            <Typography sx={{
                
                textTransform: "none",
                fontWeight:"700",
                fontSize: "16px",
            }}>
                Sepolia
            </Typography>
            <KeyboardArrowDown/>


            <SelectChainModal isOpen={isOpen} onClose={onClickButton}/>
        </Button>
    )
}