import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import omit from "lodash.omit";
import React, {useCallback, useEffect, useState} from "react";
import {RefreshControl, StyleSheet, Text, View, ViewStyle} from "react-native";
import {CollapsibleHeaderFlatList} from "react-native-collapsible-header-views";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {UpdateMode} from "realm";
import {MainStackParamList} from "..";
import BigHeader from "../common/BigHeader";
import TransactionItem from "../common/TransactionItem";
import useCoinGeckoPrice from "../hooks/useCoinGeckoPrice";
import TransactionSchema, {ITransaction} from "../models/TransactionSchema";
import {get} from "../utils/FetchManager";
import {generateTransactionApi, getRealm} from "../utils/Helper";
import {CustomTransaction} from "./WalletScreen";
import WalletSchema, {IWallet} from "../models/WalletSchema";

export default function TransactionsHistoryScreen() {
	useCoinGeckoPrice(true);

	const route = useRoute<RouteProp<MainStackParamList, "TransactionsHistory">>();
	const navigation = useNavigation();

	const [error, setError] = useState<string>();
	const [isLoading, setLoading] = useState(true);
	const [transactions, setTransactions] = useState<CustomTransaction[]>([]);
	const [page, setPage] = useState(1);

	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		async function setup() {
			const realm = await getRealm();
			const address = realm.objects("WalletItem").filtered(`address == "${route.params.address}"`);
			if (!address || address.length < 1) return;
			setTransactions(
				(address[0] as unknown as IWallet).transactions.map(tx => {
					return {
						...omit(tx, "address"),
						outgoing: tx.from.toLowerCase() === route.params.address.toLowerCase(),
					};
				}),
			);
			setLoading(false);
			setError("");
		}

		setup();
	}, [route.params.address]);

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
				setTransactions(
					Array.from(allTransactions).map(tx => ({
						...JSON.parse(JSON.stringify(tx)),
						outgoing: tx.from.toLowerCase() === route.params.address.toLowerCase(),
					})),
				);

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
				headerHeight={160}
				statusBarHeight={getStatusBarHeight()}
				headerContainerBackgroundColor={"white"}
				data={transactions}
				renderItem={({item}) => <TransactionItem key={item.hash} tx={item} />}
				keyExtractor={item => item.hash}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={140} />}
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
