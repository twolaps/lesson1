import RectBoxView from "./RectBoxView";

interface WithdrawInfoViewProps {
    amount: string;
}

export default function WithdrawInfoView({ amount }: WithdrawInfoViewProps) {

    return (
        <RectBoxView title="Available Withdraw" value={amount} />
    );  
}