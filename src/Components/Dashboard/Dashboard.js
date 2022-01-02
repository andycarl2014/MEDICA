import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { auth, db } from '../extras/db/firebase';

function Dashboard() {
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

	return <p style={{ margin: '150px' }}>Salut {name}! Ce mai faci?</p>;

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
}

export default Dashboard;
