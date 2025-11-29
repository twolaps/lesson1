import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@/styles/header.module.css";
import { LinkView } from "./LinkView";

export const HeadView = ()=>{
    return (
        <div className={styles.connet_button}>
            <LinkView/>
            <ConnectButton />
        </div>
    );
}