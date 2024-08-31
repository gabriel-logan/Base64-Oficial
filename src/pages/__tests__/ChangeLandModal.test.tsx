import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ChangeLangModal from "../ChangeLandModal";

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

describe("ChangeLandModal", () => {
	it("should render correctly", () => {
		const { getByTestId, getByText } = render(
			<ChangeLangModal modalChangeLang={true} setModalChangeLang={jest.fn()} />,
		);

		expect(getByTestId("modal-change-lang")).toBeTruthy();
		expect(getByText(/Mudar idioma/)).toBeTruthy();
	});

	it("should render klingon language independently", () => {
		const { getByText } = render(
			<ChangeLangModal modalChangeLang={true} setModalChangeLang={jest.fn()} />,
		);

		expect(getByText(/Klingon/)).toBeTruthy();
	});

	it("should render all languages", () => {
		const { getByText } = render(
			<ChangeLangModal modalChangeLang={true} setModalChangeLang={jest.fn()} />,
		);

		Object.values(languageMappings).forEach((language) => {
			expect(getByText(language)).toBeTruthy();
		});
	});

	it("should close modal when background is clicked", async () => {
		const setModalChangeLang = jest.fn();
		const { getByTestId } = render(
			<ChangeLangModal modalChangeLang={true} setModalChangeLang={setModalChangeLang} />,
		);

		const background = getByTestId("modal-background");
		const modal = getByTestId("modal-change-lang");

		fireEvent.press(background);

		expect(setModalChangeLang).toHaveBeenCalledWith(false);

		modal.props.onRequestClose();
	});

	it("should change language when a language is clicked", () => {
		const setModalChangeLang = jest.fn();
		const { getByTestId } = render(
			<ChangeLangModal modalChangeLang={true} setModalChangeLang={setModalChangeLang} />,
		);

		const newArrayOfLanguages = [...Object.keys(languageMappings), "klingon"];

		newArrayOfLanguages.forEach((languageCode) => {
			const languageButton = getByTestId(`language-button-${languageCode}`);

			fireEvent.press(languageButton);
		});

		expect(setModalChangeLang).toHaveBeenCalledTimes(newArrayOfLanguages.length - 1);
	});
});
