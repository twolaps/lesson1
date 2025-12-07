import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AddressContext } from "../context/AddressContext";
import { useContext } from "react";
import { BalanceContext } from "../context/BalanceContext";
import { getCurrentProvider } from "../GetProvide";

interface DisconnectButtonProps {
  address?: `0x${string}`;
  onClose?: () => void;
}

export const DisconnectButton = ({ address, onClose }: DisconnectButtonProps) => {
  const { setAddress } = useContext(AddressContext);
  const { setBalance } = useContext(BalanceContext);

  const handleDisconnect = async () => {
    if (!address || address === "0x00") {
      alert("钱包未连接");
      return;
    }

    try {
      if (window && window.ethereum) {
        const targetProvider = getCurrentProvider();
        if (targetProvider) {
          await targetProvider.request({
            method: "wallet_revokePermissions",
            params: [
              { eth_accounts: {} }
            ]
          });
        }

        console.log("Disconnect successfully");
        setAddress("0x00" as `0x${string}`);
        setBalance(BigInt(0));
        localStorage.removeItem("connectedWallet");
      }
    }
    catch (error) {
      console.log("Disconnect failed:", error);
      setAddress("0x00" as `0x${string}`);
      setBalance(BigInt(0));
      localStorage.removeItem("connectedWallet");
    }

    if (onClose) {
      onClose();
    }
  }

  return (
    <Button variant="outlined" onClick={handleDisconnect} sx={{
      width: 160,
      height: 56,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }} >
      <LogoutIcon sx={{ fontSize: 20 }} />
      断开连接
    </Button>
  );
}