import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import * as React from "react";
import {StatusBar} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import TransactionsHistory from "./common/TransactionsHistory";
import WalletScreen from "./screens/WalletScreen";

type RootStackParamList = {
	WalletScreen: undefined;
	TransactionsHistory: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
	return (
		<SafeAreaProvider>
			<StatusBar barStyle={"light-content"} />
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
