import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/Routes';

import './src/utils/translations/i18n';

import { StatusBar } from 'expo-status-bar';

export default function App() {
	return (
		<NavigationContainer>
			<Routes />
			<StatusBar backgroundColor="black" style={'light'} />
		</NavigationContainer>
	);
}
