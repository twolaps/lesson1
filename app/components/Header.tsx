import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@/app/styles/Header.module.css"

export const Header = ()=>{
    return (
        <div className={styles.connet_button}>
            <ConnectButton />
        </div>
    );
}