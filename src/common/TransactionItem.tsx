import BigNumber from "bignumber.js";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components/native";
import {RootState} from "../store/index";
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
	tx: BSCTransaction;
	walletAddress: string;
}

interface TransformedTransactionItem extends BSCTransaction {
	amountToken: string;
	gasToken: string;
	amountUsd: string;
	gasUsd: string;
	totalUsd: string;
}

export default function TransactionItem({tx, walletAddress}: Props) {
	const prices = useSelector((state: RootState) => state.coingecko.prices);
	const [item, setItem] = useState<TransformedTransactionItem>();

	useEffect(() => {
		const amountToken = new BigNumber(tx.value).dividedBy(HugeNumber);
		const gasToken = new BigNumber(tx.gasPrice).dividedBy(HugeNumber);
		const amountUsd = amountToken.multipliedBy(prices.bnb);
		const gasUsd = gasToken.multipliedBy(prices.bnb);
		setItem(
			Object.assign({}, tx, {
				amountToken: amountToken.toString(10),
				gasToken: gasToken.toString(10),
				amountUsd: amountUsd.toFixed(2),
				gasUsd: gasUsd.toFixed(2),
				totalUsd: `${walletAddress === tx.from ? "-" : "+"}$${amountUsd
					.plus(gasUsd)
					.toFixed(2)}`,
			}),
		);
	}, [prices.bnb, tx, walletAddress]);

	const detectTransactionDirection = useMemo(() => {
		return walletAddress === tx.from ? "outgoing" : "incoming";
	}, [tx.from, walletAddress]);

	const chipColor = useMemo(
		() => (detectTransactionDirection === "incoming" ? "#bdb0d0" : "#6cc7f2"),
		[detectTransactionDirection],
	);

	const successChip = useMemo(() => {
		return tx.isError === "0" ? "success" : "failed";
	}, [tx.isError]);

	const sucessColor = useMemo(
		() => (tx.isError === "0" ? "#77dd77" : "#ff6961"),
		[tx.isError],
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
				<BlockNoText numberOfLines={1}>Block: {tx.blockNumber}</BlockNoText>
				<TransactionAgo numberOfLines={1}>
					{fromNow(parseInt(tx.timeStamp, 10) * 1000)}
				</TransactionAgo>
			</RowContainer>
			<RowContainer $flex={2}>
				<AmountText numberOfLines={1} adjustsFontSizeToFit>
					{item?.amountToken} BNB
				</AmountText>
				<GasUsed numberOfLines={1}>{item?.gasToken} BNB</GasUsed>
				<TotalPrice>{item?.totalUsd}</TotalPrice>
			</RowContainer>
		</Container>
	);
}
