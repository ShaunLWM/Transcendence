import dayjs from "dayjs";
import RelativeTimePlugin from "dayjs/plugin/relativeTime";
import {PriceKey} from "../store/slices/CoinGecko";
dayjs.extend(RelativeTimePlugin);

export const fromNow = (time: string | number) => {
	return dayjs(time).fromNow();
};

export const generateTransactionApi = (
	type: PriceKey,
	address: string,
	page: number,
	start = 1,
	end = 99999999,
) => {
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
