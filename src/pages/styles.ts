import { StyleSheet } from 'react-native';

import { RFValue } from '../Responsive';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: RFValue(20),
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: RFValue(24),
		fontWeight: 'bold',
		marginBottom: RFValue(20),
	},
	buttonContainer: {
		flexDirection: 'row',
		marginBottom: RFValue(20),
	},
	buttonContainerText: {
		fontSize: RFValue(14),
	},
	button: {
		flex: 1,
		alignItems: 'center',
		padding: RFValue(10),
		margin: RFValue(5),
		backgroundColor: '#3498db',
		borderRadius: 4,
	},
	inputContainer: {
		width: '100%',
		marginBottom: RFValue(10),
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: RFValue(10),
		height: RFValue(230),
		textAlignVertical: 'top',
		backgroundColor: '#f8f8f8',
		elevation: 1,
		fontSize: RFValue(16),
	},
	charCountContainer: {
		marginBottom: RFValue(10),
	},
	charCountText: {
		color: 'gray',
	},
	actionContainer: {
		flexDirection: 'row',
		marginBottom: RFValue(20),
	},
	actionButton: {
		alignItems: 'center',
		padding: RFValue(10),
		margin: 5,
		backgroundColor: '#27ae60',
		width: RFValue(90),
		borderRadius: 4,
	},
	actionButtonText: {
		fontSize: RFValue(13),
	},
	languageContainer: {
		flex: 1,
		top: RFValue(35),
		alignSelf: 'flex-end',
	},
	languageButton: {
		backgroundColor: '#e74c3c',
		padding: RFValue(10),
		borderRadius: 4,
	},
	languageButtonText: {
		fontSize: RFValue(14),
	},
	footer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	helpContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: RFValue(20),
	},
	helpText: {
		fontSize: RFValue(16),
		fontWeight: 'bold',
		marginRight: RFValue(10),
	},
	coffeeButton: {
		backgroundColor: '#FFA500', // Cor de laranja (você pode alterar para sua cor preferida)
		padding: RFValue(10),
		borderRadius: 5,
	},
	coffeeButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: RFValue(14),
	},
	divCheckBox: {},
	row: {
		flexDirection: 'row', // Define o layout em linha (row) para os elementos filhos
		alignItems: 'center', // Centraliza verticalmente os elementos dentro de cada linha
		marginRight: RFValue(10), // Espaço entre as linhas (você pode ajustar conforme necessário)
		marginTop: RFValue(5),
	},
	text: {
		marginRight: RFValue(5), // Espaço entre o texto e o Checkbox (você pode ajustar conforme necessário)
		fontSize: RFValue(14),
	},
});

export default styles;
