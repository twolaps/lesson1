import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { contractABI, contractAddress } from "../../const/ContractConst";
import styles from '../styles/view.module.css';

export function MintView()  {
    const { writeContract, data } = useWriteContract();

    const { 
            isLoading: isReceiptLoading,
            isSuccess: isReceiptSuccess, 
            isError: isReceiptError, 
            error: receiptError 
        } = useWaitForTransactionReceipt({ hash: data });

    const [amount, setAmount] = useState<number>(0);

    useEffect(()=>{
        if (isReceiptSuccess) {
            alert("铸币成功！");
        }
        else if (isReceiptError) {
            alert("铸币失败，原因：" + receiptError?.message);
        }
    }, [isReceiptSuccess, isReceiptError, receiptError]);

    const onChangeAccount = (event: React.ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.value);
        if (Number(event.target.value) > 0) {
            setAmount(Number(event.target.value));
        }
    }
    
    const onClickMint = ()=>{
        console.log('点击了 Mint 按钮');

        if (amount <= 0) {
            alert("请输入有效的铸币数量");
            return;
        }

        writeContract({
            address: contractAddress,
            abi: contractABI,
            functionName: 'mint',
            args: [BigInt(amount * 1e18)],
        });
    }

    let txt: string = '';

    if (isReceiptLoading) {
        txt = '交易处理中...';
    }
    else if (isReceiptSuccess) {
        txt = '交易成功！';
    }
    else if (isReceiptError) {
        txt = '交易失败，原因：' + receiptError?.message;
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

