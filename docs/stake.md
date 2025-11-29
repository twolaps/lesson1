在前端查询 staked amount（已质押数量），一般有两种方式：

---

### 1. 用 wagmi 的 useContractRead（推荐）

假设你的合约有 `stakingBalance` 或 `balanceOf` 这类查询方法：

```tsx
import { useAccount, useContractRead } from "wagmi";
import { stakeAbi, stakeAddress } from "@/constants/abi/stake";

const { address } = useAccount();

const { data: stakedAmount, isLoading, error } = useContractRead({
  address: stakeAddress,
  abi: stakeAbi,
  functionName: "stakingBalance", // 或 "balanceOf"
  args: [pid, address], // 如果需要池子ID和用户地址
  enabled: !!address,   // 只有连接钱包后才查询
});
```
- `pid` 是池子ID，如果你的合约需要。
- `address` 是当前用户钱包地址。

---

### 2. 用 ethers.js 手动查询

如果不用 wagmi，也可以这样：

```tsx
import { Contract } from "ethers";
import { stakeAbi, stakeAddress } from "@/constants/abi/stake";

const provider = ... // ethers provider
const contract = new Contract(stakeAddress, stakeAbi, provider);
const stakedAmount = await contract.stakingBalance(pid, userAddress);
```

---

### 结论

- 推荐用 wagmi 的 `useContractRead`，简单高效，自动响应钱包切换。
- 查询方法名和参数要和你的合约 ABI 保持一致。

如需具体代码模板或遇到报错，随时告诉我！