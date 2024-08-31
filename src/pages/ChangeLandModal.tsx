import { Dispatch, SetStateAction } from "react";

import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useTranslation } from "react-i18next";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { RFValue } from "../Responsive";

interface ChangeLangModalProps {
	modalChangeLang: boolean;
	setModalChangeLang: Dispatch<SetStateAction<boolean>>;
}

export default function ChangeLangModal({
	modalChangeLang,
	setModalChangeLang,
}: ChangeLangModalProps) {
	const { i18n, t } = useTranslation();
	const changeLanguage = async (lang: string) => {
		await AsyncStorage.setItem("selectedLanguage", lang);
		i18n.changeLanguage(lang);
	};

	const languageMappings: Record<string, string> = {
		af: "Afrikaans",
		ar: "العربية",
		bg: "български",
		ca: "Català",
		cs: "Čeština",
		cy: "Cymraeg",
		da: "Dansk",
		de: "Deutsch",
		el: "Ελληνικά",
		en: "English",
		es: "Español",
		fa: "فارسی",
		fi: "Suomi",
		fr: "Français",
		he: "עברית",
		hi: "हिन्दी",
		hr: "Hrvatski",
		hu: "Magyar",
		id: "Bahasa Indonesia",
		is: "Íslenska",
		it: "Italiano",
		ja: "日本語",
		ko: "한국어",
		lt: "Lietuvių",
		lv: "Latviešu",
		ms: "Bahasa Melayu",
		mt: "Malti",
		nb: "Norsk (Bokmål)",
		nl: "Nederlands",
		pl: "Polski",
		ptBR: "Português (BR)",
		ptPT: "Português (PT)",
		ro: "Română",
		ru: "Русский",
		sk: "Slovenčina",
		sl: "Slovenščina",
		srLatn: "Srpski (Latinica)",
		sv: "Svenska",
		sw: "Kiswahili (Latin)",
		th: "ไทย",
		tr: "Türkçe",
		uk: "Українська",
		ur: "اردو",
		vi: "Tiếng Việt",
		zh: "中文",
		zhHans: "简体中文",
		zhHant: "繁體中文",
	};

	const languages: string[] = Object.keys(languageMappings);

	return (
		<Modal
			testID="modal-change-lang"
			visible={modalChangeLang}
			onRequestClose={() => setModalChangeLang(false)}
			transparent
		>
			<TouchableOpacity
				testID="modal-background"
				style={styles.modalContainer}
				onPress={() => setModalChangeLang(false)}
			>
				<ScrollView style={styles.scrollContainer}>
					<Text style={styles.languageButtonText}>{t("Mudar idioma")}</Text>
					{languages.map((languageCode) => (
						<TouchableOpacity
							testID={`language-button-${languageCode}`}
							style={styles.languageButton}
							onPress={() => {
								changeLanguage(languageCode);
								setModalChangeLang(false);
							}}
							key={languageCode}
						>
							<Text style={styles.languageText}>{languageMappings[languageCode]}</Text>
						</TouchableOpacity>
					))}
					<TouchableOpacity
						testID="language-button-klingon"
						style={[styles.languageButton, { marginBottom: 35 }]}
						onPress={() => changeLanguage("klingon")}
					>
						<Text style={styles.languageText}>{"Klingon"}</Text>
					</TouchableOpacity>
				</ScrollView>
			</TouchableOpacity>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Um fundo semi-transparente para o modal
	},
	scrollContainer: {
		width: "80%", // Largura do conteúdo do ScrollView
		backgroundColor: "white", // Cor de fundo do ScrollView
		borderRadius: 4,
		maxHeight: RFValue(450),
		padding: RFValue(20),
	},
	languageButton: {
		padding: RFValue(10),
		borderBottomWidth: 1,
		borderBottomColor: "#ccc", // Cor da linha separadora		borderWidth: 1,
	},
	languageText: {
		fontSize: RFValue(16),
		fontWeight: "bold",
	},
	languageButtonText: {
		fontSize: RFValue(20),
		fontWeight: "bold",
		marginBottom: RFValue(20),
	},
});
