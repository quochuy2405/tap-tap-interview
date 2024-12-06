import React, { PropsWithChildren } from "react";
import { ControllerFieldState } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

interface ErrorWrapperProps extends PropsWithChildren {
	fieldState: ControllerFieldState;
}

export const ErrorWrapper: React.FC<ErrorWrapperProps> = ({ children, fieldState }) => {
	return (
		<View style={styles.container}>
			{children}
			{!!fieldState?.error?.message && (
				<Text style={[styles.errorText]}>{fieldState?.error?.message}</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { marginBottom: 10 },
	errorText: {
		color: "red",
		fontSize: 12,
		marginTop: 4,
	},
});
