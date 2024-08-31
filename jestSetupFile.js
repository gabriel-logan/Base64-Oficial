import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
// eslint-disable-next-line jest/no-mocks-import
import mockBackHandler from "react-native/Libraries/Utilities/__mocks__/BackHandler.js";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-i18next", () => ({
	// this mock makes sure any components using the translate hook can use it without a warning being shown
	useTranslation: () => {
		return {
			t: (str) => str,
			i18n: {
				changeLanguage: () => new Promise(() => {}),
			},
		};
	},
	initReactI18next: {
		type: "3rdParty",
		init: () => {},
	},
}));

jest.mock("react-native/Libraries/Utilities/BackHandler", () => mockBackHandler);
