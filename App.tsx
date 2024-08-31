import Base64 from "./src/pages/Base64";

import "./src/utils/translations/i18n";

import { StatusBar } from "expo-status-bar";

export default function App() {
	return (
		<>
			<Base64 />
			<StatusBar backgroundColor="black" style={"light"} />
		</>
	);
}
