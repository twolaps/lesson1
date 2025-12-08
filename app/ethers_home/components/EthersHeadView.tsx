'use client';
import { Button } from "@mui/material";
import styles from "@/styles/header.module.css";
import { LinkView } from "@/app/components/LinkView";
import { CustomConnectButton } from "@/app/components/common/wallet/CustomConnectButton";

export const EthersHeadView = ()=> {
    return (
        <div className={styles.connet_button}>
            <LinkView/>
            <CustomConnectButton />
        </div>
    );
}