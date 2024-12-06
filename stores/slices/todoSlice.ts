import { Todo } from "@/types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
	todos: Todo[];
}

const initialState: TodoState = {
	todos: [],
};

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<Omit<Todo, "id">>) => {
			const newTodo: Todo = {
				id: new Date().toISOString(),
				title: action.payload.title,
				deadline: action.payload.deadline,
				priority: action.payload.priority,
			};
			state.todos.push(newTodo);
		},
		deleteTodo: (state, action: PayloadAction<string>) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},
		updateTodo: (state, action: PayloadAction<Todo>) => {
			const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
			if (index !== -1) {
				state.todos[index] = { ...state.todos[index], ...action.payload };
			}
		},
	},
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
