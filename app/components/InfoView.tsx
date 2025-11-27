'use client'

import { useAccount, useBalance } from "wagmi"
import { formatUnits } from 'viem'

export const InfoView = ()=>{

    const {address} = useAccount();
    const {data, isLoading, isError} = useBalance({address});

    const balance = data?.value ? formatUnits(data.value, data.decimals ?? 18) : undefined;

    let balanceStr: string = '';
    if (!address){
        balanceStr = '请连接钱包';
    }
    else if (isLoading) {
        balanceStr = '余额加载中...';
    }
    else if (isError) {
        balanceStr = '查询失败';
    }
    else if (!data) {
        balanceStr = '暂无余额数据';
    }
    else {
        balanceStr = balance ?? '0';
    }   



    return (
        <div>
            <h1>my_address: {address}</h1>
            <h1>eth_balance: {balanceStr}</h1>
        </div>
    )
}