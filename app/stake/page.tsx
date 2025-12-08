'use client';
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { HeadView } from "../components/HeadView";
import { useAccount, useBalance, useChainId, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { stakeAddress } from "@/constants/address";
import { stakeAbi } from "@/constants/abi/stakeABI";
import { formatUnits, parseEther } from "viem";
import { useContext, useEffect, useState } from "react";
import ConfirmDialog from "../components/common/ConfirmDialog";
import PendingRewardView from "./components/PendingRewardView";
import { BalanceContext } from "../components/common/wallet/context/BalanceContext";
import { bigintToString } from "@/tool/StringUtils";
import { ChainContext } from "../components/common/wallet/context/ChainContext";

export default function StakePage() {
    const { address: myAddress } = useAccount();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [amount, setStakeAmount] = useState<string>('');
    const [stakeStatus, setStakeStatus] = useState<string>("");
    const {writeContractAsync } = useWriteContract();
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
    const [btnEnabled, setBtnEnabled] = useState<boolean>(true);
		const {balance, refetchBalance} = useContext(BalanceContext);

		const {chainId} = useContext(ChainContext);
    
    const { 
        isSuccess: isReceiptSuccess, 
        isError: isReceiptError, 
        error: receiptError 
    } = useWaitForTransactionReceipt({ hash: txHash, query: { enabled: !!txHash } });

    
    let balanceStr: string = '0.0000';
		if (balance) {
			balanceStr = bigintToString(balance, 4);
		}
		

    const {data: stakedAmount, refetch: refetchStakedAmount} = useReadContract({
        address: stakeAddress,
        abi: stakeAbi,
        functionName: 'stakingBalance',
        args: [BigInt(0), myAddress!],
        query: { enabled: !!myAddress },
				chainId
    });

    const onChangeAmount = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setStakeAmount(String(event.target.value));
    }

    const onClickStake = ()=> {
        if (!myAddress) {
            alert("请先连接钱包");
            return;
        }

        if (Number(amount) <= 0) {
            alert("请输入正确的质押数量");
            return;
        }

        try {
            if (balance && parseEther(amount) > balance) {
                alert("余额不足");
                return;
            }
        }
        catch {
            alert("请输入正确的质押数量");
            return;
        }

        setDialogOpen(true);
    }

    const onClickConfirmStake = async ()=> {
        setDialogOpen(false);
        setBtnEnabled(false);

        try {
            
            setStakeStatus("质押中...");
            const tx: `0x${string}` =  await writeContractAsync({
                address: stakeAddress,
                abi: stakeAbi,
                functionName: 'depositETH',
                value: parseEther(amount),
								chainId
            });
            setTxHash(tx);
        
        } catch (e) {
            setBtnEnabled(true);
            setStakeStatus("质押失败: " + (e as Error).message);
            alert("质押失败: " + (e as Error).message);
        }
    }

    const onClickCancelStake = ()=> {
        setDialogOpen(false);
    }

    useEffect(()=>{
        if (isReceiptSuccess) {
            refetchBalance();
            refetchStakedAmount();
            setStakeStatus("质押成功");
            setStakeAmount('');
            alert("质押成功");
            setBtnEnabled(true);
            setTxHash(undefined);
        }
        else if (isReceiptError) {
            console.log("交易失败，原因：" + receiptError?.message);
            setStakeStatus("质押失败: " + receiptError?.message);
            alert("质押失败: " + receiptError?.message);
            setBtnEnabled(true);
            setTxHash(undefined);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReceiptSuccess, isReceiptError, receiptError]);

    let stakeAmountStr: string = '0.0000';
    if (stakedAmount) {
        stakeAmountStr = parseFloat(formatUnits(stakedAmount as bigint, 18)).toFixed(4)
    }

    return (
        <div>
            <HeadView/>
            <Divider sx={{my: 3}}/>
            <Typography variant="h2" align="center">MetaNode Stake</Typography>
            <Typography variant="h5" align="center">Stake ETH to earn tokens</Typography>
            <Box height={60} />
            <Typography variant="h5" align="center">Staked Amount</Typography>
            <Typography variant="h2" align="center">{stakeAmountStr} ETH</Typography>
            <Box display="flex" justifyContent="center" mt={4}>
                <TextField disabled={!btnEnabled} placeholder="0.00" slotProps={{htmlInput: {step: "0.01",min: "0"}}} value={amount} onChange={onChangeAmount} type="number" label="Amount to Stake (ETH)" variant="outlined" sx={{mt: 4, minWidth:500}} />
                <Typography variant="h5" align="center" sx={{mt: 5, ml:2}}>ETH</Typography>
            </Box>
            <Typography variant="h5" align="center" sx={{mt: 5, ml:2}}>available: {balanceStr} ETH</Typography>
            <Button onClick={onClickStake} variant="contained" color="primary" disabled={!btnEnabled} sx={{mt: 4, display: 'block', mx: 'auto',width:300, height:60, fontSize:24}}>
                Stake Now
            </Button>
            <Typography variant="h5" align="center" sx={{mt: 5, ml:2}}>{stakeStatus}</Typography>
            <PendingRewardView stakeAddress={stakeAddress} stakeAbi={stakeAbi} myAddress={myAddress} />
            
            <ConfirmDialog isOpen={dialogOpen} title="提示" content="你确定要执行此操作吗？" onConfirm={onClickConfirmStake} onCancel={onClickCancelStake} />
        </div>
    );
}