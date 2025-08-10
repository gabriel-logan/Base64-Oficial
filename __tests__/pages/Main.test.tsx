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

    it("should show Alert if text input is empty", () => {
      render(<MainPage />);

      const textInput = screen.getByPlaceholderText(
        /Enter or paste text here/i,
      );

      fireEvent.changeText(textInput, "");

      expect(screen.getByText(/please enter some text/i)).toBeTruthy();
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
  });
});
