import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {StyleSheet, Text, ViewStyle} from "react-native";
import {CollapsibleHeaderSectionList} from "react-native-collapsible-header-views";
import {FloatingAction} from "react-native-floating-action";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {UpdateMode} from "realm";
import styled from "styled-components/native";
import BigHeader from "../../common/BigHeader";
import EmptySectionComponent from "../../common/EmptySectionComponent";
import TransactionSchema, {ITransaction} from "../../models/TransactionSchema";
import {IWallet} from "../../models/WalletSchema";
import {get} from "../../utils/FetchManager";
import {generateTransactionApi, getRealm} from "../../utils/Helper";
import WalletSectionItem from "./components/WalletSectionItem";
import allSettled from "promise.allsettled";
import TransactionItem from "../../common/TransactionItem";

const SectionHeader = styled.Text`
	font-size: 30;
`;

const FAB_ACTIONS = [
	{
		text: "Input Wallet Address",
		icon: require("../../assets/misc/select.png"),
		name: "fab_manual",
		position: 1,
		color: "#E0BBE4",
	},
	{
		text: "Scan QR Code",
		icon: require("../../assets/misc/camera.png"),
		name: "fab_scan",
		position: 2,
		color: "#957DAD",
	},
	{
		text: "Location",
		icon: require("../../assets/misc/camera.png"),
		name: "bt_room",
		color: "#D291BC",
	},
];

export interface CustomTransaction extends ITransaction {
	name?: string;
	outgoing?: boolean;
	compact?: boolean;
}

export default function WalletScreen() {
	const navigation = useNavigation();
	const [wallets, setWallets] = useState<IWallet[]>([]);
	const [latestTransactions, setLatestTransactions] = useState<CustomTransaction[]>([]);

	useEffect(() => {
		async function fetchAll() {
			const map: Record<string, {name: string; outgoing: boolean}> = {};
			const realm = await getRealm();
			const addresses = realm.objects<IWallet>("WalletItem");
			if (addresses.length < 1) return;
			setWallets(addresses.map(address => address));
			const results = await allSettled(
				addresses.map(address => get<TransactionAPIResult>(generateTransactionApi(address.type, address.address, 1))),
			);

			let i = 0;
			for (const result of results) {
				if (result.status === "rejected" || result.value.message === "NOTOK") continue;
				realm.write(() => {
					(result.value.result as BSCTransaction[]).map(tx => {
						realm.create<ITransaction>("TransactionItem", {...tx, type: addresses[i].type}, UpdateMode.Modified);
					});
				});

				(result.value.result as BSCTransaction[]).map(tx => {
					console.log(tx);
					map[tx.hash] = {
						name: addresses[i].name,
						outgoing: tx.from.toLowerCase() === addresses[i].address.toLowerCase(),
					};
				});

				i += 1;
			}

			console.log(map);

			const allTransactions = realm
				.objects<ITransaction>(TransactionSchema._schema.name)
				.sorted("timeStamp", true)
				.slice(0, 5);

			setLatestTransactions(
				Array.from(allTransactions).map(tx => ({...JSON.parse(JSON.stringify(tx)), ...map[tx.hash], compact: true})),
			);
		}
		fetchAll();
	}, []);

	const renderEmptyContent = ({section}: {section: any}) => {
		if (section.data.length < 1) {
			return <EmptySectionComponent text="Nothing to see here" />;
		}
		return null;
	};

	const onFabSelect = (name?: string) => {
		if (!name) return;
		switch (name) {
			case "fab_manual":
				navigation.navigate("AddWalletModal");
				break;
			case "fab_scan":
				navigation.navigate("QRCodeScannerModal");
				break;
			default:
				navigation.navigate("TransactionsHistory", {
					type: "bnb",
					address: "0x95A27240aA0aA3Dee9CE39d9dE3D17FB5CfC9bB3",
				});
		}
	};

	return (
		<>
			<CollapsibleHeaderSectionList
				style={styles.listContainer}
				contentContainerStyle={styles.listContent}
				CollapsibleHeaderComponent={<BigHeader text="Home" />}
				headerHeight={140}
				statusBarHeight={getStatusBarHeight()}
				headerContainerBackgroundColor={"white"}
				renderSectionHeader={({section: {title}}) => <SectionHeader>{title}</SectionHeader>}
				renderSectionFooter={renderEmptyContent}
				sections={[
					{
						title: "Latest Transactions",
						data: latestTransactions,
						renderItem: ({item}: {item: CustomTransaction}) => <TransactionItem key={item.hash} tx={item} />,
						keyExtractor: (item, index) => `${index}`,
					},
					{
						title: "Wallets",
						data: wallets,
						renderItem: ({item}) => <WalletSectionItem wallet={item as unknown as IWallet} />,
						keyExtractor: (item, index) => `${index}`,
					},
				]}
			/>
			<FloatingAction actions={FAB_ACTIONS} onPressItem={onFabSelect} />
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
