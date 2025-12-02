import RectBoxView from "./RectBoxView";

interface PendingWithdrawProps {
    amount?: string;
}

export default function PendingWithdraw({ amount }: PendingWithdrawProps) {
    return (
        <RectBoxView title="Pending Withdraw" value={amount || "0.0000"} />
    );  
}