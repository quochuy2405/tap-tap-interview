import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface InputFieldProps extends Omit<TextInputProps, "onChangeText"> {
	onChange: (value: any) => void;
}
export const InputField: React.FC<InputFieldProps> = ({ onChange, ...props }) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<TextInput
			style={[
				styles.container,
				{ borderColor: isFocused ? "black" : Colors.borderColor }, // Change border color
			]}
			onFocus={() => setIsFocused(true)} // Set focus state
			onBlur={() => setIsFocused(false)} // Reset focus state
			onChangeText={onChange}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 54,
		borderBottomWidth: 1,
		color: Colors.text,
		fontSize: 20,
		fontWeight: "700",
	},
});
