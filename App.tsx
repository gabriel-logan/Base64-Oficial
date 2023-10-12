import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/Routes';

import './src/utils/translations/i18n';

export default function App() {
	return (
		<NavigationContainer>
			<Routes />
		</NavigationContainer>
	);
}
