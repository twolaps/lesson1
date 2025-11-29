'use client';
import { useEffect, useState } from "react";
import { EthersHeadView } from "../components/ethers/EthersHeadView";
import { EthersInfoView } from "../components/ethers/EthersInfoView";
import { EthersTransactView } from "../components/ethers/EthersTransactView";
import { EthersContractInfoView } from "../components/ethers/EthersContractInfoView";
import { EthersMintView } from "../components/ethers/EthersMintView";
import { EthersContractTransactView } from "../components/ethers/EthersContractTransactView";

export default function EthersHome() {
    enum ConnectStatus {
        NotConnected = "连接钱包",
        Connected = "已连接"
    }
    const [connectStatus, setConnectStatus] = useState<ConnectStatus>(ConnectStatus.NotConnected);

    const [address, setAddress] = useState("");

    // 登录方法
    const connectWallet = async () => {
        if (connectStatus == ConnectStatus.Connected) {
            alert("钱包已连接，无需重复连接！");
            return;
        }

        if (typeof window === 'undefined' || !window.ethereum) {
            return;
        }

        if (window?.ethereum) {
            try {
                const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
                alert("钱包连接成功！");
                setConnectStatus(ConnectStatus.Connected);
                setAddress(accounts[0]);
            } catch (error: Error | unknown) {
                alert("钱包连接失败，原因：" + (error as Error).message);
            }
        }
    };

    useEffect(() => {
        const checkConnection = async () => {

            if (typeof window === 'undefined' || !window.ethereum) {
                return;
            }
            
            const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                setConnectStatus(ConnectStatus.Connected);
                setAddress(accounts[0]);
            }
        };
        checkConnection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <EthersHeadView connectStatus={connectStatus} connectFunction={connectWallet}/>
            <hr/>
            <EthersInfoView address={address}/>
            <hr/>
            <EthersTransactView address={address}/>
            <hr/>
            <EthersContractInfoView address={address}/>
            <hr/>
            <EthersMintView />
            <hr/>
            <EthersContractTransactView />
        </div>
    );
}