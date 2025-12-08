'use client';
import { Box, Divider, Grid, Typography } from "@mui/material";
import { HeadView } from "../components/HeadView";
import StakeAmountView from "./components/StakeAmountView";
import AvailableWithdrawView from "./components/AvailableWithdrawView";
import PendingWithdraw from "./components/PendingWithdraw";
import { useAccount, useReadContract } from "wagmi";
import { stakeAddress } from "@/constants/address";
import { stakeAbi } from "@/constants/abi/stakeABI";
import { formatUnits } from "viem";
import UnstakeView from "./components/UnstakeView";
import { useEffect } from "react";
import { ETHERS_UNSTAKE_SUCCESS_EVENT, eventBus } from "@/tool/EventBus";
import WithdrawView from "./components/WithdrawView";

export default function WithdrawPage() {
    const { address: myAddress } = useAccount();

    const {data: stakedAmount, refetch: refetchStakedAmount} = useReadContract({
        address: stakeAddress,
        abi: stakeAbi,
        functionName: 'stakingBalance',
        args: [BigInt(0), myAddress!],
        query: { enabled: !!myAddress }
    });
    

    let stakedAmountStr: string = '0.0000';
    if (stakedAmount) {
        stakedAmountStr = parseFloat(formatUnits(stakedAmount as bigint, 18)).toFixed(4)
    }

    const { data: withdrawAmount, refetch: refetchWithdrawAmount } = useReadContract({
        address: stakeAddress,
        abi: stakeAbi,
        functionName: 'withdrawAmount',
        args: [0, myAddress!], // 0为池子ID
        query: { enabled: !!myAddress }
    });

    const withdrawAmountData: bigint[] = withdrawAmount as [bigint, bigint];
    const requestAmount: bigint = withdrawAmount ? BigInt(withdrawAmountData[0]) : BigInt(0);
    const pendingWithdrawAmount: bigint = withdrawAmount ? BigInt(withdrawAmountData[1]) : BigInt(0);
    const availableToWithdrawStr: string = parseFloat(formatUnits(pendingWithdrawAmount, 18)).toFixed(4);
    const pendingWithdrawStr: string = parseFloat(formatUnits(requestAmount - pendingWithdrawAmount, 18)).toFixed(4);

    useEffect(() => {
        const handleUnstakeSuccess = () => {
            console.log("收到解除质押成功事件，刷新数据");
            refetchStakedAmount();
            refetchWithdrawAmount();
        };
        eventBus.on(ETHERS_UNSTAKE_SUCCESS_EVENT, handleUnstakeSuccess);
        return () => {
            eventBus.off(ETHERS_UNSTAKE_SUCCESS_EVENT, handleUnstakeSuccess);
        }
    }, [refetchStakedAmount, refetchWithdrawAmount]);
    
    return (
        <div>
            <HeadView/>
            <Divider sx={{my: 3}}/>
            <Typography variant="h2" align="center">Withdraw</Typography>
            <Typography variant="h5" align="center">Unstake and withdraw your ETH</Typography>
            <Box width="100%" display="flex" justifyContent="center" mt={4}>
                <Box
                        sx={{
                            width: 656, // 宽度
                            height: 715, // 高度
                            bgcolor: 'rgba(24, 107, 163, 0.43)', // 背景色
                            border: '2px solid #1976d2', // 边框
                            borderRadius: 4, // 圆角，数字为theme.spacing(4)
                            boxShadow: 3, // 阴影
                            p: 2, // 内边距
                        }}
                    >


                    <Grid container spacing={4}>
                        <Grid size={4}>
                            <StakeAmountView amount={stakedAmountStr}/>
                        </Grid>
                        <Grid size={4}>
                            <AvailableWithdrawView amount={availableToWithdrawStr}/>
                        </Grid>
                        <Grid size={4}>
                            <PendingWithdraw amount={pendingWithdrawStr}/>
                        </Grid>
                    </Grid>
                    
                    <UnstakeView stakedAmount={stakedAmount}/>
                    <WithdrawView amount={availableToWithdrawStr}/>
                </Box>
            </Box>

                
            

            
            
        </div>
    );
}