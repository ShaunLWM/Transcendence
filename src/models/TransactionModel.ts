import Realm from "realm";

export const TransactionSchema: Realm.ObjectSchema = {
	name: "Transaction",
	properties: {
		_id: "int",
		type: "string", // bsc, polygon etc
		hash: "string",
		blockNumber: "string",
		timeStamp: "string",
		from: "string",
		to: "string",
		value: "string",
		gasPrice: "string",
		isError: "string",
		confirmations: "string",
	},
	primaryKey: "_id",
};

console.log(TransactionSchema);
