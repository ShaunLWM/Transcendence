import React from "react";
import {Pressable} from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
	padding-left: 12px;
	height: 100%;
	justify-content: center;
`;

const Title = styled.Text`
	font-size: 48px;
	font-weight: bold;
	color: #1d1d1d;
`;

const BackButtonImage = styled.Image`
	height: 16px;
	width: 16px;
`;

interface Props {
	text: string;
	onBackPress?: () => void;
}

export default function BigHeader({text, onBackPress}: Props) {
	return (
		<Container>
			{onBackPress && (
				<Pressable onPress={() => onBackPress?.()}>
					<BackButtonImage source={require("../assets/misc/back.png")} />
				</Pressable>
			)}
			<Title>{text}</Title>
		</Container>
	);
}
