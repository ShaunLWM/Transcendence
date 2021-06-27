import {useNavigation} from "@react-navigation/native";
import React from "react";
import {Dimensions, Text} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

export default function QRCodeScannerModal() {
	const {width, height} = Dimensions.get("window");
	const navigation = useNavigation();

	const onSuccess = () => {
		navigation.navigate("AddWalletModal");
	};

	return <QRCodeScanner onRead={onSuccess} cameraStyle={{height, width}} />;
}
