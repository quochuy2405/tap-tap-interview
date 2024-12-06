import { PlusIcon } from "@/assets/icons/common";
import { EPriority } from "@/constants/Enum";
import { RootState } from "@/stores";
import { addTodo } from "@/stores/slices/todoSlice";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface AddTodoProps {}
export const AddTodo: React.FC<AddTodoProps> = ({}) => {
	const todoList = useSelector((state: RootState) => state.todos.todos);
	const dispatch = useDispatch();

	const handleAdd = () => {
		dispatch(
			addTodo({
				title: `Task ${todoList.length + 1}`,
				deadline: dayjs().add(3, "day").toISOString(),
				priority: EPriority.MEDIUM,
			})
		);
	};

	return (
		<TouchableOpacity onPress={handleAdd} style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.text}>Tạo task mới</Text>
				<Text>
					<PlusIcon w={14} h={14} />
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 50,
		backgroundColor: "#F65D79",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 8,
	},
	text: {
		fontSize: 14,
		fontWeight: "600",
		color: "white",
	},
	wrapper: { flexDirection: "row", gap: 10, justifyContent: "center" },
});
