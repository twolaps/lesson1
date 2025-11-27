'use client'

import { ContractBalance } from "./components/ContractBalance";
import { Header } from "./components/Header";
import { Info } from "./components/Info";
import { MintView } from "./components/MintView";
import { SendTransactionView } from "./components/SendTransactionView";
import './globals.css';

export default function Home() {
  return (
    <div>
      <Header/>
      <hr/>
      <Info/>
      <hr/>
      <SendTransactionView/>
      <hr/>
      <ContractBalance/>
      <hr/>
      <MintView/>
      <hr/>
    </div>
  );
}
