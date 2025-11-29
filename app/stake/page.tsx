'use client';
import { Box, Divider, Typography } from "@mui/material";
import { HeadView } from "../components/HeadView";
import { useAccount, useContractRead, useReadContract } from "wagmi";
import { stakeAddress } from "@/constants/address";
import { stakeAbi } from "@/constants/abi/stakeABI";
import { formatUnits } from "viem";

export default function StakePage() {

    const { address: myAddress } = useAccount();


    const {data: stakedAmount, isLoading, error} = useReadContract({
        address: stakeAddress,
        abi: stakeAbi,
        functionName: 'stakingBalance',
        args: [BigInt(0), myAddress!],
        query: { enabled: !!myAddress }
    });

    return (
        <div>
            <HeadView/>
            <Divider sx={{my: 3}}/>
            <Typography variant="h2" align="center">MetaNode Stake</Typography>
            <Typography variant="h5" align="center">Stake ETH to earn tokens</Typography>
            <Box height={60} />
            <Typography variant="h5" align="center">Staked Amount</Typography>
            <Typography variant="h2" align="center">{stakedAmount ? Number(formatUnits(stakedAmount, 18)).toFixed(2) : "0.00"} ETH</Typography>
        </div>
    );
}