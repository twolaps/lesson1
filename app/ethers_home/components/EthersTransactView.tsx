import styles from '@/styles/view.module.css';
import { ETHERS_TRANSACT_EVENT, eventBus } from '@/tool/EventBus';
import { Button, TextField } from '@mui/material';
import { TransactionResponse } from 'ethers';
import { JsonRpcSigner } from 'ethers';
import { parseEther } from 'ethers';
import { BrowserProvider } from 'ethers';
import { ethers, isAddress } from 'ethers';
import { useState } from 'react';

interface EthersTransactViewProps {
    address: string;
}

export const EthersTransactView = ({ address }: EthersTransactViewProps)=> {
    const provider: BrowserProvider = new BrowserProvider(window?.ethereum);
    
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [transactStatus, setTransactStatus] = useState('');

    const onChangeRecipient = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setRecipient(event.target.value);
        console.log(event.target.value);
    }

    const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setAmount(event.target.value);
        console.log(event.target.value);
    }

    const onClickTransact = async ()=>{
        console.log(recipient, amount);
        const balance: bigint = await provider.getBalance(address);
        if (!isAddress(recipient)) {
            alert('请输入有效的以太坊地址');
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert('请输入有效的转账金额');
            return;
        }

        if (!balance) {
            alert('无法获取余额');
            return;
        }

        const amountWei: bigint = parseEther(amount);
        if (amountWei > balance) {
            alert('余额不足');
            return;
        }

        console.log('发起转账:', {to: recipient, value: amountWei.toString()});

        const signer: JsonRpcSigner = await provider.getSigner();
        const tx: TransactionResponse =  await signer.sendTransaction({
            to: recipient,
            value: amountWei,
        });

        setTransactStatus("等待交易确认...");
        const receipt: ethers.TransactionReceipt | null = await tx.wait();
        if (receipt && receipt.status == 1) {
            setTransactStatus("交易确认成功！");
            eventBus.emit(ETHERS_TRANSACT_EVENT);
            alert("转账成功！");
        } else {
            setTransactStatus("交易确认失败！");
            alert("转账失败！");
        }
    }

    return (
        <div>
            <h1 className={styles.title}>发起以太坊转账交易</h1>
            <div className={styles.view}>
                <TextField onChange={onChangeRecipient} sx={{minWidth: '25.5rem'}} style={{margin: '0rem 1rem'}} id="outlined-basic" label="转账目标账号" variant="outlined" />
                <TextField type="number" onChange={onChangeAmount} sx={{minWidth: '5rem'}} style={{margin: '0rem 1rem'}} id="outlined-basic" label="转账金额" variant="outlined" />
                <Button style={{margin: '0rem 1rem'}} variant="contained" onClick={onClickTransact}>
                    开始转账
                </Button>
                <h1>{transactStatus}</h1>
            </div>
        </div>
    );
}