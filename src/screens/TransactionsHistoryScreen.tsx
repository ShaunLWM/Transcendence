import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {CollapsibleHeaderFlatList} from "react-native-collapsible-header-views";
import {getStatusBarHeight} from "react-native-status-bar-height";
import BigHeader from "../common/BigHeader";
import TransactionItem from "../common/TransactionItem";

export default function TransactionsHistoryScreen() {
	const [error, setError] = useState<string>();
	const [isLoading, setLoading] = useState(true);
	const [transactions, setTransactions] = useState<BSCTransaction[]>([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		async function fetchTransactions() {
			try {
				const results = await fetch(
					`https://api.bscscan.com/api?module=account&action=txlist&address=0xb91b4bdb52ea76d2849d04128b0ce319699a387a&startblock=8370234&endblock=99999999&sort=asc&apikey=YourApiKeyToken`,
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
						{...item}
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
