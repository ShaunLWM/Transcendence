import {useNavigation} from "@react-navigation/native";
import React from "react";
import {Dimensions} from "react-native";
import {BarCodeReadEvent} from "react-native-camera";
import QRCodeScanner from "react-native-qrcode-scanner";

export default function QRCodeScannerModal() {
	const {width, height} = Dimensions.get("window");
	const navigation = useNavigation();

	const onSuccess = (e: BarCodeReadEvent) => {
		navigation.navigate("AddWalletModal", {address: e.data});
	};

	return <QRCodeScanner onRead={onSuccess} cameraStyle={{height, width}} />;
}
