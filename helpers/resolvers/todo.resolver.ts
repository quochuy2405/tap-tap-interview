import * as yup from "yup";

export const schemaTodo = yup.object().shape({
	title: yup.string().required("Title is required"),
	deadline: yup.date().required("Deadline is required").nullable(),
	priority: yup
		.string()
		.oneOf(["HIGH", "MEDIUM", "LOW"], "Invalid priority")
		.required("Priority is required"),
});
