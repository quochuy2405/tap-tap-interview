import { AddTodo } from "@/components/atoms";
import { TodoList } from "@/components/molecules";
import { Header } from "@/components/organisms";
import { Colors } from "@/constants/Colors";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const Home = () => {
	return (
		<View style={styles.container}>
			<Header>
				<Text style={styles.header}>To-do list</Text>
			</Header>
			<TodoList />
			<AddTodo />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexGrow: 1,
		backgroundColor: Colors.background,
		minHeight: Dimensions.get("window").height * 0.8,
	},
	header: {
		fontSize: 20,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 20,
		color: "white",
	},
});

export default Home;
