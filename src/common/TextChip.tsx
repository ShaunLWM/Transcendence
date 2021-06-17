import React from "react";
import {ViewStyle} from "react-native";
import styled from "styled-components/native";

interface Props {
	text: string;
	color?: string;
	style?: ViewStyle;
}

interface ContainerProps {
	$color: string;
}

const Container = styled.View<ContainerProps>`
	background-color: ${props => props.$color};
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 24px;
	align-self: flex-start;
	padding: 2px 6px;
`;

const ChipText = styled.Text`
	text-transform: uppercase;
	text-align: center;
	color: white;
	font-weight: bold;
	font-size: 10px;
`;

export default function TextChip({text, color = "lime", style = {}}: Props) {
	return (
		<Container $color={color} style={[style]}>
			<ChipText>{text}</ChipText>
		</Container>
	);
}
