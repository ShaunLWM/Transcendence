import {useNavigation} from "@react-navigation/native";
import React from "react";
import {Text} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

export default function QRCodeScannerModal() {
	const navigation = useNavigation();

	const onSuccess = () => {
		navigation.navigate("AddWalletModal");
	};

	return <QRCodeScanner onRead={onSuccess} topContent={<Text>Scan your Wallet QR Code</Text>} />;
}
