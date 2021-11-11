import React, { useState, useEffect } from 'react';
import Form from './Form';
import './App.css';
import axios from 'axios';
import * as yup from 'yup';
import schema from '../validation/formSchema';
import Employee from './Employee';

// create our intial form values
const initialFormValues = {
	name: '',
	department: '',
	hiredate: '',
	email: '',
	password: '',
	terms: false,
};

// create structure for form errors
const initialFormErrors = {
	name: '',
	department: '',
	hiredate: '',
	email: '',
	password: '',
};

const initialEmployees = [];
const initialDisabled = true;

export default function App() {
	// create our slices of state
	const [employees, setEmployees] = useState(initialEmployees);
	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(initialDisabled);

	// lets get some data!
	const getEmployees = () => {
		axios
			.get('https://reqres.in/api/users')
			.then((res) => {
				console.log(res);
				setEmployees(res.data);
			})
			.catch((err) => console.error(err));
	};

	// a function to post our new values to the API (or data server)
	const postNewEmployee = (newEmployee) => {
		axios
			.post('https://reqres.in/api/users', newEmployee)
			.then((res) => {
				setEmployees([res.data, ...employees]);
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setFormValues(initialFormValues);
			});
	};

	// our validatieon check function
	const validate = (name, value) => {
		yup.reach(schema, name)
			.validate(value)
			.then(() => setFormErrors({ ...formErrors, [name]: '' }))
			.catch((err) =>
				setFormErrors({ ...formErrors, [name]: err.errors[0] })
			);
	};

	const inputChange = (name, value) => {
		validate(name, value);
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const formSubmit = () => {
		const newEmployee = {
			name: formValues.name.trim(),
			department: formValues.department,
			hiredate: formValues.hiredate,
			email: formValues.email,
			password: formValues.password.trim(),
			terms: ['terms'].filter((terms) => !!formValues[terms]),
		};
		postNewEmployee(newEmployee);
	};

	useEffect(() => {
		getEmployees();
	}, []);

	useEffect(() => {
		schema.isValid(formValues).then((valid) => setDisabled(!valid));
	}, [formValues]);

	return (
		<div className='App'>
			<Form
				values={formValues}
				change={inputChange}
				submit={formSubmit}
				disabled={disabled}
				errors={formErrors}
			/>

			{initialEmployees.map((employee) => {
				return <Employee key={employee.id} details={employee} />;
			})}
		</div>
	);
}
