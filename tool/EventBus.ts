import mitt from "mitt";

export const ETHERS_TRANSACT_EVENT = 'ETHERS_TRANSACT_EVENT';
export const ETHERS_MINT_EVENT = 'ETHERS_MINT_EVENT';
export const ETHERS_CONTRACT_TRANSACT_EVENT = 'ETHERS_CONTRACT_TRANSACT_EVENT';

export const ETHERS_UNSTAKE_SUCCESS_EVENT = 'ETHERS_UNSTAKE_SUCCESS_EVENT';

// type BusEvents = {
//     [ETHERS_TRANSACT_EVENT]: void;
//     [ETHERS_MINT_EVENT]: void;
//     [ETHERS_CONTRACT_TRANSACT_EVENT]: void;
//     [ETHERS_UNSTAKE_COMPLETE]: {isSuccess: boolean};
// };

export const eventBus = mitt();