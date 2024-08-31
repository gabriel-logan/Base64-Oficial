import { render } from "@testing-library/react-native";
import App from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../src/utils/translations/i18n";

describe("App", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		AsyncStorage.clear();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	it("should render correctly", () => {
		render(<App />);

		expect(true).toBeTruthy();
	});

	describe("i18n", () => {
		it("should throw an error if no locales are found", () => {
			jest.resetModules();

			jest.mock("expo-localization", () => ({
				getLocales: jest.fn(),
			}));

			expect(() => {
				require("../src/utils/translations/i18n");
			}).toThrow("No locales found");
		});

		const resources = {
			en: {},
			ru: {},
			ptBR: {},
			sk: {},
			sl: {},
			srLatn: {},
			sr: {},
			sv: {},
			sw: {},
			th: {},
			tr: {},
			uk: {},
			ur: {},
			vi: {},
			zh: {},
			zhHans: {},
			zhHant: {},
			klingon: {},
		};

		it("should return languageWithoutHyphen if it exists in resources", () => {
			const languageWithoutHyphen = "ptBR";

			const languageCode = "pt";

			const result = Object.keys(resources).includes(languageWithoutHyphen)
				? languageWithoutHyphen
				: languageCode !== null && Object.keys(resources).includes(languageCode)
					? languageCode
					: "en";

			expect(result).toBe(languageWithoutHyphen);
		});

		it('should return "en" if languageWithoutHyphen does not exist in resources and languageCode is null', () => {
			const languageWithoutHyphen = "nonexistent";
			const languageCode = null;

			const result = Object.keys(resources).includes(languageWithoutHyphen)
				? languageWithoutHyphen
				: languageCode !== null && Object.keys(resources).includes(languageCode)
					? languageCode
					: "en";

			expect(result).toBe("en");
		});

		it("should return languageCode if languageWithoutHyphen does not exist in resources but languageCode does", () => {
			const languageWithoutHyphen = "nonexistent";

			const languageCode = "ru";

			const result = Object.keys(resources).includes(languageWithoutHyphen)
				? languageWithoutHyphen
				: languageCode !== null && Object.keys(resources).includes(languageCode)
					? languageCode
					: "en";

			expect(result).toBe(languageCode);
		});

		it("should change language to stored language", async () => {
			const storedLanguage = "es"; // idioma armazenado simulado
			(AsyncStorage.getItem as jest.Mock).mockResolvedValue(storedLanguage);

			await (async () => {
				const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
				storedLanguage && i18n.changeLanguage(storedLanguage);
			})();

			expect(AsyncStorage.getItem).toHaveBeenCalledWith("selectedLanguage");
			expect(i18n.changeLanguage).toHaveBeenCalledWith(storedLanguage);
		});

		it("should not change language if no stored language", async () => {
			(AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

			await (async () => {
				const storedLanguage = await AsyncStorage.getItem("selectedLanguage");
				storedLanguage && i18n.changeLanguage(storedLanguage);
			})();

			expect(AsyncStorage.getItem).toHaveBeenCalledWith("selectedLanguage");
			expect(i18n.changeLanguage).not.toHaveBeenCalled();
		});
	});
});
