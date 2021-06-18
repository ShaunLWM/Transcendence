import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TOKENS} from "../../utils/Constants";

export type PriceKey = "bnb" | "eth" | "btc" | "matic";

const getPriceKeyFromJson = (key: typeof TOKENS[number]): PriceKey => {
	switch (key) {
		case "binancecoin":
			return "bnb";
		case "ethereum":
			return "eth";
		case "matic-network":
			return "matic";
		case "bitcoin":
			return "btc";
		default:
			throw new Error("Wrong key");
	}
};

interface CounterState {
	prices: Record<PriceKey, number>;
}

const initialState: CounterState = {
	prices: {
		bnb: 0,
		eth: 0,
		btc: 0,
		matic: 0,
	},
};

const coingeckoSlice = createSlice({
	name: "coingecko",
	initialState,
	reducers: {
		setPrice(state, action: PayloadAction<{key: PriceKey; value: number}>) {
			state.prices[action.payload.key] = action.payload.value;
		},
		setPrices(state, action: PayloadAction<TupleToObject<string[]>>) {
			for (const [key, value] of Object.entries(action.payload)) {
				state.prices[getPriceKeyFromJson(key as typeof TOKENS[number])] =
					value.usd;
			}
		},
	},
});

export const {setPrice, setPrices} = coingeckoSlice.actions;
export default coingeckoSlice.reducer;
