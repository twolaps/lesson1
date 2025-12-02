import RectBoxView from "./RectBoxView";
interface StakeAmountViewProps {
    amount?: string;
}

export default function StakeAmountView({ amount }: StakeAmountViewProps) {

    return (
        <RectBoxView title="Staked Amount" value={amount ? amount : '0.0000'} />
    );  
}