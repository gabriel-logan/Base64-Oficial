import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
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
		height: 230,
		textAlignVertical: 'top',
		backgroundColor: '#f8f8f8',
		elevation: 1,
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
		flex: 1,
		top: 35,
		alignSelf: 'flex-end',
	},
	languageButton: {
		backgroundColor: '#e74c3c',
		padding: 10,
	},
	footer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	helpContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	helpText: {
		fontSize: 16,
		fontWeight: 'bold',
		marginRight: 10,
	},
	coffeeButton: {
		backgroundColor: '#FFA500', // Cor de laranja (você pode alterar para sua cor preferida)
		padding: 10,
		borderRadius: 5,
	},
	coffeeButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	divCheckBox: {},
	row: {
		flexDirection: 'row', // Define o layout em linha (row) para os elementos filhos
		alignItems: 'center', // Centraliza verticalmente os elementos dentro de cada linha
		marginRight: 10, // Espaço entre as linhas (você pode ajustar conforme necessário)
		marginTop: 5,
	},
	text: {
		marginRight: 5, // Espaço entre o texto e o Checkbox (você pode ajustar conforme necessário)
	},
});

export default styles;
