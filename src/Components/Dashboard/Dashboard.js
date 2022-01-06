import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { auth, db } from '../extras/db/firebase';
import fb from '../extras/images/fb.png';
import FetchDataFromRSSFeed from '../News/News';

function Dashboard() {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [country, setCountry] = useState('');
	const [sex, setSex] = useState('');
	const [CNP, setCNP] = useState('');
	const [age, setAge] = useState('');
	const [degree, setDegree] = useState('');
	const [email, setEmail] = useState('');

	const navigate = useNavigate();
	const fetchUserDetails = newFunction();

	const [user, loading] = useAuthState(auth);
	useEffect(() => {
		if (loading) return;
		if (!user) return navigate('/home', { replace: true });
		fetchUserDetails();
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

				setName(data.name);
				setEmail(data.email);
				setCNP(data.CNP);
				setAge(data.age);
				setSex(data.sex);
				setDegree(data.degree);
				setCountry(data.country);
				setPhone(data.phone);
			} catch (err) {
				console.error(err);
				alert('An error occured while fetching user data');
			}
		};
	}
}

export default Dashboard;
