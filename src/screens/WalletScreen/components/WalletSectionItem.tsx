import React from "react";
import styled from "styled-components/native";
import {IWallet} from "../../../models/WalletSchema";
import {getWalletIcon} from "../../../utils/Helper";

const Container = styled.View`
	display: flex;
	flex-direction: row;
	background-color: #f1f1f1;
	border-radius: 4px;
	padding: 6px 0px;
	align-items: center;
`;

const Logo = styled.Image`
	height: 16px;
	width: 16px;
`;

const Panel = styled.View`
	justify-content: space-evenly;
`;

const Name = styled.Text`
	font-weight: bold;
	font-size: 20;
`;

const Address = styled.Text`
	font-size: 16;
`;

interface Props {
	wallet: IWallet;
}

export default function WalletSectionItem({wallet}: Props) {
	return (
		<Container>
			<Logo source={getWalletIcon(wallet.type)} />
			<Panel>
				<Name>{wallet.name}</Name>
				<Address allowFontScaling numberOfLines={1}>
					{wallet.address}
				</Address>
			</Panel>
		</Container>
	);
}
