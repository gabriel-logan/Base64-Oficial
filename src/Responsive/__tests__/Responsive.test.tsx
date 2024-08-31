import React from "react";
import { render } from "@testing-library/react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { RFValueWithFixedSecondParam } from "..";
import { Text } from "react-native";

describe("Responsive", () => {
	it("should calculate RFValueWithFixedSecondParam correctly", () => {
		const value = 10;
		const expected = RFValue(value, 796.89998);

		const result = RFValueWithFixedSecondParam(value);

		expect(result).toBe(expected);
	});

	it("should render correctly with RFPercentage", () => {
		const value = 50;
		const expected = RFPercentage(value);

		const { getByText } = render(<Text style={{ fontSize: expected }}>Hello World</Text>);

		const textElement = getByText("Hello World");

		expect(textElement.props.style.fontSize).toBe(expected);
	});
});
