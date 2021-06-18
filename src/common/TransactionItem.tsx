import BigNumber from "bignumber.js";
import React, {useMemo} from "react";
import styled from "styled-components/native";
import {fromNow} from "../utils/Helper";
import TextChip from "./TextChip";

const HugeNumber = new BigNumber(1e18);

const Container = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	background-color: #ebebeb;
	height: 78px;
	align-items: center;
	margin-bottom: 8px;
	border-radius: 4px;
	padding-left: 6px;
	padding-right: 6px;
`;

const ChipsContainer = styled.View`
	display: flex;
	flex-direction: row;
`;

interface HasFlexProps {
	$flex?: number;
}

const RowContainer = styled.View<HasFlexProps>`
	background-color: blue;
	display: flex;
	justify-content: center;
	${({$flex}) =>
		$flex &&
		`
    flex: ${$flex};
  `}
`;

const BlockNoText = styled.Text`
	/* background-color: blue; */
	color: black;
	font-size: 14px;
`;

const TransactionAgo = styled.Text`
	/* background-color: yellow; */
	font-size: 12px;
`;

const AmountText = styled.Text`
	text-align: right;
	/* background-color: pink; */
	font-size: 20px;
	font-weight: bold;
`;

const GasUsed = styled.Text`
	text-align: right;
`;

interface Props extends BSCTransaction {
	walletAddress: string;
}

export default function TransactionItem({
	value,
	blockNumber,
	from,
	timeStamp,
	walletAddress,
	gasPrice,
	isError,
}: Props) {
	const detectTransactionDirection = useMemo(() => {
		return walletAddress === from ? "outgoing" : "incoming";
	}, [from, walletAddress]);

	const chipColor = useMemo(
		() => (detectTransactionDirection === "incoming" ? "#14a85e" : "#a81441"),
		[detectTransactionDirection],
	);

	const successChip = useMemo(() => {
		return isError === "0" ? "success" : "failed";
	}, [isError]);

	const sucessColor = useMemo(
		() => (isError === "0" ? "#14a85e" : "#a81441"),
		[isError],
	);

	return (
		<Container>
			<RowContainer $flex={1}>
				<ChipsContainer>
					<TextChip text={detectTransactionDirection} color={chipColor} />
					<TextChip
						text={successChip}
						color={sucessColor}
						style={{marginLeft: 4}}
					/>
				</ChipsContainer>
				<BlockNoText numberOfLines={1}>Block: {blockNumber}</BlockNoText>
				<TransactionAgo numberOfLines={1}>
					{fromNow(parseInt(timeStamp, 10) * 1000)}
				</TransactionAgo>
			</RowContainer>
			<RowContainer $flex={2}>
				<AmountText numberOfLines={1} adjustsFontSizeToFit>
					{new BigNumber(value).dividedBy(HugeNumber).toString(10)} BNB ($100)
				</AmountText>
				<GasUsed numberOfLines={1}>
					{new BigNumber(gasPrice).dividedBy(HugeNumber).toString(10)} BNB
				</GasUsed>
			</RowContainer>
		</Container>
	);
}
