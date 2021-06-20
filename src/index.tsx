import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {StatusBar} from "react-native";
import useCoinGeckoPrice from "./hooks/useCoinGeckoPrice";
import TransactionsHistoryScreen from "./screens/TransactionsHistoryScreen";
import WalletScreen from "./screens/WalletScreen";
import {PriceKey} from "./store/slices/CoinGecko";

export type RootStackParamList = {
	WalletScreen: undefined;
	TransactionsHistory: {
		type: PriceKey;
		address: string;
	};
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
	useCoinGeckoPrice();

	return (
		<>
			<StatusBar
				barStyle="dark-content"
				showHideTransition="slide"
				hidden={false}
				translucent={true}
				backgroundColor="transparent"
			/>
			<NavigationContainer>
				<Stack.Navigator
					headerMode="none"
					screenOptions={{
						headerShown: false,
					}}>
					<Stack.Screen name="WalletScreen" component={WalletScreen} />
					<Stack.Screen name="TransactionsHistory" component={TransactionsHistoryScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

export default App;
