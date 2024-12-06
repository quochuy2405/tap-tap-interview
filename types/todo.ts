import { EPriority } from "@/constants/Enum";

export interface Todo {
	id: string;
	title: string;
	deadline: string;
	priority: EPriority;
}
