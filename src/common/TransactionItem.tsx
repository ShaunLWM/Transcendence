import BigNumber from "bignumber.js";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components/native";
import {CustomTransaction} from "../screens/WalletScreen";
import {RootState} from "../store/index";
import {fromNow} from "../utils/Helper";
import TextChip from "./TextChip";

const HugeNumber = new BigNumber(1e18);

interface ContainerProps {
	$compact?: boolean;
}

const Container = styled.Pressable<ContainerProps>`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	background-color: #ebebeb;
	height: ${props => (props.$compact ? "54px" : "78px")};
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
	display: flex;
	justify-content: space-evenly;
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

const WalletNameText = styled.Text`
	font-weight: bold;
	margin-left: 6px;
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

const TotalPrice = styled.Text`
	text-align: right;
`;

interface Props {
	tx: CustomTransaction;
	onPress?: (tx: CustomTransaction) => void;
}

interface TransformedTransactionItem extends CustomTransaction {
	amountToken: string;
	gasToken: string;
	amountUsd: string;
	gasUsd: string;
	totalUsd: string;
}

export default function TransactionItem({tx, onPress}: Props) {
	const prices = useSelector((state: RootState) => state.coingecko.prices);
	const [item, setItem] = useState<TransformedTransactionItem>();

	useEffect(() => {
		const gwei = new BigNumber(tx.gasPrice).dividedBy(HugeNumber);
		const amountToken = new BigNumber(tx.value).dividedBy(HugeNumber);
		const gasToken = new BigNumber(tx.gasUsed).multipliedBy(gwei);
		const amountUsd = amountToken.multipliedBy(prices.bnb);
		const gasUsd = gasToken.multipliedBy(prices.bnb);
		setItem(
			Object.assign({}, tx, {
				amountToken: amountToken.toString(10),
				gasToken: gasToken.toString(10),
				amountUsd: amountUsd.toFixed(2),
				gasUsd: gasUsd.toFixed(2),
				totalUsd: `${tx.outgoing ? "-" : "+"}$${amountUsd.plus(gasUsd).toFixed(2)}`,
			}),
		);
	}, [prices.bnb, tx]);

	const detectTransactionDirection = useMemo(() => {
		return tx.outgoing ? "outgoing" : "incoming";
	}, [tx.outgoing]);

	const chipColor = useMemo(
		() => (detectTransactionDirection === "incoming" ? "#bdb0d0" : "#6cc7f2"),
		[detectTransactionDirection],
	);

	const successChip = useMemo(() => {
		return tx.isError === "0" ? "success" : "failed";
	}, [tx.isError]);

	const sucessColor = useMemo(() => (tx.isError === "0" ? "#77dd77" : "#ff6961"), [tx.isError]);

	return (
		<Container $compact={tx.compact} onPress={() => onPress && onPress(tx)}>
			<RowContainer $flex={1}>
				<ChipsContainer>
					<TextChip text={detectTransactionDirection} color={chipColor} />
					<TextChip text={successChip} color={sucessColor} style={{marginLeft: 4}} />
					<WalletNameText>{tx.name}</WalletNameText>
				</ChipsContainer>
				{!tx.compact && <BlockNoText numberOfLines={1}>Block: {tx.blockNumber}</BlockNoText>}
				<TransactionAgo numberOfLines={1}>{fromNow(tx.timeStamp * 1000)}</TransactionAgo>
			</RowContainer>
			<RowContainer $flex={2}>
				<AmountText numberOfLines={1} adjustsFontSizeToFit>
					{item?.amountToken} BNB
				</AmountText>
				<GasUsed numberOfLines={1}>{item?.gasToken} BNB</GasUsed>
				{!tx.compact && <TotalPrice>{item?.totalUsd}</TotalPrice>}
			</RowContainer>
		</Container>
	);
}
