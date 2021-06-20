import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
	height: 120px;
	background-color: #ececec;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
`;

const EmptyText = styled.Text`
	font-size: 16px;
`;

interface Props {
	text: string;
}

export default function EmptySectionComponent({text}: Props) {
	return (
		<Container>
			<EmptyText>{text}</EmptyText>
		</Container>
	);
}
