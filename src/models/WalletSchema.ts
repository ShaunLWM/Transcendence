import Realm from "realm";
import {PriceKey} from "../store/slices/CoinGecko";
import TransactionSchema from "./TransactionSchema";

export interface IWallet {
	address: string;
	name: string;
	type: PriceKey;
	transactions?: Realm.List<TransactionSchema> | TransactionSchema[] | [];
}

export default class WalletSchema {
	public address: string;
	public name: string;
	public type: PriceKey;
	public transactions?: Realm.List<TransactionSchema> | TransactionSchema[] | [];

	public static schema: Realm.ObjectSchema = {
		name: "WalletItem",
		primaryKey: "address",
		properties: {
			address: {type: "string", indexed: true},
			name: {type: "string"},
			type: {type: "string"},
			transactions: {type: "list", objectType: "TransactionItem"},
		},
	};

	constructor({name, address, type, transactions = []}: IWallet) {
		this.name = name;
		this.address = address;
		this.type = type;
		this.transactions = transactions;
	}
}
