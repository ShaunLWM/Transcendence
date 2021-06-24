import Realm from "realm";
import WalletSchema from "./WalletSchema";

export interface ITransaction {
	type: string;
	hash: string;
	blockNumber: string;
	timeStamp: string; // TODO: Change to number so we can sort
	from: string;
	to: string;
	value: string;
	gasPrice: string;
	gasUsed: string;
	isError: string;
	confirmations: string;
	address: Realm.Results<WalletSchema> | WalletSchema;
	gas: string;
	nonce: string;
}

export default class TransactionSchema {
	type: string;
	hash: string;
	blockNumber: string;
	timeStamp: string;
	from: string;
	to: string;
	value: string;
	gasPrice: string;
	gasUsed: string;
	isError: string;
	confirmations: string;
	address: Realm.Results<WalletSchema> | WalletSchema;
	gas: string;
	nonce: string;

	public static _schema: Realm.ObjectSchema = {
		name: "TransactionItem",
		primaryKey: "hash",
		properties: {
			type: "string", // bsc, polygon etc
			hash: "string",
			blockNumber: "string",
			timeStamp: "string",
			from: "string",
			to: "string",
			value: "string",
			gasPrice: "string",
			gasUsed: "string",
			isError: "string",
			confirmations: "string",
			address: {
				type: "linkingObjects",
				objectType: "WalletItem",
				property: "transactions",
			},
		},
	};
	constructor(tx: ITransaction) {
		// Object.assign(this, tx);
		this.type = tx.type;
		this.hash = tx.hash;
		this.blockNumber = tx.blockNumber;
		this.timeStamp = tx.timeStamp;
		this.from = tx.from;
		this.to = tx.to;
		this.value = tx.value;
		this.gasPrice = tx.gasPrice;
		this.gasUsed = tx.gasUsed;
		this.isError = tx.isError;
		this.confirmations = tx.confirmations;
		this.address = tx.address;
		// https://github.com/bStrano/Stralom-Financial/blob/master/src/modules/Transactions/models/TransactionCategory.ts

		this.gas = tx.gas;
		this.nonce = tx.nonce;
	}

	static get schema(): Realm.ObjectSchema {
		return this._schema;
	}
}
