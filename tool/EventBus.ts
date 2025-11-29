import mitt from "mitt";

export const ETHERS_TRANSACT_EVENT = 'ETHERS_TRANSACT_EVENT';
export const ETHERS_MINT_EVENT = 'ETHERS_MINT_EVENT';
export const ETHERS_CONTRACT_TRANSACT_EVENT = 'ETHERS_CONTRACT_TRANSACT_EVENT';
export const eventBus = mitt();