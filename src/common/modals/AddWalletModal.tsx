import {Picker} from "@react-native-picker/picker";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import React, {useEffect, useMemo, useState} from "react";
import {Button} from "react-native";
import {OutlinedTextField} from "rn-material-ui-textfield";
import styled from "styled-components/native";
import {RootStackParamList} from "../..";
import {IWallet} from "../../models/WalletSchema";
import {PriceKey, PriceKeysValue} from "../../store/slices/CoinGecko";
import {getRealm, isValidAddress} from "../../utils/Helper";

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Content = styled.View`
	width: 80%;
`;

export default function AddWalletModal() {
	const navigation = useNavigation();
	const route = useRoute<RouteProp<RootStackParamList, "AddWalletModal">>();
	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");

	const [address, setAddress] = useState("");
	const [addressError, setAddressError] = useState("");

	const [selectedToken, setSelectedToken] = useState<PriceKey>("bnb");

	useEffect(() => {
		if (route.params.address) {
			setAddress(route.params.address);
		}
	}, [route.params.address]);

	const onSubmit = async () => {
		const realm = await getRealm();
		try {
			realm.write(() => {
				realm.create<IWallet>("WalletItem", {address, name, type: "bnb"});
				navigation.goBack();
			});
		} catch (err) {
			console.log(err);
		}
	};

	const onChangeAddress = (str: string) => {
		setAddress(str);
		// TODO: check db for duplicate address
		if (!isValidAddress("bnb", str) && str.length > 0) {
			setAddressError("Invalid address");
		} else {
			setAddressError("");
		}
	};

	const onChangeName = (str: string) => {
		setName(str);
		// TODO: check db for duplicate name
	};

	const submitDisabled = useMemo(() => {
		return !(name.length > 0 && address.length > 0 && addressError.length < 1 && nameError.length < 1);
	}, [address, addressError, name, nameError]);

	return (
		<Container>
			<Content>
				<OutlinedTextField label="Wallet Name" onChangeText={onChangeName} value={name} error={nameError} />
				<OutlinedTextField label="Address" onChangeText={onChangeAddress} value={address} error={addressError} />
				<Picker selectedValue={selectedToken} onValueChange={setSelectedToken}>
					{PriceKeysValue.map(v => (
						<Picker.Item key={v} label={v.toUpperCase()} value={v} />
					))}
				</Picker>
				<Button
					onPress={onSubmit}
					title="Add"
					color="#841584"
					accessibilityLabel="Add Wallet"
					disabled={submitDisabled}
				/>
			</Content>
		</Container>
	);
}
