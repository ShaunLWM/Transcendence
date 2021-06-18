import {RouteProp, useRoute} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {CollapsibleHeaderFlatList} from "react-native-collapsible-header-views";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {RootStackParamList} from "..";
import BigHeader from "../common/BigHeader";
import TransactionItem from "../common/TransactionItem";
import {generateTransactionApi} from "../utils/Helper";

export default function TransactionsHistoryScreen() {
	const route =
		useRoute<RouteProp<RootStackParamList, "TransactionsHistory">>();
	const [error, setError] = useState<string>();
	const [isLoading, setLoading] = useState(true);
	const [transactions, setTransactions] = useState<BSCTransaction[]>([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		async function fetchTransactions() {
			try {
				if (!route.params.address || route.params.address)
					return console.log("Missing information");
				const results = await fetch(
					generateTransactionApi(route.params.type, route.params.address, page),
				);
				const json = (await results.json()) as BSCTransactionsResult;
				setTransactions(json.result.reverse());
				setLoading(false);
				setError(undefined);
			} catch (err) {
				setError("Failed to load");
				console.log(err);
				setLoading(false);
			}
		}

		fetchTransactions();
	}, [page, route.params.address, route.params.type]);

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
				showsVerticalScrollIndicator={false}
				style={styles.listContainer}
				contentContainerStyle={styles.listContent}
				CollapsibleHeaderComponent={<BigHeader text="Transactions" />}
				headerHeight={140}
				statusBarHeight={getStatusBarHeight()}
				headerContainerBackgroundColor={"white"}
				data={transactions}
				renderItem={({item}) => (
					<TransactionItem
						key={item.hash}
						tx={item}
						walletAddress="0xb91b4bdb52ea76d2849d04128b0ce319699a387a"
					/>
				)}
				keyExtractor={item => item.hash}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	listContainer: {
		backgroundColor: "white",
	},
	listContent: {
		backgroundColor: "white",
		marginHorizontal: 12,
	},
});
