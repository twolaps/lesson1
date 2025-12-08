import { bigintToString, truncateString } from "@/tool/StringUtils";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { ConnectInfoModal } from "../notConnected/ConnectInfoModal";
import { SwitchChainButton } from "../switchChain/SwitchChainButton";
import { erc20Abi } from "viem";
import { useChainId, useReadContract } from "wagmi";
import { stakeAddress } from "@/constants/address";
import { stakeAbi } from "@/constants/abi/stakeABI";

interface CustomConnectedViewProps {
  balanceETH: bigint;
  address: `0x${string}`;
	metaNodeBalance: bigint;
}

export const CustomConnectedView = ({ balanceETH, address: userAddress, metaNodeBalance }: CustomConnectedViewProps) => {

  const [open, setOpen] = useState(false);

  const onClickConnected = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1.5
      }}>
        <SwitchChainButton />
        <Button
          onClick={onClickConnected}
          sx={{
            height: "45px",
            borderRadius: "12px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
						gap: 2,
          }}
        >
					<Typography sx={{
            color: "black",
            fontSize: "14px",
            fontWeight: "700"
          }}>
            {bigintToString(balanceETH, 4)} ETH
          </Typography>

					<Typography sx={{
            color: "black",
            fontSize: "14px",
            fontWeight: "700"
          }}>
            {bigintToString(metaNodeBalance, 4)} MetaNode
          </Typography>

          <Box sx={{
            width: "150px",
            height: "35px",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            borderRadius: "12px",
            backgroundColor: "#e5e5e5",
            color: "black",
            fontSize: "14px",
            fontWeight: "700",
          }}>
            <Typography sx={{
              fontWeight: "700"
            }}>
              {truncateString(userAddress, 5, 5)}
            </Typography>
            <KeyboardArrowDown />
          </Box>
        </Button>
      </Box>

      <ConnectInfoModal isOpen={open} onClose={onClickConnected} address={userAddress} balance={balanceETH} />
    </div>
  );
}