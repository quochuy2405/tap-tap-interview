import store from "@/stores";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		Archia: require("../assets/fonts/Archia-Regular.ttf"), // Adjust the path as needed
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<>
			<Provider store={store}>
				<KeyboardAvoidingView
					style={styles.container}
					keyboardVerticalOffset={80}
					behavior={Platform.OS ? "padding" : "height"}>
					<SafeAreaView style={styles.container}>
						<Stack screenOptions={{ headerShown: false }}>
							<Stack.Screen name='index' options={{ animation: "fade" }} />
							<Stack.Screen name='screens' options={{ title: "Todo List", animation: "fade" }} />
						</Stack>
						<StatusBar style='auto' />
					</SafeAreaView>
				</KeyboardAvoidingView>
			</Provider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexGrow: 1,
		backgroundColor: "#F7CC15",
		paddingHorizontal: 16,
	},
});
