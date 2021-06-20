import Realm from "realm";
import TransactionSchema from "./TransactionSchema";

interface IWallet {
	address: string;
	name: string;
	transactions?: Realm.List<TransactionSchema> | TransactionSchema[] | [];
}

export default class WalletSchema {
	public address: string;
	public name: string;
	public transactions?:
		| Realm.List<TransactionSchema>
		| TransactionSchema[]
		| [];

	public static schema: Realm.ObjectSchema = {
		name: "WalletItem",
		primaryKey: "address",
		properties: {
			address: {type: "string", indexed: true},
			name: {type: "string"},
			transactions: {type: "list", objectType: "TransactionItem"},
		},
	};

	constructor({name, address, transactions = []}: IWallet) {
		this.name = name;
		this.address = address;
		this.transactions = transactions;
	}
}
