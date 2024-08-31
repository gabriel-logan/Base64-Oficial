import { render } from "@testing-library/react-native";
import App from "../App";

describe("App", () => {
	it("should render correctly", () => {
		render(<App />);

		expect(true).toBeTruthy();
	});
});
