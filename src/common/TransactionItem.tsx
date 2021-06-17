import BigNumber from "bignumber.js";
import React from "react";
import {View} from "react-native";
import styled from "styled-components/native";
import {fromNow} from "../utils/Helper";

const Container = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	background-color: #ebebeb;
	height: 52px;
	align-items: center;
	margin-bottom: 8px;
	border-radius: 4px;
`;

const TwoRowContainer = styled.View`
	display: flex;
	flex: 1;
`;

const FromText = styled.Text``;

const ToText = styled.Text``;

const TransactionAgo = styled.Text``;

const BlockNoText = styled.Text`
	text-align: center;
`;

const AmountText = styled.Text`
	flex: 2;
	text-align: center;
`;

interface Props extends BSCTransaction {}

export default function TransactionItem({
	hash,
	value,
	txreceipt_status,
	blockNumber,
	from,
	to,
	timeStamp,
}: Props) {
	return (
		<Container>
			<TwoRowContainer>
				<BlockNoText numberOfLines={1}>{blockNumber}</BlockNoText>
				<TransactionAgo numberOfLines={1}>
					{fromNow(parseInt(timeStamp) * 1000)}
				</TransactionAgo>
			</TwoRowContainer>
			{/* <TwoRowContainer>
				<FromText numberOfLines={1}>{from}</FromText>
				<ToText numberOfLines={1}>{to}</ToText>
			</TwoRowContainer> */}
			<AmountText numberOfLines={1}>
				{new BigNumber(value).dividedBy(1000000000000000000).toString()}
			</AmountText>
		</Container>
	);
}
