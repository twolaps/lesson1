import { stakeAbi } from "@/constants/abi/stakeABI";
import { stakeAddress } from "@/constants/address";
import { ETHERS_UNSTAKE_SUCCESS_EVENT, eventBus } from "@/tool/EventBus";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

interface WithdrawViewProps {
    amount?: string;
}

type PoolInfo = [
  Address,    // stTokenAddress
  bigint,    // poolWeight
  bigint,    // lastRewardBlock
  bigint,    // accMetaNodePerST
  bigint,    // stTokenAmount
  bigint,    // minDepositAmount
  bigint     // unstakeLockedBlocks
];

const BLOCK_TIME_SECONDS: number = 12;

export default function WithdrawView({ amount }: WithdrawViewProps) {
    const { writeContractAsync } = useWriteContract();
    const [btnEnabled, setBtnEnabled] = useState<boolean>(true);
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
    const {
        isSuccess: isWithdrawSuccess,
        isError: isWithdrawError,
        error: withdrawError} = useWaitForTransactionReceipt(
            { hash: txHash, query: { enabled: !!txHash } });


    const onClickWithdraw = async() => {
        // Add withdraw logic here
        if (!amount || amount === "0.0000") {
            alert("没有可提现的金额");
            return;
        }

        try {
            setBtnEnabled(false);
            const tx: `0x${string}` =await writeContractAsync({
                address: stakeAddress,
                abi: stakeAbi,
                functionName: 'withdraw',
                args: [BigInt(0)]
            });
            setTxHash(tx);
            alert("提现请求已提交，请等待链上确认");
        }
        catch (error) {
            setBtnEnabled(true);
            console.error("提现失败:", error);
            alert("提现失败，请检查控制台日志");
        }
    };


    // 以 wagmi 为例
    const { data: poolInfo } = useReadContract({
        address: stakeAddress,
        abi: stakeAbi,
        functionName: 'pool',
        args: [0],
    }) as { data?: PoolInfo };


    let unstakeLockedSeconds: number = 0;
    if (poolInfo) {
        const blocks: bigint = poolInfo[6];
        unstakeLockedSeconds = Math.ceil(Number(blocks) * BLOCK_TIME_SECONDS / 60);
        console.log("Unstake locked time (minutes): ", unstakeLockedSeconds);
    }

    useEffect(() => {
        if (isWithdrawSuccess) {
            setTxHash(undefined);
            alert("提现成功！");
            setBtnEnabled(true);
            eventBus.emit(ETHERS_UNSTAKE_SUCCESS_EVENT);
        }
        else if (isWithdrawError) {
            setBtnEnabled(true);
            setTxHash(undefined);
            console.error("提现交易失败:", withdrawError);
            alert("提现交易失败，请检查控制台日志");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWithdrawSuccess, isWithdrawError]);

    return (
        <div style={{ marginTop: 40 }}>
            <Typography variant="h5">Withdraw</Typography>

            <Box
                sx={{
                    margin: '1rem',
                    width: 578, // 宽度
                    height: 90, // 高度
                    bgcolor: '#f3faff', // 背景色
                    borderRadius: 2, // 圆角，数字为theme.spacing(4)
                    boxShadow: 3, // 阴影
                    p: 2, // 内边距
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Stack spacing={0.5}>
                    <Typography sx={{fontSize: '0.93rem', color: '#8b8b8b'}} align="left">Ready to Withdraw</Typography>
                    <Typography sx={{fontSize: '1.5rem', color: '#0285c7', fontWeight: 750}} variant="h6">
                        {amount || "0.0000"} ETH
                    </Typography>

                    
                </Stack>

                <Typography sx={{fontSize: '0.93rem', color: '#8b8b8b', mt: 0.5}} display="flex" alignItems="center">{unstakeLockedSeconds} minutes cooldown</Typography>
            </Box>

            <Typography sx={{margin: '1rem', fontSize: '0.93rem', color: '#8b8b8b', mt: 0.5}}>After unstaking, you need to wait {unstakeLockedSeconds} minutes to withdraw.</Typography>

            <Button disabled={!btnEnabled} onClick={onClickWithdraw} style={{margin: '1rem 1rem', height:'50px', width: '578px', fontSize: '20px'}} variant="contained" >
                Withdraw ETH
            </Button>


        </div>
    );  
}