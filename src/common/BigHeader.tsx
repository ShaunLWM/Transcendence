import React from "react";
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

interface Props {
	text: string;
}

export default function BigHeader({text}: Props) {
	return (
		<Container>
			<Title>{text}</Title>
		</Container>
	);
}
