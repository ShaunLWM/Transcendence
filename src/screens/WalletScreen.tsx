import React, {useEffect} from "react";
import {StyleSheet, Text} from "react-native";
import {CollapsibleHeaderSectionList} from "react-native-collapsible-header-views";
import {getStatusBarHeight} from "react-native-status-bar-height";
import BigHeader from "../common/BigHeader";
import useDatabase from "../hooks/useDatabase";

export default function WalletScreen() {
	const database = useDatabase();

	useEffect(() => {
		if (!database) {
			return console.log("No database");
		}

		database.write(() => {
			const task1 = database.create("Transaction", {
				_id: 1,
				type: "bnb",
				hash: "0x6cfaf7cc717e887f0f15dd365a59fcdaf832bed9066f8be6331af24ffb5bf126",
				blockNumber: "8435591",
				timeStamp: "1624115706",
				from: "0xe2d3a739effcd3a99387d015e260eefac72ebea1",
				to: "0x0000000000000000000000000000000000001000",
				value: "0.181551322867059101",
				gasPrice: "0.000000005",
				isError: "0",
				confirmations: "325",
			});
			console.log(`created two tasks: ${task1}`);
		});
	}, [database]);

	return (
		<CollapsibleHeaderSectionList
			style={styles.listContainer}
			contentContainerStyle={styles.listContent}
			CollapsibleHeaderComponent={<BigHeader text="Home" />}
			headerHeight={140}
			statusBarHeight={getStatusBarHeight()}
			headerContainerBackgroundColor={"white"}
			renderItem={({item}) => {
				return <Text>{item}</Text>;
			}}
			renderSectionHeader={({section: {title}}) => (
				<Text style={{fontSize: 30}}>{title}</Text>
			)}
			// keyExtractor={(item, index) => item + index}
			sections={[
				{
					title: "Latest Transactions",
					data: [],
				},
				{
					title: "Wallets",
					data: [],
				},
			]}
		/>
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
