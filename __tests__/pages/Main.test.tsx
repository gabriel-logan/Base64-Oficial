import { fireEvent, render, screen } from "@testing-library/react-native";
import MainPage from "../../src/pages/Main";
import { Alert, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";

describe("MainPage", () => {
  it("should render correctly", () => {
    render(<MainPage />);
  });

  it("should handle change text input correctly", () => {
    render(<MainPage />);

    const textInput = screen.getByPlaceholderText(/Enter or paste text here/i);

    fireEvent.changeText(textInput, "New text");

    expect(textInput.props.value).toBe("New text");
  });

  it("should open URL when the help the developer button is pressed", () => {
    render(<MainPage />);

    const btnHelp = screen.getByTestId(/help-developer-button/i);

    fireEvent.press(btnHelp);

    expect(Linking.openURL).toHaveBeenCalledTimes(1);
  });

  it("should convert text to Base64 when Encode button is pressed", () => {
    render(<MainPage />);

    const textInput = screen.getByPlaceholderText(/Enter or paste text here/i);

    fireEvent.changeText(textInput, "Hello World");

    const btnEncode = screen.getByText(/encode/i);

    fireEvent.press(btnEncode);

    expect(textInput.props.value).toBe(btoa("Hello World"));
  });

  it("should convert text to base64 and consider space when Encode button is pressed", () => {
    render(<MainPage />);

    const textInput = screen.getByPlaceholderText(/Enter or paste text here/i);

    const checkbox = screen.getByTestId("consider-space-checkbox");

    fireEvent.press(checkbox);
    fireEvent.changeText(textInput, "Hello World");

    const btnEncode = screen.getByText(/encode/i);

    fireEvent.press(btnEncode);

    expect(textInput.props.value).toBe(btoa("Hello World\n"));
  });

  it("should decode text from Base64 when Decode button is pressed", () => {
    render(<MainPage />);

    const textInput = screen.getByPlaceholderText(/Enter or paste text here/i);

    fireEvent.changeText(textInput, btoa("Hello World"));

    const btnDecode = screen.getByText(/decode/i);

    fireEvent.press(btnDecode);

    expect(textInput.props.value).toBe("Hello World");
  });

  describe("Cut, Copy, Paste, Clear", () => {
    it("should copy text to clipboard when Copy button is pressed", () => {
      const clipboardSpy = jest.spyOn(Clipboard, "setStringAsync");

      render(<MainPage />);

      const textInput = screen.getByPlaceholderText(
        /Enter or paste text here/i,
      );

      fireEvent.changeText(textInput, "Hello World");

      const btnCopy = screen.getByText(/copy/i);

      fireEvent.press(btnCopy);

      expect(clipboardSpy).toHaveBeenCalledWith("Hello World");
    });

    it("should cut text when Cut button is pressed", () => {
      const clipboardSpy = jest.spyOn(Clipboard, "setStringAsync");

      render(<MainPage />);

      const textInput = screen.getByPlaceholderText(
        /Enter or paste text here/i,
      );

      fireEvent.changeText(textInput, "Hello World");

      const btnCut = screen.getByText(/cut/i);

      fireEvent.press(btnCut);

      expect(clipboardSpy).toHaveBeenCalledWith("Hello World");
      expect(textInput.props.value).toBe("");
    });

    it("should clear text input when clear button is pressed", () => {
      render(<MainPage />);

      const textInput = screen.getByPlaceholderText(
        /Enter or paste text here/i,
      );

      fireEvent.changeText(textInput, "Some text");

      const btnClear = screen.getByText(/clear/i);

      fireEvent.press(btnClear);

      expect(textInput.props.value).toBe("");
    });
  });

  describe("Alert", () => {
    it("should show an alert when trying to decode invalid Base64", () => {
      const alertSpy = jest.spyOn(Alert, "alert").mockImplementation();

      render(<MainPage />);

      const textInput = screen.getByPlaceholderText(
        /Enter or paste text here/i,
      );

      fireEvent.changeText(textInput, "Invalid Base64");

      const btnDecode = screen.getByText(/decode/i);

      fireEvent.press(btnDecode);

      expect(alertSpy).toHaveBeenCalledWith(
        "Error",
        "Invalid Base64 string, please check your input.",
      );
    });

    it("should show an alert when trying to decode empty Base64", () => {
      const alertSpy = jest.spyOn(Alert, "alert").mockImplementation();

      render(<MainPage />);

      const textInput = screen.getByPlaceholderText(
        /Enter or paste text here/i,
      );

      fireEvent.changeText(textInput, "");

      const btnDecode = screen.getByText(/decode/i);

      fireEvent.press(btnDecode);

      expect(alertSpy).toHaveBeenCalledWith(
        "Error",
        "The entered text to decode must not be empty",
      );
    });

    it("should show an alert when try to encode string greater than 25000 characters", () => {
      const alertSpy = jest.spyOn(Alert, "alert").mockImplementation();

      render(<MainPage />);

      const textInput = screen.getByPlaceholderText(
        /Enter or paste text here/i,
      );

      fireEvent.changeText(textInput, "A".repeat(25001));

      const btnEncode = screen.getByText(/encode/i);

      fireEvent.press(btnEncode);

      expect(alertSpy).toHaveBeenCalledWith(
        "Error",
        "Text exceeds maximum length of 25000 characters",
      );
    });
  });
});
