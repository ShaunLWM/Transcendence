import {useEffect} from "react";
import {TOKENS} from "../utils/Constants";
import {useDispatch} from "react-redux";
import {setPrices} from "../store/slices/CoinGecko";

export default function useCoinGeckoPrice() {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchPrices = async () => {
			const results = await fetch(
				`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURI(
					TOKENS.join(","),
				)}&vs_currencies=usd`,
			);

			const json = (await results.json()) as TupleToObject<typeof TOKENS>;
			dispatch(setPrices(json));
		};

		fetchPrices();
	}, [dispatch]);
}
