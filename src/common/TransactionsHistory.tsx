import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import styled from "styled-components/native";
import BigHeader from "./BigHeader";
import TransactionItem from "./TransactionItem";

const StyledScrollView = styled.ScrollView.attrs(() => ({
	contentContainerStyle: {
		paddingHorizontal: 12,
	},
}))``;

export default function TransactionsHistory() {
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
		<SafeAreaView>
			<StyledScrollView showsVerticalScrollIndicator={false}>
				<BigHeader text="Transactions" />
				{transactions.map(transaction => {
					return (
						<TransactionItem
							key={transaction.hash}
							{...transaction}
							walletAddress="0xb91b4bdb52ea76d2849d04128b0ce319699a387a"
						/>
					);
				})}
			</StyledScrollView>
		</SafeAreaView>
	);
}
