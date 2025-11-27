'use client'

import { ContractBalanceView } from "./components/ContractBalanceView";
import { ContractTransactView } from "./components/ContractTransactView";
import { HeadView } from "./components/HeadView";
import { InfoView } from "./components/InfoView";
import { MintView } from "./components/MintView";
import { TransactView } from "./components/TransactView";
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
