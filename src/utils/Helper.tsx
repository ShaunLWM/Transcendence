import dayjs from "dayjs";
import RelativeTimePlugin from "dayjs/plugin/relativeTime";
import Realm from "realm";
import TransactionSchema from "../models/TransactionSchema";
import WalletSchema from "../models/WalletSchema";
import {PriceKey} from "../store/slices/CoinGecko";
dayjs.extend(RelativeTimePlugin);

export const fromNow = (time: string | number) => {
	return dayjs(time).fromNow();
};

export const generateTransactionApi = (type: PriceKey, address: string, page: number, start = 1, end = 99999999) => {
	switch (type) {
		case "bnb":
			return `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=${start}&endblock=${end}&sort=desc&apikey=YourApiKeyToken`;
		case "btc":
			// TODO:
			return `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=${start}&endblock=${end}&sort=desc&apikey=YourApiKeyToken`;
		case "eth":
			return `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${start}&endblock=${end}&sort=desc&apikey=YourApiKeyToken`;
		case "matic":
			return `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=${start}&endblock=${end}&sort=desc&apikey=YourApiKeyToken`;
	}
};

export const isValidAddress = (type: PriceKey, address: string) => {
	return /^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address);
};

export const getRealm = async () => {
	return await Realm.open({
		path: "realm",
		schema: [WalletSchema, TransactionSchema],
	});
};
