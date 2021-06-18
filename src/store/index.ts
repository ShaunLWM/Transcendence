import {configureStore} from "@reduxjs/toolkit";
import coingeckoReducer from "./slices/CoinGecko";

const middlewares = [];

if (__DEV__) {
	const createDebugger = require("redux-flipper").default;
	middlewares.push(createDebugger());
}

const store = configureStore({
	reducer: {
		coingecko: coingeckoReducer,
	},
	middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
