import Realm from "realm";
import {PriceKey} from "../store/slices/CoinGecko";
import TransactionSchema from "./TransactionSchema";

export interface IWallet {
	id: string;
	address: string;
	name: string;
	type: PriceKey;
	transactions?: Realm.List<TransactionSchema> | TransactionSchema[] | [];
}

export default class WalletSchema {
	public id: string;
	public address: string;
	public name: string;
	public type: PriceKey;
	public transactions?: Realm.List<TransactionSchema> | TransactionSchema[] | [];

	public static _schema: Realm.ObjectSchema = {
		name: "WalletItem",
		primaryKey: "id",
		properties: {
			id: {type: "string"},
			address: {type: "string", indexed: true},
			name: {type: "string"},
			type: {type: "string"},
			transactions: {type: "list", objectType: "TransactionItem"},
		},
	};

	constructor({id, name, address, type, transactions = []}: IWallet) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.type = type;
		this.transactions = transactions;
	}

	static get schema(): Realm.ObjectSchema {
		return this._schema;
	}
}
