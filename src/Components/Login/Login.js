import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	auth,
	signInWithEmailAndPassword,
	signInWithGoogle,
	signInWithFacebook,
} from '../extras/db/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import fbIcon from '../extras/images/fb.png';
import googleIcon from '../extras/images/google.png';
function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();
	useEffect(() => {
		if (loading) {
			return;
		}
		if (user) navigate('/dashboard', { replace: true });
	}, [user, loading, navigate]);
	return (
		<div id='loginform'>
			<h2 id='headerTitle'>Log In</h2>
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
			<div id='button' className='row'>
				<button
					className='btn'
					id='button'
					onClick={() => signInWithEmailAndPassword(email, password)}
				>
					Login
				</button>
			</div>
			<div id='button' className='row'>
				<a href='#/register'>Sign Up</a>
			</div>
			<OtherMethods />
		</div>
	);
}

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

export default Login;
