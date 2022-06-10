import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true
};

const isLoading = false;

const Register = () => {
	const [values, setValues] = useState(initialState);

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		setValues({ ...values, [name]: value });
	};

	const onSubmit = event => {
		event.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			console.error('Please fill out all fields');
			return;
		}
	};

	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				{/* name field */}
				{!values.isMember && (
					<FormRow
						type='text'
						name='name'
						value={values.name}
						handleChange={handleChange}
					/>
				)}
				{/* email field */}
				<FormRow
					type='email'
					name='email'
					value={values.email}
					handleChange={handleChange}
				/>
				{/* password field */}
				<FormRow
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
				/>
				<button type='submit' className='btn btn-block' disabled={isLoading}>
					{isLoading ? 'loading...' : 'submit'}
				</button>
				<button
					type='button'
					className='btn btn-block btn-hipster'
					disabled={isLoading}
				>
					{isLoading ? 'loading...' : 'demo app'}
				</button>
				<p>
					{values.isMember ? 'Not a member yet?' : 'Already a member?'}
					<button type='button' className='member-btn' onClick={toggleMember}>
						{values.isMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
