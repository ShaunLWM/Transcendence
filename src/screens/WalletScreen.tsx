import React from "react";
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
			CollapsibleHeaderComponent={<BigHeader text="Wallet" />}
			headerHeight={100}
			statusBarHeight={getStatusBarHeight()}
			<FloatingAction
				actions={FAB_ACTIONS}
				onPressItem={name => {
					console.log(`selected button: ${name}`);
				}}
			/>
		</>
	);
}
