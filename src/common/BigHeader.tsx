import React from "react";
import styled from "styled-components/native";
import {getStatusBarHeight} from "react-native-status-bar-height";

const Container = styled.View`
	padding-left: 12px;
	height: 100%;
	justify-content: space-evenly;
	padding-bottom: ${getStatusBarHeight()}px;
`;

const Title = styled.Text`
	font-size: 48px;
	font-weight: bold;
	color: #1d1d1d;
`;

const BackButtonPressable = styled.Pressable`
	height: 28px;
`;

const EmptyView = styled.View`
	height: 28px;
`;

const BackButtonImage = styled.Image`
	height: 16px;
	width: 16px;
`;

const TitleContainer = styled.View`
	flex: 2;
	justify-content: center;
`;

interface Props {
	text: string;
	onBackPress?: () => void;
}

export default function BigHeader({text, onBackPress}: Props) {
	return (
		<Container>
			{onBackPress ? (
				<BackButtonPressable onPress={() => onBackPress?.()}>
					<BackButtonImage source={require("../assets/misc/back.png")} />
				</BackButtonPressable>
			) : (
				<EmptyView />
			)}
			<TitleContainer>
				<Title>{text}</Title>
			</TitleContainer>
		</Container>
	);
}
