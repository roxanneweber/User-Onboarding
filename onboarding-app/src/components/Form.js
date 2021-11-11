import React from 'react';
import Employee from './Employee';

export default function Form(props) {
	const { values, submit, change, disabled, errors } = props;

	const onSubmit = (evt) => {
		evt.preventDefault();
		submit();
	};

	const onChange = (evt) => {
		const { name, value, checked, type } = evt.target;
		const termValue = type === 'checkbox' ? checked : value;
		change(name, termValue);
	};

	return (
		<form className='form container' onSubmit={onSubmit}>
			<div className='form-group submit'>
				<h2>Add an Employee</h2>

				<button disabled={disabled}>submit</button>

				<div className='errors'>
					<div>{errors.name}</div>
					<div>{errors.department}</div>
					<div>{errors.hiredate}</div>
					<div>{errors.email}</div>
					<div>{errors.terms}</div>
					<div>{errors.password}</div>
				</div>
			</div>

			<div className='form-group inputs'>
				<h4>Employee information</h4>

				<label>
					Name&nbsp;
					<input
						value={values.name}
						onChange={onChange}
						name='name'
						type='text'
					/>
				</label>
				<div className='form-group dropdown'>
					<label>
						Department&nbsp;
						<select
							onChange={onChange}
							value={values.department}
							name='department'
						>
							<option value=''>- Select an option -</option>
							<option value='accounting'>Accounting</option>
							<option value='it'>Information Technology</option>
							<option value='sales'>Sales</option>
							<option value='management'>Management</option>
							<option value='office'>Business Staff</option>
						</select>
					</label>
				</div>

				<label>
					Hire Date&nbsp;
					<input
						value={values.hiredate}
						onChange={onChange}
						name='hiredate'
						type='text'
					/>
				</label>

				<label>
					Initial Password&nbsp;
					<input
						value={values.password}
						onChange={onChange}
						name='password'
						type='text'
					/>
				</label>

				<label>
					Signed Terms
					<input
						type='checkbox'
						name='yes'
						checked={values.yes}
						onChange={onChange}
					/>
				</label>
			</div>
		</form>
	);
}
