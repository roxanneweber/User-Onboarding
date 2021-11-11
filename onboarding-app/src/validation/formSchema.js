import * as yup from 'yup';

const formSchema = yup.object().shape({
	username: yup
		.string()
		.trim()
		.required('Username is required')
		.min(3, 'Username must be at least 3 characters long.'),
	email: yup
		.string()
		.email('must be a valid email address')
		.required('email is required'),
	role: yup
		.string()
		.oneOf(['student', 'instructor', 'alumni', 'tl'], 'Role is required'),
	civil: yup.string().oneOf(['maried', 'single'], 'Civil status required'),
	coding: yup.boolean(),
	reading: yup.boolean(),
	hiking: yup.boolean(),
});

export default formSchema;
