import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
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

	const minimunValidation = () => inputText.length <= 25000;

	const encodeToBase64 = () => {
		if (!minimunValidation()) {
			Alert.alert(t("Erro"), t("It's too big"));
			return;
		}
		const encoded = base64.encode(considerSpace ? `${inputText}\n` : inputText);
		setInputText(encoded);
	};

	const decodeFromBase64 = () => {
		if (!minimunValidation()) {
			Alert.alert(t("Erro"), t("It's too big"));
			return;
		}
		const base64TextTrim = inputText.trim();
		if (!base64TextTrim) {
			Alert.alert(t("Erro"), t("O valor de entrada não deve ser uma string vazia"));
			return;
		}
		if (isBase64(base64TextTrim)) {
			setInputText(base64.decode(base64TextTrim));
		} else {
			Alert.alert(t("Erro"), t("O texo não é um codigo base64 valido"));
		}
	};

	const copyToClipboard = async () => {
		if (inputText) await Clipboard.setStringAsync(inputText);
	};

	const cutToClipboard = async () => {
		if (inputText) {
			await Clipboard.setStringAsync(inputText);
			setInputText("");
		}
	};

	const pasteToClipboard = async () => {
		const text = await Clipboard.getStringAsync();
		setInputText((prev) => prev + text);
	};

	useEffect(() => {
		(async () => {
			const saved = await AsyncStorage.getItem("considerSpaceAfterGenerate");
			if (saved) setConsiderSpace(JSON.parse(saved));
		})();
	}, []);

	return (
		<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
			{/* Idioma */}
			<View style={styles.languageContainer}>
				<TouchableOpacity
					testID="open-change-language-button"
					style={styles.languageButton}
					onPress={() => setModalChangeLang(true)}
				>
					<Text style={styles.languageButtonText}>{t("Mudar idioma")}</Text>
				</TouchableOpacity>
			</View>

			<ChangeLangModal modalChangeLang={modalChangeLang} setModalChangeLang={setModalChangeLang} />

			{/* Título */}
			<Text style={styles.title}>{t("Base 64")}</Text>

			{/* Botões Encode / Decode */}
			<View style={styles.sectionCard}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={encodeToBase64}>
						<Text style={styles.buttonText}>{t("Criptografar")}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={decodeFromBase64}>
						<Text style={styles.buttonText}>{t("Descriptografar")}</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Input */}
			<View style={styles.sectionCard}>
				<TextInput
					multiline
					style={styles.input}
					placeholder={t("Digite algo ou cole aqui o código")}
					value={inputText}
					onChangeText={setInputText}
					maxLength={25000}
				/>
				<Text style={[styles.charCount, { color: inputText.length > 25000 ? "red" : "#555" }]}>
					{inputText.length} {t("Caracteres")}
				</Text>
			</View>

			{/* Ações */}
			<View style={styles.sectionCard}>
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
					<TouchableOpacity style={styles.actionButton} onPress={() => setInputText("")}>
						<Text style={styles.actionButtonText}>{t("Limpar")}</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Checkbox */}
			<View style={styles.sectionCard}>
				<View style={styles.checkboxRow}>
					<Checkbox
						value={considerSpace}
						onValueChange={async (value) => {
							await AsyncStorage.setItem("considerSpaceAfterGenerate", JSON.stringify(value));
							setConsiderSpace(value);
						}}
					/>
					<Text style={styles.checkboxText}>{t("Considerar espaço ?")}</Text>
				</View>
			</View>

			{/* Footer */}
			<View style={styles.footer}>
				<Text style={styles.helpText}>{t("Ajude o dev")}</Text>
				<TouchableOpacity
					style={styles.coffeeButton}
					onPress={() => Linking.openURL("https://www.buymeacoffee.com/gabriellogan")}
				>
					<Text style={styles.coffeeButtonText}>{t("Buy me a coffee")}</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
