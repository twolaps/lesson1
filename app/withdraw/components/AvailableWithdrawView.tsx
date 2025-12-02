import RectBoxView from "./RectBoxView";

interface AvailableWithdrawViewProps {
    amount?: string;
}
export default function AvailableWithdrawView({ amount }: AvailableWithdrawViewProps) {

    return (
        <RectBoxView title="Available Withdraw" value={amount ? amount : '0.0000'} />
    );  
}