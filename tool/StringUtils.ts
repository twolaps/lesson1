import { formatUnits, parseEther } from "viem"

export const bigintToString = (bigint: bigint, fixed:number = 4, decimals: number = 18): string => {
    return bigint ? Number(formatUnits(bigint, decimals)).toFixed(fixed) : Number(0).toFixed(fixed);
}

export const stringToBigint = (amountStr: string | number): bigint => {
    if (typeof amountStr === "number") {
        amountStr = amountStr.toString();
    }

    return parseEther(amountStr);
}

/**
 * 截断长字符串并在中间使用省略号 (...) 表示。
 *
 * @param str 要截断的字符串。
 * @param frontLen 在开头保留的字符数 (默认为 6)。
 * @param backLen 在结尾保留的字符数 (默认为 4)。
 * @returns 截断后的字符串，如果原字符串不够长则返回原字符串。
 */
export const truncateString = (
    str: string | `0x${string}` | undefined, 
    frontLen: number = 6, 
    backLen: number = 4): string => {
        
    if (str === undefined) {
        return "";
    }
    else if (str.length <= frontLen + backLen) {
        return str;
    }
    else 
        return `${str.slice(0, frontLen)}...${str.slice(-backLen)}`;
}