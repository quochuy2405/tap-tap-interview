import dayjs from "dayjs";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DatePicker {
	label?: string;
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (date: Date) => void;
}

export const DatePicker: React.FC<DatePicker> = ({ label, defaultValue, value, onChange }) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};
	const handleConfirm = (date: Date) => {
		if (date) onChange?.(date);
		hideDatePicker();
	};

	return (
		<View style={styles.container}>
			{!!label && <Text style={styles.label}>{label}</Text>}
			<TouchableOpacity style={styles.input} onPress={showDatePicker}>
				<Text style={styles.dateText}>{dayjs(value || defaultValue).format("DD/MM/YYYY")}</Text>
			</TouchableOpacity>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode='date'
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 54,
		borderBottomWidth: 1,
		borderColor: "#DADADA",
		color: "black",
		fontSize: 20,
		fontWeight: "700",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	label: {
		fontSize: 20,
		fontWeight: "700",
		color: "#000",
	},
	input: {
		height: 54,
		justifyContent: "center",
		borderBottomWidth: 1,
		borderColor: "#DADADA",
	},
	dateText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#000",
	},
});
