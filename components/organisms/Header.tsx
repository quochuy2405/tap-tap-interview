import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export const Header: React.FC<PropsWithChildren> = ({ children }) => {
	return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		height: 60,
	},
});
