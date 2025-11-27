import mitt from 'mitt';
export const eventBus = mitt();

export const MINT_SUCCESS_EVENT = 'MINT_SUCCESS_EVENT';
export const TRANSFER_SUCCESS_EVENT = 'TRANSFER_SUCCESS_EVENT';