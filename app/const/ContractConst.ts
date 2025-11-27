import { Address, getAddress } from "viem";

export const contractAddress: Address = getAddress('0x287b3e9E93f05D361A28985635ed7Db5163b8381');
export const myAddress: `0x${string}` = '0x68f716d010196cffb31a3918f1bf606448e3fb88';
export const contractABI: object[] = [
						{
							"inputs": [
								{
									"internalType": "address",
									"name": "_tokenContract",
									"type": "address"
								}
							],
							"stateMutability": "nonpayable",
							"type": "constructor"
						},
						{
							"anonymous": false,
							"inputs": [
								{
									"indexed": true,
									"internalType": "address",
									"name": "Receiver",
									"type": "address"
								},
								{
									"indexed": true,
									"internalType": "uint256",
									"name": "Amount",
									"type": "uint256"
								}
							],
							"name": "SendToken",
							"type": "event"
						},
						{
							"inputs": [],
							"name": "amountAllowed",
							"outputs": [
								{
									"internalType": "uint256",
									"name": "",
									"type": "uint256"
								}
							],
							"stateMutability": "view",
							"type": "function"
						},
						{
							"inputs": [],
							"name": "requestTokens",
							"outputs": [],
							"stateMutability": "nonpayable",
							"type": "function"
						},
						{
							"inputs": [
								{
									"internalType": "address",
									"name": "",
									"type": "address"
								}
							],
							"name": "requestedAddress",
							"outputs": [
								{
									"internalType": "bool",
									"name": "",
									"type": "bool"
								}
							],
							"stateMutability": "view",
							"type": "function"
						},
						{
							"inputs": [],
							"name": "tokenContract",
							"outputs": [
								{
									"internalType": "address",
									"name": "",
									"type": "address"
								}
							],
							"stateMutability": "view",
							"type": "function"
						}
					];


					
export const contractABI2: object[] = [
						{
							"inputs": [
								{
									"internalType": "string",
									"name": "name_",
									"type": "string"
								},
								{
									"internalType": "string",
									"name": "symbol_",
									"type": "string"
								}
							],
							"stateMutability": "nonpayable",
							"type": "constructor"
						},
						{
							"anonymous": false,
							"inputs": [
								{
									"indexed": true,
									"internalType": "address",
									"name": "owner",
									"type": "address"
								},
								{
									"indexed": true,
									"internalType": "address",
									"name": "spender",
									"type": "address"
								},
								{
									"indexed": false,
									"internalType": "uint256",
									"name": "value",
									"type": "uint256"
								}
							],
							"name": "Approval",
							"type": "event"
						},
						{
							"anonymous": false,
							"inputs": [
								{
									"indexed": true,
									"internalType": "address",
									"name": "from",
									"type": "address"
								},
								{
									"indexed": true,
									"internalType": "address",
									"name": "to",
									"type": "address"
								},
								{
									"indexed": false,
									"internalType": "uint256",
									"name": "value",
									"type": "uint256"
								}
							],
							"name": "Transfer",
							"type": "event"
						},
						{
							"inputs": [
								{
									"internalType": "address",
									"name": "",
									"type": "address"
								},
								{
									"internalType": "address",
									"name": "",
									"type": "address"
								}
							],
							"name": "allowance",
							"outputs": [
								{
									"internalType": "uint256",
									"name": "",
									"type": "uint256"
								}
							],
							"stateMutability": "view",
							"type": "function"
						},
						{
							"inputs": [
								{
									"internalType": "address",
									"name": "spender",
									"type": "address"
								},
								{
									"internalType": "uint256",
									"name": "amount",
									"type": "uint256"
								}
							],
							"name": "approve",
							"outputs": [
								{
									"internalType": "bool",
									"name": "",
									"type": "bool"
								}
							],
							"stateMutability": "nonpayable",
							"type": "function"
						},
						{
							"inputs": [
								{
									"internalType": "address",
									"name": "",
									"type": "address"
								}
							],
							"name": "balanceOf",
							"outputs": [
								{
									"internalType": "uint256",
									"name": "",
									"type": "uint256"
								}
							],
							"stateMutability": "view",
							"type": "function"
						},
						{
							"inputs": [
								{
									"internalType": "uint256",
									"name": "amount",
									"type": "uint256"
								}
							],
							"name": "burn",
							"outputs": [],
							"stateMutability": "nonpayable",
							"type": "function"
						},
						{
							"inputs": [],
							"name": "decimals",
							"outputs": [
								{
									"internalType": "uint8",
									"name": "",
									"type": "uint8"
								}
							],
							"stateMutability": "view",
							"type": "function"
						},
						{
							"inputs": [
								{
									"internalType": "uint256",
									"name": "amount",
									"type": "uint256"
								}
							],
							"name": "mint",
							"outputs": [],
							"stateMutability": "nonpayable",
							"type": "function"
						},
						{
							"inputs": [],
							"name": "name",
							"outputs": [
								{
									"internalType": "string",
									"name": "",
									"type": "string"
								}
							],
							"stateMutability": "view",
							"type": "function"
						},
						{
							"inputs": [],
							"name": "symbol",
							"outputs": [
								{
									"internalType": "string",
									"name": "",
									"type": "string"
								}
							],
							"stateMutability": "view",
							"type": "function"
						},
						{
							"inputs": [],
							"name": "totalSupply",
							"outputs": [
								{
									"internalType": "uint256",
									"name": "",
									"type": "uint256"
								}
							],
							"stateMutability": "view",
							"type": "function"
						},
						{
							"inputs": [
								{
									"internalType": "address",
									"name": "recipient",
									"type": "address"
								},
								{
									"internalType": "uint256",
									"name": "amount",
									"type": "uint256"
								}
							],
							"name": "transfer",
							"outputs": [
								{
									"internalType": "bool",
									"name": "",
									"type": "bool"
								}
							],
							"stateMutability": "nonpayable",
							"type": "function"
						},
						{
							"inputs": [
								{
									"internalType": "address",
									"name": "sender",
									"type": "address"
								},
								{
									"internalType": "address",
									"name": "recipient",
									"type": "address"
								},
								{
									"internalType": "uint256",
									"name": "amount",
									"type": "uint256"
								}
							],
							"name": "transferFrom",
							"outputs": [
								{
									"internalType": "bool",
									"name": "",
									"type": "bool"
								}
							],
							"stateMutability": "nonpayable",
							"type": "function"
						}
					];