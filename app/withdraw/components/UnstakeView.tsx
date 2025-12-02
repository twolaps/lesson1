import { Button, InputAdornment, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { parseEther } from "viem";

interface UnstakeViewProps {
    stakedAmount?: bigint | unknown;
}

export default function UnstakeView({stakedAmount}: UnstakeViewProps) {
    const [amount, setAmount] = useState<string>('0');

    const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    }

    const onClickUnstake = () => {
        console.log('点击了 Unstake 按钮');

        if (!stakedAmount || stakedAmount === BigInt(0)) {
            alert("您没有可解除质押的金额");
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert("请输入有效的解除质押金额");
            return;
        }

        const parsedAmount = parseEther(amount);
        const stakedAmountValue = stakedAmount ? stakedAmount as bigint : BigInt(0);

        if (parsedAmount > stakedAmountValue) {
            alert("解除质押金额不能超过已质押金额");
            return;
        }

        // 这里可以添加解除质押的逻辑

    }
    
    return (
        <div style={{ marginTop: 20 }}>
            <Typography variant="h5">Unstake</Typography>
            <TextField 
                type="number" 
                onChange={onChangeAmount} 
                sx={{minWidth: '36.2rem'}} 
                style={{margin: '1rem 1rem'}} 
                id="outlined-basic" 
                label="Amount to Unstake" 
                variant="outlined" 
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
                    }
                }} />
            <Button onClick={onClickUnstake} style={{margin: '1rem 1rem', height:'50px', width: '578px', fontSize: '20px'}} variant="contained" >
                Unstake ETH
            </Button>
        </div>
    );  
}