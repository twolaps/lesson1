import { useState } from "react";
import styles from '@/app/styles/view.module.css'
import { Button, TextField } from "@mui/material";
import { BrowserProvider, isAddress, parseUnits } from "ethers";
import { JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import { contractABI, contractAddress } from "@/app/const/ContractConst";
import { TransactionResponse } from "ethers";
import { ETHERS_CONTRACT_TRANSACT_EVENT, eventBus } from "@/app/tool/EventBus";

export const EthersContractTransactView = ()=>{
    // 状态管理：接收方地址和转账金额
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [transactStatus, setTransactStatus] = useState('');

    const onClickTransact = async ()=>{
        console.log(recipient, amount);

        if (!recipient || !isAddress(recipient)) {
            alert('请输入有效的以太坊地址');
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert('请输入有效的转账金额');
            return;
        }

        const provider: BrowserProvider = new BrowserProvider(window?.ethereum);
        const signer:JsonRpcSigner = await provider.getSigner();
        const contract: Contract = new Contract(contractAddress, contractABI, signer);
        try {
            const tx: TransactionResponse = await contract.transfer(recipient, parseUnits(amount, 18));
            setTransactStatus('转账已发送，等待确认...');
            await tx.wait();
            setTransactStatus('转账确认完成，转账成功！');
            eventBus.emit(ETHERS_CONTRACT_TRANSACT_EVENT);
            alert("转账成功!");
        } catch (error) {
            setTransactStatus('转账失败，请重试！');
            console.error("转账失败:", error);
            alert("转账失败，请重试！");
        }
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
            <h1 className={styles.title}>合约交易</h1>
            <div className={styles.view}>
                <TextField onChange={onChangeAccount} sx={{minWidth: '25.5rem'}} style={{margin: '0rem 1rem'}} id="outlined-basic" label="转账目标账号" variant="outlined" />
                <TextField type="number" onChange={onChangeAmount} sx={{minWidth: '5rem'}} style={{margin: '0rem 1rem'}} id="outlined-basic" label="转账金额" variant="outlined" />
                <Button style={{margin: '0rem 1rem'}} variant="contained" onClick={onClickTransact}>
                    开始转账
                </Button>
                <h1>{transactStatus}</h1>
            </div>
        </div>
    );
}