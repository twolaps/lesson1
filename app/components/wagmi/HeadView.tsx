import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@/app/styles/header.module.css";
import { LinkView } from "../LinkView";

export const HeadView = ()=>{
    return (
        <div className={styles.connet_button}>
            <LinkView/>
            <ConnectButton />
        </div>
    );
}