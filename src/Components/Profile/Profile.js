import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { auth, db } from '../extras/db/firebase';
export default function Profile() {
	const [user, loading] = useAuthState(auth);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const fetchUserDetails = newFunction();

	useEffect(() => {
		if (loading) return;
		if (!user) return navigate('/home', { replace: true });
		fetchUserDetails();
	}, [user, loading, fetchUserDetails, navigate]);

	function newFunction() {
		return async () => {
			try {
				const query = await db
					.collection('users')
					.where('uid', '==', user?.uid)
					.get();
				const data = query.docs[0].data();

				setName(data.name);
				setEmail(data.email);
			} catch (err) {
				console.error(err);
				alert('An error occured while fetching user data');
			}
		};
	}

	return (
		<div>
			<h1 style={{ margin: '150px' }}>Buna din nou, {name}</h1>
		</div>
	);
}
