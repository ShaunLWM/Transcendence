import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import * as React from "react";
import {StatusBar} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import TransactionsHistoryScreen from "./screens/TransactionsHistoryScreen";
import WalletScreen from "./screens/WalletScreen";

type RootStackParamList = {
	WalletScreen: undefined;
	TransactionsHistory: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
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
					<Stack.Screen
						name="TransactionsHistory"
						component={TransactionsHistoryScreen}
					/>
					<Stack.Screen name="WalletScreen" component={WalletScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

export default App;
