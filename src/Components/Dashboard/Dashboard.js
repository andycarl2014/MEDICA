import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { auth, db } from '../extras/db/firebase';

import FetchDataFromRSSFeed from '../News/News';

function Dashboard() {
	const navigate = useNavigate();

	const [user, loading] = useAuthState(auth);
	useEffect(() => {
		if (loading) return;
		if (!user) return navigate('/home', { replace: true });
	}, [user, loading]);
	return (
		<div className='dashUnderNav' style={{ boxShadow: 'none' }}>
			<FetchDataFromRSSFeed />
		</div>
	);

	function newFunction() {
		return async () => {
			try {
				const query = await db
					.collection('users')
					.where('uid', '==', user.uid)
					.get();
				const data = query.docs[0].data();
			} catch (err) {
				console.error(err);
				alert('An error occured while fetching user data');
			}
		};
	}
}

export default Dashboard;
