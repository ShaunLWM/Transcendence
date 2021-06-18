import {configureStore} from "@reduxjs/toolkit";
import coingeckoReducer from "./slices/CoinGecko";

const store = configureStore({
	reducer: {
		coingecko: coingeckoReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
