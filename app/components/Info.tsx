'use client'

import { useAccount, useBalance } from "wagmi"
import { formatUnits } from 'viem'

export const Info = ()=>{

    const {address} = useAccount();
    const {data, isLoading, isError} = useBalance({address});

    // wagmi 的 useBalance 现在可能不提供 `formatted`，因此使用原始 value + decimals 手动格式化
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
            <h1>address: {address}</h1>
            <h1>balance: {balanceStr}</h1>
        </div>
    )
}