import { DeleteIcon, PenIcon } from "@/assets/icons/common";
import { EPriority } from "@/constants/Enum";
import { schemaTodo } from "@/helpers/resolvers/todo.resolver";
import { deleteTodo, updateTodo } from "@/stores/slices/todoSlice";
import { Todo } from "@/types/todo";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { DatePicker } from "./DatePicker";
import { ErrorWrapper } from "./ErrorWrapper";
import { InputField } from "./InputField";
import { Select } from "./Select";

interface TodoListItemProps extends Todo {}

const contents = {
	[EPriority.HIGH]: {
		text: "Ưu tiên cao",
		color: "#21AB3B",
	},
	[EPriority.MEDIUM]: {
		text: "Ưu tiên trung bình",
		color: "#F2994A",
	},
	[EPriority.LOW]: {
		text: "Ưu tiên thấp",
		color: "#C4C4C4",
	},
};

export const TodoListItem = (todo: TodoListItemProps) => {
	const [isEditing, setIsEditing] = useState(false);

	if (!todo) return <></>;

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleClose = () => {
		setIsEditing(false);
	};

	return (
		<View style={styles.container}>
			{!isEditing && <Preview {...todo} onEdit={handleEdit} />}
			{isEditing && <FormTodo {...todo} onCompleted={handleClose} />}
		</View>
	);
};

interface PreviewProps {
	priority: EPriority;
	title: string;
	deadline: string;
	onEdit: () => void;
}

const Preview: React.FC<PreviewProps> = ({ priority, title, deadline, onEdit }) => {
	const remainingDays = useMemo(() => {
		return dayjs(deadline).diff(dayjs(), "day");
	}, [deadline]);

	return (
		<View style={styles.previewContainer}>
			<View style={styles.topRow}>
				<View style={styles.titleRow}>
					<View style={styles.icon} />
					<Text style={styles.taskTitle}>{title}</Text>
				</View>
				<TouchableOpacity onPress={onEdit}>
					<PenIcon />
				</TouchableOpacity>
			</View>
			<View style={styles.bottomRow}>
				<Text style={[styles.priority, { color: contents[priority]?.color }]}>
					{contents[priority]?.text}
				</Text>
				<Text style={styles.remainingDays}>Còn {remainingDays} ngày</Text>
			</View>
		</View>
	);
};

interface FormTodoProps {
	priority: EPriority;
	title: string;
	deadline: string;
	onCompleted: () => void;
	id: string;
}

const FormTodo: React.FC<FormTodoProps> = ({ id, priority, title, deadline, onCompleted }) => {
	const dispatch = useDispatch();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		defaultValues: {
			title,
			deadline,
			priority,
		},
		resolver: yupResolver(schemaTodo),
	});

	// Handle form submission
	const handleFormSubmit = (data: any) => {
		dispatch(updateTodo({ id, ...data }));
		onCompleted();
	};

	const handleDelete = () => {
		dispatch(deleteTodo(id));
		onCompleted();
	};

	return (
		<View style={styles.formContainer}>
			<View style={styles.deleteButtonContainer}>
				<TouchableOpacity onPress={handleDelete}>
					<View style={styles.deleteButtonRow}>
						<DeleteIcon />
						<Text style={styles.deleteText}>Xóa</Text>
					</View>
				</TouchableOpacity>
			</View>
			<Controller
				control={control}
				name='title'
				render={({ field, fieldState }) => (
					<ErrorWrapper fieldState={fieldState}>
						<InputField {...field} defaultValue={title} />
					</ErrorWrapper>
				)}
			/>
			<Controller
				control={control}
				name='deadline'
				render={({ field: { value, onChange }, fieldState }) => (
					<ErrorWrapper fieldState={fieldState}>
						<DatePicker
							value={value}
							onChange={onChange}
							label='Thời hạn'
							defaultValue={deadline}
						/>
					</ErrorWrapper>
				)}
			/>
			<Controller
				control={control}
				name='priority'
				render={({ field, fieldState }) => (
					<ErrorWrapper fieldState={fieldState}>
						<Select
							{...field}
							defaultValue='HIGH'
							label='Mức độ ưu tiên'
							options={[
								{ label: "Cao", value: "HIGH" },
								{ label: "Trung bình", value: "MEDIUM" },
								{ label: "Thấp", value: "LOW" },
							]}
						/>
					</ErrorWrapper>
				)}
			/>
			<TouchableOpacity onPress={handleSubmit(handleFormSubmit)} style={styles.submitButton}>
				<Text style={styles.submitButtonText}>Xong</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 30,
		marginVertical: 8,
		marginTop: 24,
		backgroundColor: "#fff",
		borderRadius: 15,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		justifyContent: "space-between",
	},
	previewContainer: {
		gap: 10,
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 14,
	},
	icon: {
		width: 22,
		height: 22,
		backgroundColor: "#C4C4C4",
		borderRadius: 5,
	},
	taskTitle: {
		fontSize: 16,
		fontWeight: "bold",
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	priority: {
		marginTop: 8,
		fontSize: 12,
		fontWeight: "500",
	},
	remainingDays: {
		marginTop: 4,
		fontSize: 12,
		color: "#000000",
	},
	formContainer: {
		justifyContent: "space-between",
		gap: 10,
	},
	deleteButtonContainer: {
		justifyContent: "flex-end",
		flexDirection: "row",
	},
	deleteButtonRow: {
		flexDirection: "row",
		gap: 4,
		justifyContent: "center",
	},
	deleteText: {
		fontSize: 16,
		fontWeight: "500",
	},
	submitButton: {
		height: 40,
		backgroundColor: "#21AB3B",
		width: 100,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		margin: "auto",
	},
	submitButtonText: {
		color: "white",
	},
});
