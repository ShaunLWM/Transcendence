import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import React, {useCallback, useEffect, useState} from "react";
import {RefreshControl, StyleSheet, Text, View, ViewStyle} from "react-native";
import {CollapsibleHeaderFlatList} from "react-native-collapsible-header-views";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {UpdateMode} from "realm";
import {MainStackParamList} from "..";
import BigHeader from "../common/BigHeader";
import TransactionItem from "../common/TransactionItem";
import TransactionSchema, {ITransaction} from "../models/TransactionSchema";
import {get} from "../utils/FetchManager";
import {generateTransactionApi, getRealm} from "../utils/Helper";

export default function TransactionsHistoryScreen() {
	const route = useRoute<RouteProp<MainStackParamList, "TransactionsHistory">>();
	const navigation = useNavigation();

	const [error, setError] = useState<string>();
	const [isLoading, setLoading] = useState(true);
	const [transactions, setTransactions] = useState<ITransaction[]>([]);
	const [page, setPage] = useState(1);

	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		async function setup() {
			const realm = await getRealm();
			const allTransactions = realm.objects<ITransaction>(TransactionSchema._schema.name).sorted("timeStamp", true);
			setTransactions(allTransactions.map(tx => tx));
			setLoading(false);
			setError("");
		}

		setup();
	}, []);

	useEffect(() => {
		if (!refreshing) return;
		async function fetchTransactions() {
			try {
				const realm = await getRealm();
				if (!route.params.address || !route.params.type) return console.log("Missing information");
				const results = await get<TransactionAPIResult>(
					generateTransactionApi(route.params.type, route.params.address, 1),
				);

				realm.write(() => {
					(results as unknown as BSCTransaction[]).map(tx => {
						realm.create<ITransaction>("TransactionItem", {...tx, type: route.params.type}, UpdateMode.Modified);
					});
				});

				const allTransactions = realm.objects<ITransaction>(TransactionSchema._schema.name).sorted("timeStamp", true);
				setTransactions(allTransactions.map(tx => tx));
				setLoading(false);
				setError(undefined);
				setRefreshing(false);
			} catch (err) {
				setError("Failed to load");
				console.log(err);
				setLoading(false);
				setRefreshing(false);
			}
		}

		fetchTransactions();
	}, [refreshing, route.params.address, route.params.type]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
	}, []);

	if (isLoading) {
		return (
			<View>
				<Text>Loading..</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View>
				<Text>{error}</Text>
			</View>
		);
	}

	return (
		<>
			<CollapsibleHeaderFlatList
				bounces={true}
				showsVerticalScrollIndicator={false}
				style={styles.listContainer}
				contentContainerStyle={styles.listContent}
				CollapsibleHeaderComponent={<BigHeader text="Transactions" onBackPress={() => navigation.goBack()} />}
				headerHeight={200}
				statusBarHeight={getStatusBarHeight()}
				headerContainerBackgroundColor={"white"}
				data={transactions}
				renderItem={({item}) => <TransactionItem key={item.hash} tx={item} />}
				keyExtractor={item => item.hash}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={200} />}
			/>
		</>
	);
}

interface Styles {
	listContainer: ViewStyle;
	listContent: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
	listContainer: {
		backgroundColor: "white",
	},
	listContent: {
		backgroundColor: "white",
		marginHorizontal: 12,
	},
});
