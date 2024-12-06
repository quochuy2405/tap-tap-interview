import { RootState } from "@/stores";
import React, { useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { TodoListItem } from "../atoms";
import { EPriority } from "@/constants/Enum";

const priorityOrder = {
	[EPriority.HIGH]: 0,
	[EPriority.MEDIUM]: 1,
	[EPriority.LOW]: 2,
};

export const TodoList = () => {
	const todos = useSelector((state: RootState) => state.todos.todos);

	const sortedTodos = useMemo(
		() => [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]),
		[todos]
	);

	return (
		<FlatList
			style={styles.list}
			data={sortedTodos}
			showsVerticalScrollIndicator={false}
			keyExtractor={(item) => item.id.toString()} // Ensure key is a string
			renderItem={({ item }) => <TodoListItem {...item} />}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
		flexGrow: 1,
		backgroundColor: "#F7CC15",
	},
});
