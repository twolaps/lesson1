import React, { useState } from 'react';
import styles from '@/styles/view.module.css';
import { Button, TextField } from '@mui/material';
import { BrowserProvider } from 'ethers';
import { Contract } from 'ethers';
import { TransactionResponse } from 'ethers';
import { Signer } from 'ethers';
import { ETHERS_MINT_EVENT, eventBus } from '@/tool/EventBus';
import { erc20Abi2 } from '@/constants/abi/erc20ABI';
import { contractAddress } from '@/constants/address';
import { getCurrentProvider } from '@/app/components/common/wallet/GetProvide';

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

        if (amount <= 0) {
            alert("请输入有效的铸币数量");
            return;
        }


				const eip1193Provider = getCurrentProvider();
				if (!eip1193Provider) {
					alert('未检测到 提供程序。请确保已安装并启用 扩展程序。');
					return;
				}
        const provider: BrowserProvider = new BrowserProvider(eip1193Provider);
        const signer: Signer = await provider.getSigner();
        const contract:Contract = new Contract(contractAddress, erc20Abi2, signer);
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