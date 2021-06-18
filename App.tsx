import React from "react";
import {Provider} from "react-redux";
import store from "./src/store";
import Main from "./src";

export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}
