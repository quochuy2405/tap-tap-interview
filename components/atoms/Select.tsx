import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
interface SelectProps {
	label?: string;
	options: { label: string; value: string }[];
	placeholder?: string;
	value: string;
	defaultValue: string;
	onChange: (value: any) => void;
}

export const Select: React.FC<SelectProps> = ({
	label,
	options,
	value,
	onChange,
	defaultValue,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<View style={styles.container}>
			{!!label && <Text style={styles.label}>{label}</Text>}
			<View style={{ flex: 1 }}>
				<DropDownPicker
					style={{ borderWidth: 0, zIndex: 999 }}
					showArrowIcon={false}
					textStyle={{ textAlign: "right" }}
					listItemContainerStyle={{ flexDirection: "row-reverse" }}
					open={open}
					value={value || defaultValue}
					items={options}
					setOpen={setOpen}
					setValue={(val) => onChange(val(value))}
					placeholder={"Chọn mức độ ưu tiên"}
				/>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		height: 54,
		borderBottomWidth: 1,
		borderColor: Colors.borderColor,
		color: Colors.text,
		fontSize: 20,
		fontWeight: "700",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	label: {
		fontSize: 20,
		fontWeight: "700",
		color: Colors.text,
		flex: 1,
	},
	input: {
		height: 54,
		justifyContent: "center",
		borderBottomWidth: 1,
		borderColor: Colors.borderColor,
	},
	dateText: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.text,
	},
});
