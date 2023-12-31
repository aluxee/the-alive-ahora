import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';



function SignupFormModal() {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [auth, setAuth] = useState(true);
	const { closeModal } = useModal();



	useEffect(() => {

		if (!email || username.length < 4 || !firstName || !lastName || password.length < 6 || !confirmedPassword) {
			setAuth(true)
		} else { setAuth(false) }

	}, [email, username.length, firstName, lastName, password.length, confirmedPassword])

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});

		if (password === confirmedPassword) {
			console.log("%c 🚀 ~ file: SignupFormModal.jsx:37 ~ handleSubmit ~ sessionActions: ", "color: purple; font-size: 25px", sessionActions)
			const validation = {};
			return dispatch(sessionActions.signupUser({
				email,
				username,
				firstName,
				lastName,
				password
			}))
				.then(closeModal)
				.catch(
					async (response) => {
						const data = await response.json()
						console.log("%c 🚀 ~ file: SignupFormModal.jsx:50 ~ handleSubmit ~ response data: ", "color: red; font-size: 25px", response, response.json, data)

						if (data && data?.errors) {
							validation.errors = data.errors;
							setErrors(data.errors);
						}
					})
		}
		return setErrors({
			confirmedPassword: "Confirm Password field must be the same as the Password field"
		})
	}

	return (
		<>
			<div className='outer-signup_container'>
				<div className='inner-signup_container'>
					<h1>Sign Up</h1>
					<form onSubmit={handleSubmit}>
						<div className='signup_container'>
							<label className='signup_username'>
								Username
								<input
									placeholder='username'
									type='text'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</label>
							{errors.username && <p className='p-error'>{errors.username}</p>}

							<label className='signup_email'>
								Email
								<input
									placeholder='email'
									type='text'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</label>
							{errors.email && <p className='p-error'>{errors.email}</p>}

							<label className='signup_firstName'>
								First Name
								<input
									placeholder='enter your first name'
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
							</label>
							{errors.firstName && <p className='p-error'>{errors.firstName}</p>}

							<label className='signup_lastName'>
								Last Name
								<input
									placeholder='enter your last name'
									type="text"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
							</label>
							{errors.lastName && <p className='p-error'>{errors.lastName}</p>}

							<label className='signup_password'>
								Password
								<input
									placeholder='password'
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</label>
							{errors.password && <p className='p-error'>{errors.password}</p>}

							<label className='signup_confirmedPassword'>
								Confirm Password
								<input
									placeholder='confirm password'
									type="password"
									value={confirmedPassword}
									onChange={(e) => setConfirmedPassword(e.target.value)}
									required
								/>
							</label>
							{errors.confirmedPassword && <p className='p-error'>{errors.confirmedPassword}</p>}
							<button
								type='submit'
								disabled={auth}
								className='signup-submit-button'
							>
								Sign Up
							</button>
						</div>
					</form >
				</div>
			</div>
		</>
	);
}


export default SignupFormModal;
