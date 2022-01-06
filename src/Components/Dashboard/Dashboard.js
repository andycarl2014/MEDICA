import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { auth } from '../extras/db/firebase';

import FetchDataFromRSSFeed from '../News/News';

function Dashboard() {
	const navigate = useNavigate();

	const [user, loading] = useAuthState(auth);
	useEffect(() => {
		if (loading) return;
		if (!user) return navigate('/home', { replace: true });
	}, [user, loading, navigate]);
	return (
		<div className='dashUnderNav' style={{ boxShadow: 'none' }}>
			<FetchDataFromRSSFeed />
		</div>
	);
}

export default Dashboard;
