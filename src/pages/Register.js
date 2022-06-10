import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { loginUser, registerUser } from '../redux/features/user/userSlice';

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true
};

const isLoading = false;

const Register = () => {
	const [values, setValues] = useState(initialState);
	const { user, isLoading } = useSelector(store => store.user);
	const dispatch = useDispatch();

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		setValues({ ...values, [name]: value });
	};

	const onSubmit = event => {
		event.preventDefault();
		const { name, email, password, isMember } = values;

		if (!email || !password || (!isMember && !name)) {
			toast.error('Please fill all fields', {
				toastId: 'register-toast'
			});
			return;
		}

		if (isMember) {
			dispatch(loginUser({ email, password }));
			return;
		}

		dispatch(registerUser({ name, email, password }));
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
