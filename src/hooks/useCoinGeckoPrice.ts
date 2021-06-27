import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {setPrices} from "../store/slices/CoinGecko";
import {TOKENS} from "../utils/Constants";

export default function useCoinGeckoPrice(force = false) {
	const dispatch = useDispatch();
	const prices = useSelector((state: RootState) => state.coingecko.prices);

	useEffect(() => {
		const fetchPrices = async () => {
			const results = await fetch(
				`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURI(TOKENS.join(","))}&vs_currencies=usd`,
			);

			const json = (await results.json()) as TupleToObject<typeof TOKENS>;
			dispatch(setPrices(json));
		};

		if (force || Object.values(prices).some(p => p === 0)) {
			fetchPrices();
		}
	}, [dispatch, force, prices]);
}
