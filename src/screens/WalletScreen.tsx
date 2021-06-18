import React from "react";
import {CollapsibleHeaderSectionList} from "react-native-collapsible-header-views";
import {getStatusBarHeight} from "react-native-status-bar-height";
import BigHeader from "../common/BigHeader";

export default function WalletScreen() {
	return (
		<CollapsibleHeaderSectionList
			CollapsibleHeaderComponent={<BigHeader text="Wallet" />}
			headerHeight={100}
			statusBarHeight={getStatusBarHeight()}
			headerContainerBackgroundColor={"green"}
			data={data}
			renderItem={Item}
			ItemSeparatorComponent={Separator}
			keyExtractor={keyExtractor}
			sections={["Latest", "Addresses"]}
		/>
	);
}
