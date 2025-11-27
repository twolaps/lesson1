
import { Button, TextField} from "@mui/material";
import styles from '@/app/styles/view.module.css';
import { useState } from "react";
import { useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { isAddress, parseEther } from "viem";

export const TransactView = ()=>{
    // 状态管理：接收方地址和转账金额
    const {address} = useAccount();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const {data: txHash, sendTransaction} = useSendTransaction();
    const { 
        isSuccess: isReceiptSuccess, 
        isError: isReceiptError, 
        error: receiptError 
    } = useWaitForTransactionReceipt({ hash: txHash });

    const {data: balanceData} = useBalance({address});

    if (isReceiptSuccess) {
        alert("转账成功！");
    }

    const onClickTransact = ()=>{
        console.log(recipient, amount);
        if (!isAddress(recipient)) {
            alert('请输入有效的以太坊地址');
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert('请输入有效的转账金额');
            return;
        }

        if (!balanceData?.value) {
            alert('无法获取余额');
            return;
        }

        const amountWei: bigint = parseEther(amount);
        if (amountWei > balanceData.value) {
            alert('余额不足');
            return;
        }

        console.log('发起转账:', {to: recipient, value: amountWei.toString()});

        sendTransaction({
            to: recipient,
            value: amountWei,
        });
    }

    const onChangeAccount = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setRecipient(event.target.value);
        console.log(event.target.value);
    }

    const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setAmount(event.target.value);
        console.log(event.target.value);
    }

    return (
        <div>
            <h1 className={styles.title}>发起以太坊转账交易</h1>
            <div className={styles.view}>
                <TextField onChange={onChangeAccount} sx={{minWidth: '25.5rem'}} style={{margin: '0rem 1rem'}} id="outlined-basic" label="转账目标账号" variant="outlined" />
                <TextField type="number" onChange={onChangeAmount} sx={{minWidth: '5rem'}} style={{margin: '0rem 1rem'}} id="outlined-basic" label="转账金额" variant="outlined" />
                <Button style={{margin: '0rem 1rem'}} variant="contained" onClick={onClickTransact}>
                    开始转账
                </Button>
                <h1>{isReceiptSuccess ? '转账成功' : isReceiptError ? `转账失败: ${receiptError?.message}` : ''}</h1>
            </div>
        </div>
        
    )
}