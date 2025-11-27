import { Button, TextField } from "@mui/material"
import styles from '../styles/view.module.css'
import { useEffect, useState } from "react";
import { useAccount, useChainId, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { erc20Abi, isAddress, parseEther } from "viem";
import { contractAddress } from "../const/ContractConst";

export const ContractTransactView = () => {

    const {address: userAddress} = useAccount();
    const chainId: number = useChainId();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const { data: balanceData} = useReadContract({
            address: contractAddress,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [userAddress!],
            chainId
        });

    const { writeContract, data: txHash} = useWriteContract();
    const { 
        isSuccess: isReceiptSuccess, 
        isError: isReceiptError, 
        error: receiptError 
    } = useWaitForTransactionReceipt({ hash: txHash });

    useEffect(()=>{
        if (isReceiptSuccess) {
            alert("转账成功！");
        }
        else if (isReceiptError) {
            alert("转账失败，原因：" + receiptError?.message);
        }
    }, [isReceiptSuccess, isReceiptError, receiptError]);

    const onChangeAccount = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setRecipient(event.target.value);
        console.log(event.target.value);
    }

    const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setAmount(event.target.value);
        console.log(event.target.value);
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

        if (!balanceData) {
            alert('无法获取余额');
            return;
        }

        const amountWei: bigint = parseEther(amount);
        if (amountWei > balanceData) {
            alert('余额不足');
            return;
        }

        console.log('发起合约转账:', {to: recipient, value: amountWei.toString()});

        writeContract({
            address: contractAddress,
            abi: erc20Abi,
            functionName: "transfer",
            args: [recipient, amountWei]
        });
    }

    return (
        <div>
            <h1 className={styles.title}>合约交易</h1>
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