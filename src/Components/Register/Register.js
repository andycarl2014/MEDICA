import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import {
	auth,
	registerWithEmailAndPassword,
	signInWithGoogle,
	signInWithFacebook,
} from '../extras/db/firebase';
import fbIcon from '../../images/fb.png';
import googleIcon from '../../images/google.png';
const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	const register = () => {
		if (!name) alert('Please enter name');
		registerWithEmailAndPassword(name, email, password);
	};

	useEffect(() => {
		if (loading) return;
		if (user) navigate('/dashboard', { replace: true });
	}, [user, loading, navigate]);
	return (
		<div id='loginform'>
			<h2 id='headerTitle'>Register</h2>
			<div className='row row2'>
				<input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Full Name'
				/>
			</div>
			<div className='row row2'>
				<input
					type='text'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='E-mail Address'
				/>
			</div>
			<div className='row row2'>
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
				/>
			</div>
			<div className='row row2' id='button'>
				<button onClick={register}>Register</button>
			</div>

			<div id='button' className='row'>
				<a href='#/login'>Log In</a>
			</div>
			<OtherMethods />
		</div>
	);
};

const OtherMethods = (props) => (
	<div id='alternativeLogin'>
		<label>Or sign in with:</label>
		<div id='iconGroup'>
			<Facebook />
			<Google />
		</div>
	</div>
);

const Facebook = (props) => (
	<button id='facebookIcon'>
		<img
			className='icon'
			alt='facebookLogin'
			src={fbIcon}
			onClick={signInWithFacebook}
		/>
	</button>
);

const Google = (props) => (
	<button id='googleIcon'>
		<img
			className='icon'
			alt='googleLogin'
			src={googleIcon}
			onClick={signInWithGoogle}
		/>
	</button>
);

export default Register;
