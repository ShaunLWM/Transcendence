import React from "react";
import styled from "styled-components/native";
import {IWallet} from "../../../models/WalletSchema";
import {getWalletIcon} from "../../../utils/Helper";

const Container = styled.View`
	display: flex;
	flex-direction: row;
`;

const Logo = styled.Image`
	height: 16px;
	width: 16px;
`;

const Panel = styled.View``;

const Name = styled.Text``;

const Address = styled.Text``;

interface Props {
	wallet: IWallet;
}

export default function WalletSectionItem({wallet}: Props) {
	return (
		<Container>
			<Logo source={getWalletIcon(wallet.type)} />
			<Panel>
				<Name>{wallet.name}</Name>
				<Address>{wallet.address}</Address>
			</Panel>
		</Container>
	);
}
