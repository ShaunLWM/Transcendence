import {StyleSheet, Text} from "react-native";
import {CollapsibleHeaderSectionList} from "react-native-collapsible-header-views";
import {FloatingAction} from "react-native-floating-action";
import {getStatusBarHeight} from "react-native-status-bar-height";
import BigHeader from "../common/BigHeader";

const FAB_ACTIONS = [
	{
		text: "Add Wallet Address",
		icon: require("../assets/misc/select.png"),
		name: "bt_accessibility",
		position: 2,
		color: "#E0BBE4",
	},
	{
		text: "Add QR Code",
		icon: require("../assets/misc/camera.png"),
		name: "bt_language",
		position: 1,
		color: "#957DAD",
	},
	{
		text: "Location",
		icon: require("../assets/misc/camera.png"),
		name: "bt_room",
		color: "#D291BC",
	},
];

export default function WalletScreen() {
	return (
		<>
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
			<FloatingAction
				actions={FAB_ACTIONS}
				onPressItem={name => {
					console.log(`selected button: ${name}`);
				}}
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
