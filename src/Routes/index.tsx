import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Base64 from "../pages/Base64";

const Stack = createNativeStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Base64" component={Base64} />
		</Stack.Navigator>
	);
}
