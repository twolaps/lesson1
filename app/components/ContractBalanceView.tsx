import { erc20Abi, formatUnits } from "viem";
import { useAccount, useChainId, useReadContract, useWatchContractEvent } from "wagmi";
import { contractABI } from "../const/ContractConst";

export const ContractBalanceView = ()=>{
    const contractAddress = '0x287b3e9E93f05D361A28985635ed7Db5163b8381';

    const {address: userAddress} = useAccount();
    const chainId: number = useChainId();

    const { data: userData, isLoading, isError, refetch: refetchUser } = useReadContract({
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [userAddress!],
        chainId
    });

    const { data: contractData, refetch: refetchContract } = useReadContract({
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [contractAddress],
        chainId
    });

    useWatchContractEvent({
        address: contractAddress,
        abi: contractABI,
        eventName: 'Transfer',
        chainId,
        onLogs: ()=>{
            if (!userAddress) return;
            refetchContract();
            refetchUser();
        },
    });

    useWatchContractEvent({
        address: contractAddress,
        abi: erc20Abi,
        eventName: 'Transfer',
        chainId,
        onLogs: ()=>{
            if (!userAddress) return;
            refetchContract();
            refetchUser();
        }
    });

    let userTxt: string = '';
    if (isLoading) {
        userTxt = 'my_balance: 余额加载中...';
    }
    else if (isError) {
        userTxt = 'my_balance: 查询失败';
    }
    else {
        userTxt = `my_balance: ${userData ? formatUnits(userData, 18) : 0}`;
    }

    return (
        <div>
            <h1>contract_address: {contractAddress}</h1>
            <h1>{userTxt}</h1>
            <h1>contract_balance: {contractData ? formatUnits(contractData, 18) : 0}</h1>
        </div>
    )
}