import { useState, useEffect } from "react";

import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { isBase64 } from "multiform-validator";

import base64 from "react-native-base64";

import * as Clipboard from "expo-clipboard";

import * as Linking from "expo-linking";

import Checkbox from "expo-checkbox";

import { useTranslation } from "react-i18next";

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";

import ChangeLangModal from "./ChangeLandModal";

export default function Base64() {
	const { t } = useTranslation();

	const [inputText, setInputText] = useState("");

	const [considerSpace, setConsiderSpace] = useState(false);

	const [modalChangeLang, setModalChangeLang] = useState(false);

	const encodeToBase64 = () => {
		if (minimunValidation()) {
			let encoded: string;
			if (considerSpace) {
				encoded = base64.encode(`${inputText}\n`);
			} else {
				encoded = base64.encode(inputText);
			}

			setInputText(encoded);
		} else {
			Alert.alert(t("Erro"), t("It's too big"));
		}
	};

	function minimunValidation() {
		if (inputText.length > 25000) {
			return false;
		} else {
			return true;
		}
	}

	const decodeFromBase64 = () => {
		if (minimunValidation()) {
			const base64TextTrim = inputText.trim();
			if (base64TextTrim.length > 0) {
				// Check if the trimmed string is not empty
				if (isBase64(base64TextTrim)) {
					const decoded = base64.decode(base64TextTrim);
					setInputText(decoded);
				} else {
					Alert.alert(t("Erro"), t("O texo não é um codigo base64 valido"));
				}
			} else {
				Alert.alert(t("Erro"), t("O valor de entrada não deve ser uma string vazia"));
			}
		} else {
			Alert.alert(t("Erro"), t("It's too big"));
		}
	};

	const copyToClipboard = async () => {
		if (inputText) {
			await Clipboard.setStringAsync(inputText);
		}
	};

	const cutToClipboard = async () => {
		if (inputText) {
			await Clipboard.setStringAsync(inputText);
			cleanToClipboard();
		}
	};

	const pasteToClipboard = async () => {
		const text = await Clipboard.getStringAsync();
		setInputText((prevText) => prevText + text);
	};

	const cleanToClipboard = () => setInputText("");

	useEffect(() => {
		(async () => {
			const considerSpace = await AsyncStorage.getItem("considerSpaceAfterGenerate");
			if (considerSpace) {
				setConsiderSpace(JSON.parse(considerSpace));
			}
		})();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.languageContainer}>
				<TouchableOpacity style={styles.languageButton} onPress={() => setModalChangeLang(true)}>
					<Text style={styles.languageButtonText}>{t("Mudar idioma")}</Text>
				</TouchableOpacity>
			</View>
			<ChangeLangModal modalChangeLang={modalChangeLang} setModalChangeLang={setModalChangeLang} />
			<Text style={styles.title}>{t("Base 64")}</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={encodeToBase64}>
					<Text style={styles.buttonContainerText}>{t("Criptografar")}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={decodeFromBase64}>
					<Text style={styles.buttonContainerText}>{t("Descriptografar")}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					multiline
					style={styles.input}
					placeholder={t("Digite algo ou cole aqui o código")}
					value={inputText}
					onChangeText={(text) => setInputText(text)}
					maxLength={25000}
				/>
			</View>
			<View style={styles.charCountContainer}>
				<Text style={{ color: inputText.length > 25000 ? "red" : "black" }}>
					{inputText.length}
					<Text style={styles.charCountText}> {t("Caracteres")}</Text>
				</Text>
			</View>
			<View style={styles.actionContainer}>
				<TouchableOpacity style={styles.actionButton} onPress={cutToClipboard}>
					<Text style={styles.actionButtonText}>{t("Recortar")}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton} onPress={copyToClipboard}>
					<Text style={styles.actionButtonText}>{t("Copiar")}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton} onPress={pasteToClipboard}>
					<Text style={styles.actionButtonText}>{t("Colar")}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton} onPress={cleanToClipboard}>
					<Text style={styles.actionButtonText}>{t("Limpar")}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.divCheckBox}>
				<View style={styles.row}>
					<Text style={styles.text}>{t("Considerar espaço ?")}</Text>
					<Checkbox
						value={considerSpace}
						onValueChange={async (value) => {
							await AsyncStorage.setItem("considerSpaceAfterGenerate", JSON.stringify(value));
							setConsiderSpace(value);
						}}
					/>
				</View>
			</View>
			<View style={styles.footer}>
				<View style={styles.helpContainer}>
					<Text style={styles.helpText}>{t("Ajude o dev")}</Text>
					<TouchableOpacity
						style={styles.coffeeButton}
						onPress={() => {
							Linking.openURL("https://www.buymeacoffee.com/gabriellogan");
						}}
					>
						<Text style={styles.coffeeButtonText}>{t("Buy me a coffee")}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
