import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { abcd, auth, db, updateUserDatabase } from '../extras/db/firebase';
import { storage } from '../extras/db/firebase';
import { ref, listAll } from 'firebase/storage';
import noprof from '../../images/noprof.png';
export default function Profile() {
	const [user, loading] = useAuthState(auth);
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
	const [file, setFile] = useState(null);
	const [url, setURL] = useState('');

	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	function handleUpload(e) {
		e.preventDefault();
		const ref = storage.ref(`/images/${user.uid}/ProfilePic/${file.name}`);
		const uploadTask = ref.put(file);
		uploadTask.on('state_changed', console.log, console.error, () => {
			ref.getDownloadURL().then((url) => {
				setFile(null);
				setURL(url);
			});
		});
	}

	function getProfilePic() {
		if (file) {
			const listRef = ref(storage, `images/${user.uid}/ProfilePic`);

			listAll(listRef).then((res) => {
				console.log(res);
				console.log(url);
			});
		}
		if (url) return url;
		else return noprof;
	}
	useEffect(() => {
		if (loading) return;
		if (!user) return navigate('/home', { replace: true });
		fetchUserDetails();
	}, [user, loading]);
	function userUpdate() {
		const data = {
			user: user || '',
			name: name || '',
			age: age || '',
			sex: sex || '',
			degree: degree || '',
			CNP: CNP || '',
			email: email || '',
			country: country || '',
			phone: phone || '',
		};
		updateUserDatabase(data);
	}
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

	return (
		<div className='dashUnderNav'>
			<div className='row2'>
				<div className='column25'>
					<div>
						<form onSubmit={handleUpload}>
							<input type='file' onChange={handleChange} accept='image/*' />
							<button hidden={!file} onClick={getProfilePic}>
								upload to firebase
							</button>
						</form>
						<img
							src={url || noprof}
							style={{ height: '150px', width: '150px' }}
							alt='profilePicture'
						/>
					</div>
				</div>
				<div className='column75'>
					<form className='frm'>
						<div className='row2'>
							<div className='column50 left'>
								<div className='row mrg'>
									<label>Name</label>
									<input
										type='text'
										value={name || ''}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className='row mrg'>
									<label>Email</label>
									<input
										type='text'
										value={email || ''}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className='row mrg '>
									<label>CNP</label>
									<input
										type='text'
										value={CNP || ''}
										onChange={(e) => setCNP(e.target.value)}
									/>
								</div>
								<div className='row mrg'>
									<label>Age</label>
									<input
										type='text'
										value={age || ''}
										onChange={(e) => setAge(e.target.value)}
									/>
								</div>
							</div>
							<div className='column50 right'>
								<div className='row mrg '>
									<label>Sex</label>
									<input
										type='text'
										value={sex || ''}
										onChange={(e) => setSex(e.target.value)}
									/>
								</div>
								<div className='row mrg '>
									<label>Degree</label>
									<input
										type='text'
										value={degree || ''}
										onChange={(e) => setDegree(e.target.value)}
									/>
								</div>
								<div className='row mrg '>
									<label>Country</label>
									<input
										type='text'
										value={country || ''}
										onChange={(e) => setCountry(e.target.value)}
									/>
								</div>
								<div className='row mrg '>
									<label>Phone</label>
									<input
										type='text'
										value={phone || ''}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className='btnflex'>
							<button className='dreapta' type='submit' onClick={userUpdate}>
								submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
