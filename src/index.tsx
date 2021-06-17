import * as React from "react";
import {View, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import WalletScreen from "./screens/WalletScreen";
import {SafeAreaProvider} from "react-native-safe-area-context";
import TransactionsHistory from "./common/TransactionsHistory";

type RootStackParamList = {
	WalletScreen: undefined;
	TransactionsHistory: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}>
					<Stack.Screen
						name="TransactionsHistory"
						component={TransactionsHistory}
					/>
					<Stack.Screen name="WalletScreen" component={WalletScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default App;
