import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setPrices} from "../store/slices/CoinGecko";
import {TOKENS} from "../utils/Constants";

export default function CoinGeckoHydrator() {
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
	}, []);

	return <></>;
}
