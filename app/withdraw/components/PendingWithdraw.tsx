import RectBoxView from "./RectBoxView";

interface WithdrawViewProps {
    amount?: string;
}

export default function WithdrawView({ amount }: WithdrawViewProps) {

    return (
        <RectBoxView title="Pending Withdraw" value={amount || "0.0000"} />
    );  
}