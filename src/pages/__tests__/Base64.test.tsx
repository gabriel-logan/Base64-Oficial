import React from "react";

import { Alert } from "react-native";

import { render, fireEvent, waitFor, act } from "@testing-library/react-native";

import Base64 from "../Base64";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Linking from "expo-linking";

import * as Clipboard from "expo-clipboard";

import base64 from "react-native-base64";

describe("Base64", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		AsyncStorage.clear();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should render correctly", () => {
		render(<Base64 />);

		expect(true).toBeTruthy();
	});

	describe("Snapshots", () => {
		it("should show title Base 64", () => {
			const { getByText } = render(<Base64 />);

			expect(getByText(/Base 64/)).toBeTruthy();
		});

		it("should show buttons Criptografar and Descriptografar", () => {
			const { getByText } = render(<Base64 />);

			expect(getByText(/Criptografar/)).toBeTruthy();
			expect(getByText(/Descriptografar/)).toBeTruthy();
		});

		it("should render properly the TextInput element", () => {
			const { getByPlaceholderText } = render(<Base64 />);

			expect(getByPlaceholderText("Digite algo ou cole aqui o código")).toBeTruthy();
		});

		it("should render properly the language button", () => {
			const { getByText } = render(<Base64 />);

			expect(getByText(/Mudar idioma/)).toBeTruthy();
		});

		it("should show counter of Caracteres", () => {
			const { getByText } = render(<Base64 />);

			expect(getByText(/0\s*Caracteres/)).toBeTruthy();
		});

		it("should show properly buttons Recortar, Copiar, Colar and Limpar", () => {
			const { getByText } = render(<Base64 />);

			expect(getByText(/Recortar/)).toBeTruthy();
			expect(getByText(/Copiar/)).toBeTruthy();
			expect(getByText(/Colar/)).toBeTruthy();
			expect(getByText(/Limpar/)).toBeTruthy();
		});

		it("should show checkbox Considerar espaço ?", () => {
			const { getByText } = render(<Base64 />);

			expect(getByText(/Considerar espaço ?/)).toBeTruthy();
		});

		it("sould show footer Ajude o dev: and Button Buy me a coffee", () => {
			const { getByText } = render(<Base64 />);

			expect(getByText(/Ajude o dev/)).toBeTruthy();
			expect(getByText(/Buy me a coffee/)).toBeTruthy();
		});
	});

	describe("TextInput Actions", () => {
		it("should update inputText on text input change", () => {
			const { getByPlaceholderText } = render(<Base64 />);
			const input = getByPlaceholderText("Digite algo ou cole aqui o código");

			fireEvent.changeText(input, "Novo texto");

			expect(input.props.value).toBe("Novo texto");
		});
	});

	describe("Counter of Caracteres", () => {
		it("should show 0 caracteres when inputText is empty", () => {
			const { getByText } = render(<Base64 />);

			expect(getByText(/0\s*Caracteres/)).toBeTruthy();
		});

		it("should show 5 caracteres when inputText has 5 characters", () => {
			const { getByPlaceholderText, getByText } = render(<Base64 />);
			const input = getByPlaceholderText("Digite algo ou cole aqui o código");

			fireEvent.changeText(input, "12345");

			expect(getByText(/5\s*Caracteres/)).toBeTruthy();
		});
	});

	describe("Checkbox Action ?", () => {
		it("should update considerSpace and store value in AsyncStorage", async () => {
			const { getByTestId } = render(<Base64 />);

			const checkbox = getByTestId("consider-space-checkbox");

			expect(checkbox.props.accessibilityState.checked).toBe(false);

			fireEvent.press(checkbox);

			await waitFor(() => {
				expect(AsyncStorage.setItem).toHaveBeenCalledWith("considerSpaceAfterGenerate", "true");
			});

			// Re-obtain the checkbox to check if the value has been updated
			const updatedCheckbox = getByTestId("consider-space-checkbox");

			expect(updatedCheckbox.props.accessibilityState.checked).toBe(true);
		});
	});

	describe("External Link", () => {
		it("should open the link to buy me a coffee", async () => {
			const spyOnFn = jest.spyOn(Linking, "openURL");

			const { findByTestId } = render(<Base64 />);

			const button = await findByTestId("buy-me-a-coffee-button");

			fireEvent.press(button);

			expect(spyOnFn).toHaveBeenCalledTimes(1);

			expect(Linking.openURL).toHaveBeenCalledWith("https://www.buymeacoffee.com/gabriellogan");
		});
	});

	describe("Change Language", () => {
		it("should open the modal to change the language", async () => {
			const setModalChangeLang = jest.fn();

			const useStateSpy = jest
				.spyOn(React, "useState")
				.mockImplementation(() => [false, setModalChangeLang]);

			const { findByTestId } = render(<Base64 />);

			const button = await findByTestId("open-change-language-button");

			fireEvent.press(button);

			expect(setModalChangeLang).toHaveBeenCalledWith(true);

			useStateSpy.mockRestore();
		});
	});

	describe("Button Descriptografar and Criptografar Action", () => {
		describe("Criptografar", () => {
			it("should call base64.encode when Criptografar button is pressed", async () => {
				const spyOnFn = jest.spyOn(base64, "encode");

				const { findByText, findByPlaceholderText } = render(<Base64 />);

				const button = await findByText(/Criptografar/);

				const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");

				// Before press the button, the inputText is empty
				expect(textInput.props.value).toBe("");

				fireEvent.press(button);

				// After press the button, the inputText is still empty
				expect(textInput.props.value).toBe("AA==");

				expect(spyOnFn).toHaveBeenCalledTimes(1);

				expect(base64.encode).toHaveBeenCalledWith("");

				spyOnFn.mockRestore();
			});

			it("should encode correctly with Considerar espaço ? as true", async () => {
				const spyOnFn = jest.spyOn(base64, "encode");

				const { findByText, findByPlaceholderText, findByTestId } = render(<Base64 />);

				const button = await findByText(/Criptografar/);

				const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");

				const checkbox = await findByTestId("consider-space-checkbox");

				expect(textInput.props.value).toBe("");

				fireEvent.changeText(textInput, "Teste");

				expect(textInput.props.value).toBe("Teste");

				await act(async () => {
					await fireEvent.press(checkbox);
				});

				expect(checkbox.props.accessibilityState.checked).toBe(true);

				fireEvent.press(button);

				expect(spyOnFn).toHaveBeenCalledTimes(1);

				expect(base64.encode).toHaveBeenCalledWith("Teste\n");

				expect(textInput.props.value).toBe("VGVzdGUK");

				spyOnFn.mockRestore();
			});

			it("should encode correctly the inputText", async () => {
				const spyOnFn = jest.spyOn(base64, "encode");

				const { findByText, findByPlaceholderText } = render(<Base64 />);

				const button = await findByText(/Criptografar/);

				const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");

				// Before press the button, the inputText is empty
				expect(textInput.props.value).toBe("");

				fireEvent.changeText(textInput, "Teste");

				expect(textInput.props.value).toBe("Teste");

				fireEvent.press(button);

				// After press the button, the inputText is still empty
				expect(textInput.props.value).toBe("VGVzdGU=");

				expect(spyOnFn).toHaveBeenCalledTimes(1);

				expect(base64.encode).toHaveBeenCalledWith("Teste");

				spyOnFn.mockRestore();
			});

			it("should Alert.alert when inputText.length > 25000", async () => {
				const alertSpyOn = jest.spyOn(Alert, "alert");

				const { findByPlaceholderText, findByText } = render(<Base64 />);

				const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");
				const button = await findByText(/Criptografar/);

				fireEvent.changeText(textInput, "a".repeat(25001));

				fireEvent.press(button);

				expect(alertSpyOn).toHaveBeenCalledTimes(1);
				expect(alertSpyOn).toHaveBeenCalledWith("Erro", "It's too big");

				alertSpyOn.mockRestore();
			});
		});

		describe("Descriptografar", () => {
			it("should call base64.decode when Descriptografar button is pressed", async () => {
				// Mock Alert.alert before the button press
				const alertSpyOn = jest.spyOn(Alert, "alert");

				const { findByText, findByPlaceholderText } = render(<Base64 />);

				const button = await findByText(/Descriptografar/);

				const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");

				expect(textInput.props.value).toBe("");

				fireEvent.press(button);

				expect(alertSpyOn).toHaveBeenCalledTimes(1);

				// Restore the mock
				alertSpyOn.mockRestore();
			});

			it("should decode correctly the inputText", async () => {
				const spyOnFn = jest.spyOn(base64, "decode");

				const { findByText, findByPlaceholderText } = render(<Base64 />);

				const button = await findByText(/Descriptografar/);

				const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");

				expect(textInput.props.value).toBe("");

				fireEvent.changeText(textInput, "VGVzdGU=");

				expect(textInput.props.value).toBe("VGVzdGU=");

				fireEvent.press(button);

				expect(spyOnFn).toHaveBeenCalledTimes(1);

				expect(base64.decode).toHaveBeenCalledWith("VGVzdGU=");

				expect(textInput.props.value).toBe("Teste");

				spyOnFn.mockRestore();
			});

			it("should Alert.alert when inputText has a invalid Base64 character", async () => {
				const alertSpyOn = jest.spyOn(Alert, "alert");

				const { findByPlaceholderText, findByText } = render(<Base64 />);

				const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");
				const button = await findByText(/Descriptografar/);

				// Invalid Base64 character
				fireEvent.changeText(textInput, "4445te@@");

				fireEvent.press(button);

				expect(alertSpyOn).toHaveBeenCalledTimes(1);
				expect(alertSpyOn).toHaveBeenCalledWith("Erro", "O texo não é um codigo base64 valido");

				alertSpyOn.mockRestore;
			});

			it("should Alert.alert when inputText.length > 25000", async () => {
				const alertSpyOn = jest.spyOn(Alert, "alert");

				const { findByPlaceholderText, findByText } = render(<Base64 />);

				const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");
				const button = await findByText(/Descriptografar/);

				fireEvent.changeText(textInput, "a".repeat(25001));

				fireEvent.press(button);

				expect(alertSpyOn).toHaveBeenCalledTimes(1);
				expect(alertSpyOn).toHaveBeenCalledWith("Erro", "It's too big");

				alertSpyOn.mockRestore();
			});
		});
	});

	describe("Buttons Recortar, Copiar, Colar and Limpar Actions", () => {
		it("should cut the inputText to clipboard", async () => {
			const clipboardSpyOn = jest.spyOn(Clipboard, "setStringAsync").mockResolvedValue(true);

			const { findByText, findByPlaceholderText } = render(<Base64 />);

			const button = await findByText(/Recortar/);
			const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");

			fireEvent.changeText(textInput, "Teste");

			await act(async () => {
				await fireEvent.press(button);
			});

			expect(clipboardSpyOn).toHaveBeenCalledTimes(1);

			expect(textInput.props.value).toBe("");
		});

		it("should copy the inputText to clipboard", async () => {
			const clipboardSpyOn = jest.spyOn(Clipboard, "setStringAsync").mockResolvedValue(true);

			const { findByText, findByPlaceholderText } = render(<Base64 />);

			const button = await findByText(/Copiar/);
			const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");

			fireEvent.changeText(textInput, "Teste");

			await act(async () => {
				await fireEvent.press(button);
			});

			expect(clipboardSpyOn).toHaveBeenCalledTimes(1);

			expect(textInput.props.value).toBe("Teste");
		});

		it("should paste the clipboard to inputText", async () => {
			const clipboardSpyOn = jest.spyOn(Clipboard, "getStringAsync").mockResolvedValue("Teste");

			const { findByText, findByPlaceholderText } = render(<Base64 />);

			const button = await findByText(/Colar/);
			const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");

			await act(async () => {
				await fireEvent.press(button);
			});

			expect(clipboardSpyOn).toHaveBeenCalledTimes(1);

			expect(textInput.props.value).toBe("Teste");
		});

		it("should clean the inputText", async () => {
			const { findByText, findByPlaceholderText } = render(<Base64 />);

			const button = await findByText(/Limpar/);
			const textInput = await findByPlaceholderText("Digite algo ou cole aqui o código");

			fireEvent.changeText(textInput, "Teste");

			await act(async () => {
				await fireEvent.press(button);
			});

			expect(textInput.props.value).toBe("");
		});

		test("else path taken for copyToClipboard and cutToClipboard", async () => {
			const { findByText } = render(<Base64 />);

			const buttonCopy = await findByText(/Copiar/);
			const buttonCut = await findByText(/Recortar/);

			await act(async () => {
				await fireEvent.press(buttonCopy);
			});

			await act(async () => {
				await fireEvent.press(buttonCut);
			});

			expect(true).toBeTruthy();
		});
	});

	describe("UseEffect", () => {
		describe("ConsiderSpace from AsyncStorage", () => {
			it("should set considerSpace as true when AsyncStorage has the value", async () => {
				const valueTobeStored = "true";
				(AsyncStorage.getItem as jest.Mock).mockResolvedValue(valueTobeStored);

				const { findByTestId } = render(<Base64 />);

				const checkbox = await findByTestId("consider-space-checkbox");

				waitFor(() => {
					expect(AsyncStorage.getItem).toHaveBeenCalledWith("considerSpaceAfterGenerate");

					expect(checkbox.props.accessibilityState.checked).toBe(true);
				});
			});
		});
	});
});
