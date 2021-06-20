interface BSCTransactionsResult {
	status: string;
	message: string;
	result: BSCTransaction[];
}

interface BSCTransaction {
	blockNumber: string;
	timeStamp: string;
	hash: string;
	nonce: string;
	blockHash: string;
	transactionIndex: string;
	from: string;
	to: string;
	value: string;
	gas: string;
	gasPrice: string;
	isError: "0" | "1";
	txreceipt_status: string;
	input: string;
	contractAddress: string;
	cumulativeGasUsed: string;
	gasUsed: string;
	confirmations: string;
}

type TupleToObject<T extends readonly string[]> = {
	[P in T[number]]: {
		usd: number;
	};
};

type TransactionAPIResult = ITransactionAPISuccess | ITransactionAPIFailure;

interface ITransactionAPIFailure {
	status: "0";
	message: "NOTOK";
	result: string;
}

interface ITransactionAPISuccess {
	status: "1";
	message: "OK";
	result: BSCTransaction[];
}
