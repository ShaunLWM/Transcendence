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
import {ITransaction} from "../../models/TransactionSchema";
import {IWallet} from "../../models/WalletSchema";
import {get} from "../../utils/FetchManager";
import {generateTransactionApi, getRealm} from "../../utils/Helper";
import WalletSectionItem from "./components/WalletSectionItem";

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

export default function WalletScreen() {
	const navigation = useNavigation();
	const [wallets, setWallets] = useState<IWallet[]>([]);
	const [latestTransactions, setLatestTransactions] = useState<ITransaction[]>([]);

	useEffect(() => {
		async function fetchAll() {
			const realm = await getRealm();
			const addresses = realm.objects<IWallet>("WalletItem");
			if (addresses.length < 1) return console.log(`No addresses`);
			setWallets(addresses.map(address => ({...address})));
			const results = await Promise.allSettled(
				addresses.map(address => get<TransactionAPIResult>(generateTransactionApi(address.type, address.address, 1))),
			);
			for (const result of results) {
				if (result.status === "rejected" || result.value.message === "NOTOK") continue;
				realm.write(() => {
					(result.value.result as BSCTransaction[]).map(tx => {
						realm.create<ITransaction>("TransactionItem", {...tx}, UpdateMode.Modified);
					});
				});
			}

			const allTransactions = realm.objects<IWallet>("WalletItem");
			setLatestTransactions(
				allTransactions.sorted("timeStamp", true).map(tx => {
					return {
						...tx,
					};
				}),
			);
		}
		fetchAll();
	}, []);

	const renderEmptyContent = ({section}) => {
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
						renderItem: ({item}) => <Text style={{fontSize: 20}}>{item}</Text>,
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
