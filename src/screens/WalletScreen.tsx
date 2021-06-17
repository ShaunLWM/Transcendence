import React from "react";
import {ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import BigHeader from "../common/BigHeader";
import styled from "styled-components/native";

const StyledScrollView = styled.ScrollView.attrs(() => ({
	contentContainerStyle: {
		paddingHorizontal: 12,
	},
}))``;

export default function WalletScreen() {
	return (
		<SafeAreaView>
			<StyledScrollView>
				<BigHeader text="Wallet" />
			</StyledScrollView>
		</SafeAreaView>
	);
}
