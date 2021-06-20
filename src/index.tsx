import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {StatusBar} from "react-native";
import AddWalletModal from "./common/modals/AddWalletModal";
import QRCodeScannerModal from "./common/modals/QRCodeScannerModal";
import useCoinGeckoPrice from "./hooks/useCoinGeckoPrice";
import TransactionsHistoryScreen from "./screens/TransactionsHistoryScreen";
import WalletScreen from "./screens/WalletScreen";
import {PriceKey} from "./store/slices/CoinGecko";

export type MainStackParamList = {
	WalletScreen: undefined;
	TransactionsHistory: {
		type: PriceKey;
		address: string;
	};
};

export type RootStackParamList = {
	Main: undefined;
	AddWalletModal: {
		address: string;
	};
	QRCodeScannerModal: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

function MainStackScreens() {
	return (
		<MainStack.Navigator
			headerMode="none"
			screenOptions={{
				headerShown: false,
			}}>
			<MainStack.Screen name="WalletScreen" component={WalletScreen} />
			<MainStack.Screen name="TransactionsHistory" component={TransactionsHistoryScreen} />
		</MainStack.Navigator>
	);
}

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
				<RootStack.Navigator mode="modal">
					<RootStack.Screen name="Main" component={MainStackScreens} options={{headerShown: false}} />
					<RootStack.Screen name="AddWalletModal" component={AddWalletModal} />
					<RootStack.Screen
						name="QRCodeScannerModal"
						component={QRCodeScannerModal}
						options={{title: "Scan Wallet QR Code"}}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		</>
	);
}

export default App;
