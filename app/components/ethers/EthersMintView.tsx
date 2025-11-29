import React, { useState } from 'react';
import styles from '@/app/styles/view.module.css';
import { Button, TextField } from '@mui/material';
import { BrowserProvider } from 'ethers';
import { Contract } from 'ethers';
import { contractABI, contractAddress } from '@/app/const/ContractConst';
import { TransactionResponse } from 'ethers';
import { Signer } from 'ethers';
import { ETHERS_MINT_EVENT, eventBus } from '@/app/tool/EventBus';

export const EthersMintView = ()  => {
    const [amount, setAmount] = useState<number>(0);
    const [mintStatus, setMintStatus] = useState<string>('');

    const onChangeAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        if (Number(event.target.value) > 0) {
            setAmount(Number(event.target.value));
        }
    }

    const onClickMint = async () => {
        console.log('点击了 Mint 按钮');

        if (typeof window === 'undefined' || !window.ethereum) {
            return;
        }

        if (amount <= 0) {
            alert("请输入有效的铸币数量");
            return;
        }


        const provider: BrowserProvider = new BrowserProvider(window.ethereum);
        const signer: Signer = await provider.getSigner();
        const contract:Contract = new Contract(contractAddress, contractABI, signer);
        try {
            const tx: TransactionResponse = await contract.mint(BigInt(amount * 1e18));
            setMintStatus('铸币已发送，等待确认...');
            await tx.wait();
            setMintStatus('铸币确认完成，铸币成功！');
            alert("铸币成功！");
            eventBus.emit(ETHERS_MINT_EVENT);
        } catch (error) {
            setMintStatus('铸币失败，请重试！');
            console.error('铸币失败:', error);
            alert("铸币失败，请重试！");
        }
    }


    return (
        <div className={styles.view}>
            <TextField type='number' onChange={onChangeAccount} sx={{minWidth: '25.5rem'}} style={{margin: '0rem 1rem'}} id="outlined-basic" label="铸币数量" variant="outlined" />
            <Button style={{margin: '0rem 1rem'}} variant="contained" onClick={onClickMint}>
                开始铸币
            </Button>
            <h1>{mintStatus}</h1>
        </div>
    );
}