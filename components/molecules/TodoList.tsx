import { RootState } from "@/stores";
import React, { useEffect, useMemo, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { TodoListItem } from "../atoms";
import { EPriority } from "@/constants/Enum";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

const priorityOrder = {
	[EPriority.HIGH]: 0,
	[EPriority.MEDIUM]: 1,
	[EPriority.LOW]: 2,
};

interface TodoListProps {}

export const TodoList: React.FC<TodoListProps> = ({}) => {
	const todos = useSelector((state: RootState) => state.todos.todos);
	const flatListRef = useRef<FlatList | null>(null);

	const sortedTodos = useMemo(() => {
		return [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
	}, [todos]);

	useEffect(() => {
		if (flatListRef.current && todos.length > 0) {
			setTimeout(() => {
				flatListRef.current?.scrollToEnd({ animated: true });
			}, 200);
		}
	}, [todos.length]);

	return (
		<Animated.FlatList
			style={styles.list}
			data={sortedTodos}
			ref={(ref) => (flatListRef.current = ref)}
			showsVerticalScrollIndicator={false}
			keyExtractor={(item) => item.id.toString()} // Ensure key is a string
			renderItem={({ item }) => <TodoListItem {...item} />}
			itemLayoutAnimation={LinearTransition}
			ListFooterComponent={<View style={{ height: 100 }}></View>}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
		flexGrow: 1,
		backgroundColor: Colors.background,
	},
});
