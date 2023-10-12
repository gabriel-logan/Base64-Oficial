import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { isBase64 } from 'multiform-validator';
import base64 from 'react-native-base64';

import * as Clipboard from 'expo-clipboard';
import Checkbox from 'expo-checkbox';

import { useTranslation } from 'react-i18next';

export default function Base64() {
	const { t } = useTranslation();

	const [charCount, setCharCount] = useState(0);

	const [inputText, setInputText] = useState('');
	const [base64Text, setBase64Text] = useState('');
	const [cleanAlways, setCleanAlways] = useState(false);
	const [considerSpace, setConsiderSpace] = useState(false);

	const encodeToBase64 = () => {
		let encoded: string;
		if (considerSpace) {
			encoded = base64.encode(`${inputText}\n`);
		} else {
			encoded = base64.encode(inputText);
		}
		setBase64Text(encoded);
		if (cleanAlways) {
			setInputText('');
		}
	};

	const decodeFromBase64 = () => {
		const base64TextTrim = base64Text.trim();
		if (base64TextTrim.length > 0) {
			// Check if the trimmed string is not empty
			if (isBase64(base64TextTrim)) {
				const decoded = base64.decode(base64TextTrim);
				setInputText(decoded);
				if (cleanAlways) {
					setBase64Text('');
				}
			} else {
				Alert.alert(t('Erro'), t('O texo não é um codigo base64 valido'));
			}
		} else {
			Alert.alert(t('Erro'), t('O valor de entrada não deve ser uma string vazia'));
		}
	};

	const copyToClipboard = async () => {
		if (textToCopy) {
			await Clipboard.setStringAsync(textToCopy);
		}
	};

	const cutToClipboard = async () => {
		if (textToCopy) {
			await Clipboard.setStringAsync(textToCopy);
			cleanToClipboard(whichOne);
		}
	};

	const pasteToClipboard = async () => {
		const text = await Clipboard.getStringAsync();
		if (whichOne === 'text') {
			setInputText(text);
		} else {
			setBase64Text(text);
		}
	};

	const cleanToClipboard = () => {
		if (whichOne === 'text') {
			setInputText('');
		} else {
			setBase64Text('');
		}
	};

	useEffect(() => {
		(async () => {
			const base64AlwaysClean = await AsyncStorage.getItem('base64AlwaysCleanAfterGenerate');
			if (base64AlwaysClean) {
				setCleanAlways(JSON.parse(base64AlwaysClean));
			}
			const considerSpace = await AsyncStorage.getItem('considerSpaceAfterGenerate');
			if (considerSpace) {
				setConsiderSpace(JSON.parse(considerSpace));
			}
		})();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.languageContainer}>
				<TouchableOpacity style={styles.languageButton}>
					<Text>{t('Mudar idioma')}</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.title}>{t('Base 64')}</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button}>
					<Text>{t('Criptografar')}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text>{t('Descriptografar')}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.inputContainer}>
				<TextInput style={styles.input} placeholder={t('Digite algo ou cole aqui o código')} />
			</View>
			<View style={styles.charCountContainer}>
				<Text>
					{charCount}
					<Text style={styles.charCountText}> {t('Caracteres')}</Text>
				</Text>
			</View>
			<View style={styles.actionContainer}>
				<TouchableOpacity style={styles.actionButton}>
					<Text>{t('Recortar')}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton}>
					<Text>{t('Copiar')}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton}>
					<Text>{t('Colar')}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton}>
					<Text>{t('Limpar')}</Text>
				</TouchableOpacity>
			</View>
			<View>
				<Text>{t('Ajude o dev')}</Text>
				<TouchableOpacity>
					<Text>{t('Buy me a coffee')}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
		margin: 5,
		backgroundColor: '#3498db',
	},
	inputContainer: {
		width: '100%',
		marginBottom: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 10,
	},
	charCountContainer: {
		marginBottom: 10,
	},
	charCountText: {
		color: 'gray',
	},
	actionContainer: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	actionButton: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
		margin: 5,
		backgroundColor: '#27ae60',
	},
	languageContainer: {
		position: 'absolute',
		top: 50,
		right: 35,
	},
	languageButton: {
		backgroundColor: '#e74c3c',
		padding: 10,
	},
});
