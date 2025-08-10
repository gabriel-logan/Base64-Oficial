import { fireEvent, render, screen } from "@testing-library/react-native";
import MainPage from "../../src/pages/Main";
import { Linking } from "react-native";

describe("MainPage", () => {
  it("should render correctly", () => {
    render(<MainPage />);
  });

  describe("interactions", () => {
    it("should handle change text input correctly", () => {
      render(<MainPage />);

      const textInput = screen.getByPlaceholderText(
        /Enter or paste text here/i,
      );

      fireEvent.changeText(textInput, "New text");

      expect(textInput.props.value).toBe("New text");
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

    it("should open URL when the help the developer button is pressed", () => {
      render(<MainPage />);

      const btnHelp = screen.getByTestId(/help-developer-button/i);

      fireEvent.press(btnHelp);

      expect(Linking.openURL).toHaveBeenCalledTimes(1);
    });

    it("should convert text to Base64 when Encode button is pressed", () => {
      render(<MainPage />);

      const textInput = screen.getByPlaceholderText(
        /Enter or paste text here/i,
      );

      fireEvent.changeText(textInput, "Hello World");

      const btnEncode = screen.getByText(/encode/i);

      fireEvent.press(btnEncode);

      expect(textInput.props.value).toBe(btoa("Hello World"));
    });

    it("should convert text to base64 and consider space when Encode button is pressed", () => {
      render(<MainPage />);

      const textInput = screen.getByPlaceholderText(
        /Enter or paste text here/i,
      );

      const checkbox = screen.getByTestId("consider-space-checkbox");

      fireEvent.press(checkbox);
      fireEvent.changeText(textInput, "Hello World");

      const btnEncode = screen.getByText(/encode/i);

      fireEvent.press(btnEncode);

      expect(textInput.props.value).toBe(btoa("Hello World\n"));
    });

    it("should decode text from Base64 when Decode button is pressed", () => {
      render(<MainPage />);

      const textInput = screen.getByPlaceholderText(
        /Enter or paste text here/i,
      );

      fireEvent.changeText(textInput, btoa("Hello World"));

      const btnDecode = screen.getByText(/decode/i);

      fireEvent.press(btnDecode);

      expect(textInput.props.value).toBe("Hello World");
    });
  });
});
