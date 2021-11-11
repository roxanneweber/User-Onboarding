import React from 'react';

function Employee({ details }) {
	if (!details) {
		return <h3>Working fetching your employee&apos;s details...</h3>;
	}

	return (
		<div className='employee container'>
			<h2>{details.name}</h2>
			<p>Department: {details.department}</p>
			<p>Hire Date: {details.hiredate}</p>
			<p>Email: {details.email}</p>
			<p>Password: ********</p>
			<p>Signed Terms: {details.terms}</p>
		</div>
	);
}

export default Employee;
