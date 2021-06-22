import dayjs from "dayjs";
import RelativeTimePlugin from "dayjs/plugin/relativeTime";
import Realm from "realm";
import TransactionSchema from "../models/TransactionSchema";
import WalletSchema from "../models/WalletSchema";
import {PriceKey} from "../store/slices/CoinGecko";
import {Keccak} from "sha3";

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

function isHexString(value: string, length?: number) {
	if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
		return false;
	}

	if (length && value.length !== 2 + 2 * length) {
		return false;
	}

	return true;
}

function verifyAddressChecksum(address: string) {
	address = address.replace("0x", "");
	const hash = new Keccak(256);
	const addressHash = hash.update(address.toLowerCase()).digest("hex");
	for (let i = 0; i < 40; i += 1) {
		if (
			(parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
			(parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])
		) {
			return false;
		}
	}

	return true;
}

export const isValidAddress = (type: PriceKey, address: string) => {
	switch (type) {
		case "bnb":
		case "eth": {
			if (!isHexString(address)) return false;
			if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
				return false;
			}

			if (/^0x[0-9a-f]{40}$/.test(address) || /^0x?[0-9A-F]{40}$/.test(address)) {
				return true;
			}

			return verifyAddressChecksum(address);
		}
		default:
			return true;
	}
};

export const getRealm = async () => {
	return await Realm.open({
		path: "realm",
		schema: [WalletSchema, TransactionSchema],
	});
};

export const getWalletIcon = (type: PriceKey) => {
	switch (type) {
		case "bnb":
			return require("../assets/logos/binance.svg");
		case "btc":
			return require("../assets/logos/binance.svg");
		case "eth":
			return require("../assets/logos/ethereum.svg");
		case "matic":
			return require("../assets/logos/polygon.svg");
	}
};
