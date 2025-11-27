'use client'

import { ContractBalanceView } from "./components/wagmi/ContractBalanceView";
import { ContractTransactView } from "./components/wagmi/ContractTransactView";
import { InfoView } from "./components/wagmi/InfoView";
import { MintView } from "./components/wagmi/MintView";
import { TransactView } from "./components/wagmi/TransactView";
import { HeadView } from "./components/wagmi/HeadView";

import './globals.css';

export default function Home() {
  return (
    <div>
      <HeadView/>
      <hr/>
      <InfoView/>
      <hr/>
      <TransactView/>
      <hr/>
      <ContractBalanceView/>
      <hr/>
      <MintView/>
      <hr/>
      <ContractTransactView/>
    </div>
  );
}
