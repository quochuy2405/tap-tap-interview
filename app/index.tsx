import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
let timeOut: NodeJS.Timeout | null = null;
const ScreenLoading = () => {
	useEffect(() => {
		(async () => {
			timeOut = setTimeout(() => {
				router.push("/screens/home");
			}, 1000);
			return () => timeOut && clearTimeout(timeOut);
		})();
	}, []);
	return (
		<View style={styles.container}>
			<Image source={require("../assets/images/splash-icon.png")} />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.background,
	},
});
export default ScreenLoading;
