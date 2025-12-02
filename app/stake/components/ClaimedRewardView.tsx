import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { erc20Abi, formatUnits } from "viem";
import { useChainId, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

interface ClaimedRewardViewProps {
    stakeAddress: `0x${string}`;
    stakeAbi: object[];
    myAddress: `0x${string}` | undefined;
}

export default function ClaimedRewardView({ stakeAddress, stakeAbi, myAddress }: ClaimedRewardViewProps) {
    const { writeContractAsync } = useWriteContract();
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
    const [rewardStatus, setRewardStatus] = useState<string>('');

    const { isSuccess, isError, error } = useWaitForTransactionReceipt({
        hash: txHash,
        query: { enabled: !!txHash }
    });

    const { data: pendingReward, refetch: refetchPendingReward } = useReadContract({
        address: stakeAddress,
        abi: stakeAbi,
        functionName: 'pendingMetaNode', 
        args: [0, myAddress],
        query: { enabled: !!myAddress }
    });

    const { data: tokenAddress } = useReadContract({
        address: stakeAddress,
        abi: stakeAbi,
        functionName: 'MetaNode',
    });

    const realTokenAddress: `0x${string}` | undefined = typeof tokenAddress === 'string' ? tokenAddress as `0x${string}` : undefined;

    const chainId: number = useChainId();
    const { data: balanceData, refetch: refetchBalance } = useReadContract({
        address: realTokenAddress,
        abi: erc20Abi,
        functionName: 'balanceOf', 
        args: [myAddress!],
        query: { enabled: !!myAddress },
        chainId
    });

    const balanceStr: string = balanceData ? parseFloat(formatUnits(balanceData as bigint, 18)).toFixed(4) : '0.0000';

    const { data: tokenSymbol } = useReadContract({
        address: realTokenAddress,
        abi: erc20Abi,
        functionName: "symbol",
        query: { enabled: !!realTokenAddress }
    });

    let claimedRewardStr: string = '0.0000';
    if (typeof pendingReward === 'bigint'){
        formatUnits(pendingReward, 18);
        claimedRewardStr = parseFloat(formatUnits(pendingReward, 18)).toFixed(4);
    }

    let btnEnabled: boolean = true;
    if (pendingReward && typeof pendingReward === 'bigint' && pendingReward > BigInt(0)) {
        btnEnabled = true;
    }
    else {
        btnEnabled = false;
    }

    const symbolStr: string = tokenSymbol ? String(tokenSymbol) : '';


    useEffect(() => {
        if (isSuccess) {
            refetchPendingReward();
            alert("质押奖励领取成功");
            setRewardStatus("质押奖励领取成功");
            setTxHash(undefined);
            refetchBalance();
        } else if (isError) {
            alert("质押奖励领取失败: " + (error as Error).message);
            setRewardStatus("");
            setTxHash(undefined);
        }
    }, [isSuccess, isError, error, refetchPendingReward, refetchBalance]);

    const onClickClaimReward = async ()=> {
        if (!myAddress) {
            alert("请先连接钱包");
            return;
        }

        if (!pendingReward || pendingReward === BigInt(0)) {
            alert("没有可领取的质押奖励");
            return;
        }

        try {
            setRewardStatus("正在领取质押奖励...");
            const tx: `0x${string}` = await writeContractAsync({
                address: stakeAddress,
                abi: stakeAbi,
                functionName: 'claim',
                args: [0],
            });
            setTxHash(tx);
        } catch (error) {
            setRewardStatus("领取质押奖励时出错");
            alert("领取质押奖励时出错: " + (error as Error).message);
            return;
        }
    }

    return (
        <>
            <Typography sx={{mt: 15}} variant="h5" align="center">Claimed Rewards</Typography>
            <Typography variant="h2" align="center">{claimedRewardStr} {symbolStr}</Typography>
            <Typography sx={{mt: 4}} variant="h5" align="center">Your Balance: {balanceStr} {symbolStr}</Typography>
            <Button onClick={onClickClaimReward} variant="contained" disabled={!btnEnabled} sx={{mt: 4, display: 'block', mx: 'auto',width:300, height:60, fontSize:24}}>Claim Rewards</Button>
            <Typography sx={{mt: 4}} variant="h5" align="center">{rewardStatus}</Typography>
        </>
    );
}