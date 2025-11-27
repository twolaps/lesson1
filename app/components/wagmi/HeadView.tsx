import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@/app/styles/header.module.css";
import { Link } from "@mui/material";

export const HeadView = ()=>{
    return (
        <div className={styles.connet_button}>
            <Link style={{margin: "0rem 1rem"}} href="/">
                <h1>WAGAMI HOME</h1>
            </Link>

            <Link style={{margin: "0rem 1rem"}} href="/ethers_home">
                <h1>ETHERS HOME</h1>
            </Link>
            <ConnectButton />
        </div>
    );
}