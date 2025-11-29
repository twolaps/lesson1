'use client';
import { Button } from "@mui/material";
import styles from "@/styles/header.module.css";
import { LinkView } from "@/app/components/LinkView";
interface EthersHeadViewProps {
    connectStatus: string;
    connectFunction: ()=>Promise<void>;
}

export const EthersHeadView = ({connectStatus, connectFunction}: EthersHeadViewProps)=> {

    const onClickConnect = async ()=>{
        await connectFunction();
    }

    return (
        <div className={styles.connet_button}>
            <LinkView/>
            <Button variant="contained" onClick={onClickConnect}>{connectStatus}</Button>
        </div>
    );
}