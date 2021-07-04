import Realm from "realm";
import WalletSchema from "./WalletSchema";

export interface ITransaction {
	blockNumber: string;
	timeStamp: number;
	hash: string;
	nonce: string;
	blockHash: string;
	transactionIndex: string;
	from: string;
	to: string;
	value: string;
	gas: string;
	gasPrice: string;
	isError: string;
	txreceipt_status: string;
	input: string;
	contractAddress: string;
	cumulativeGasUsed: string;
	gasUsed: string;
	confirmations: string;

	address: Realm.Results<WalletSchema> | WalletSchema;
	type: string;
}

export default class TransactionSchema {
	blockNumber: string;
	timeStamp: number; // TODO: Change to number so we can sort
	hash: string;
	nonce: string;
	blockHash: string;
	transactionIndex: string;
	from: string;
	to: string;
	value: string;
	gas: string;
	gasPrice: string;
	isError: string;
	txreceipt_status: string;
	input: string;
	contractAddress: string;
	cumulativeGasUsed: string;
	gasUsed: string;
	confirmations: string;

	type: string;
	address: Realm.Results<WalletSchema> | WalletSchema;

	public static _schema: Realm.ObjectSchema = {
		name: "TransactionItem",
		primaryKey: "hash",
		properties: {
			blockNumber: "string",
			timeStamp: "int",
			hash: "string",
			nonce: "string",
			blockHash: "string",
			transactionIndex: "string",
			from: "string",
			to: "string",
			value: "string",
			gas: "string",
			gasPrice: "string",
			isError: "string",
			txreceipt_status: "string",
			input: "string",
			contractAddress: "string",
			cumulativeGasUsed: "string",
			gasUsed: "string",
			confirmations: "string",

			type: "string", // bsc, polygon etc
			address: {
				type: "linkingObjects",
				objectType: "WalletItem",
				property: "transactions",
			},
		},
	};
	constructor(tx: ITransaction) {
		this.blockNumber = tx.blockNumber;
		this.timeStamp = tx.timeStamp;
		this.hash = tx.hash;
		this.nonce = tx.nonce;
		this.blockHash = tx.blockHash;
		this.transactionIndex = tx.transactionIndex;
		this.from = tx.from;
		this.to = tx.to;
		this.value = tx.value;
		this.gas = tx.gas;
		this.gasPrice = tx.gasPrice;
		this.isError = tx.isError;
		this.txreceipt_status = tx.txreceipt_status;
		this.input = tx.input;
		this.contractAddress = tx.contractAddress;
		this.cumulativeGasUsed = tx.cumulativeGasUsed;
		this.gasUsed = tx.gasUsed;
		this.confirmations = tx.confirmations;

		this.type = tx.type;
		this.address = tx.address;
		// https://github.com/bStrano/Stralom-Financial/blob/master/src/modules/Transactions/models/TransactionCategory.ts
	}

	static get schema(): Realm.ObjectSchema {
		return this._schema;
	}
}
