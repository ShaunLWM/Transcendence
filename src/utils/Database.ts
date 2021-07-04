import omit from "lodash.omit";
import TransactionSchema, {ITransaction} from "../models/TransactionSchema";
import WalletSchema, {IWallet} from "../models/WalletSchema";
import {getRealm} from "./Helper";

let db: Realm;

export const ensureConnected = async () => {
	if (db) return;
	db = await getRealm();
};

export const getAddresses = async (): Promise<Realm.Results<WalletSchema>> => {
	ensureConnected();
	return db.objects<IWallet>(WalletSchema._schema.name);
};

export const getTransactions = async (walletId?: string): Promise<Realm.Results<TransactionSchema>> => {
	ensureConnected();
	return db.objects<ITransaction>(TransactionSchema._schema.name);
};

export const getHomeTransactions = (addresses: Realm.Results<IWallet & Realm.Object>) => {
	ensureConnected();
	const txs = [];
	for (const address of addresses) {
		if (!address.transactions || address.transactions.length < 1) continue;
		txs.push(
			...address.transactions
				.map(tx => tx)
				.sort((a, b) => b.timeStamp - a.timeStamp)
				.slice(0, 5)
				.map(tx => {
					return {
						...omit(tx, ["address"]),
						compact: true,
						name: address.name,
						outgoing: address.address.toLowerCase() === tx.from.toLowerCase(),
					};
				}),
		);
	}

	// console.log(txs.sort((a, b) => b.timeStamp - a.timeStamp).slice(0, 5));
	return txs.sort((a, b) => b.timeStamp - a.timeStamp).slice(0, 5);
};
