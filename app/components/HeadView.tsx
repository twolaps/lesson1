import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@/styles/header.module.css";
import { LinkView } from "./LinkView";
import { CustomConnectButton } from "./common/wallet/CustomConnectButton";

export const HeadView = ()=>{
    return (
        <div className={styles.connet_button}>
            <LinkView/>
            {/* <ConnectButton /> */}
						<CustomConnectButton />
        </div>
    );
}