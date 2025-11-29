import React, { useState } from 'react';
import styles from '@/app/styles/view.module.css';
import { Button, TextField } from '@mui/material';
import { erc20Abi, stringToBytes } from 'viem';
import { BrowserProvider } from 'ethers';
import { Contract } from 'ethers';
import { contractABI, contractAddress } from '@/app/const/ContractConst';

export const MintView = ()  => {
    const [amount, setAmount] = useState<number>(0);

    const onChangeAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        if (Number(event.target.value) > 0) {
            setAmount(Number(event.target.value));
        }
    }

    const onClickMint = async () => {
        console.log('点击了 Mint 按钮');
        if (amount <= 0) {
            alert("请输入有效的铸币数量");
            return;
        }


        const provider: BrowserProvider = new BrowserProvider(window.ethereum);
        const contract:Contract = new Contract(contractAddress, contractABI, provider);
        try {
            const balance: bigint = await contract.mint(BigInt(amount * 1e18));
            console.log('铸币结果:', balance);
            alert("铸币成功！");
        } catch (error) {
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
            <h1>{txt}</h1>
        </div>
    );
}