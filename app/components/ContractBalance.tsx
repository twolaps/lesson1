import { useEffect } from "react";
import { erc20Abi, formatUnits } from "viem";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { eventBus, MINT_SUCCESS_EVENT } from "../tools/EventBus";

export const ContractBalance = ()=>{
    const contractAddress = '0x287b3e9E93f05D361A28985635ed7Db5163b8381';

    const {address: userAddress} = useAccount();
    const chainId: number = useChainId();

    const { data, isLoading, isError, refetch } = useReadContract({
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [userAddress!],
        chainId
    });

    useEffect(()=>{
        const onMintSuccess = ()=>{
            console.log('收到铸币成功事件，重新获取合约余额');
            refetch();
        }

        eventBus.on(MINT_SUCCESS_EVENT, onMintSuccess);

        return ()=>{
            eventBus.off(MINT_SUCCESS_EVENT, onMintSuccess);
        };

    }, [refetch]);

    let txt: string = '';
    if (isLoading) {
        txt = '合约余额：余额加载中...';
    }
    else if (isError) {
        txt = '合约余额：查询失败';
    }
    else {
        txt = `合约余额：${data ? formatUnits(data, 18) : 0}`;
    }
    return (
        <div>
            <h1>ContractAddress: {contractAddress}</h1>
            <h1>{txt}</h1>
        </div>
    )
    
}