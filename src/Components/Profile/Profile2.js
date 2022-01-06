import React, { Component } from 'react';
import { storage } from '../extras/db/firebase';
import { ref, listAll } from 'firebase/storage';
import noprof from '../../images/noprof.png';
import { auth, db } from '../extras/db/firebase';
import { Navigate } from 'react-router-dom';

export default class Profile2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			name: '',
			phone: '',
			country: '',
			sex: '',
			CNP: '',
			age: '',
			degree: '',
			email: '',
			file: {},
			url: '',
		};
		this.handleUpload = this.handleUpload.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getProfilePic = this.getProfilePic.bind(this);
	}
	handleChange(e) {
		this.setState({ file: e.target.files[0] });
		console.log(e.target.files[0]);
		console.log(this.state.file);
	}

	handleUpload(e) {
		e.preventDefault();
		const ref = storage.ref(
			`/images/${this.state.user.uid}/ProfilePic/${this.state.file.name}`
		);
		const uploadTask = ref.put(this.state.file);
		uploadTask.on('state_changed', console.log, console.error, () => {
			ref.getDownloadURL().then((url) => {
				this.setState({ file: null });
				this.setState({ url: url });
			});
		});
	}

	getProfilePic() {
		if (this.state.file) {
			const listRef = ref(storage, `images/${this.state.user.uid}/ProfilePic`);

			listAll(listRef).then((res) => {
				console.log(res);
				console.log(this.state.url);
			});
		}
		if (this.state.url) return this.state.url;
		else return noprof;
	}
	async fetchUserDetails() {
		if (this.state.user)
			try {
				const query = await db
					.collection('users')
					.where('uid', '==', this.state.user.uid)
					.get();
				const data = query.docs[0].data();
				this.setState({ name: data.name || '' });
				this.setState({ age: data.age || '' });
				this.setState({ sex: data.sex || '' });
				this.setState({ degree: data.degree || '' });
				this.setState({ CNP: data.CNP || '' });
				this.setState({ email: data.email || '' });
				this.setState({ country: data.country || '' });
				this.setState({ phone: data.phone || '' });
			} catch (e) {
				console.log(e);
				alert('Error fetching user data');
			}
	}

	awaitUser() {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				this.setState({ user: user });
				await this.fetchUserDetails();
			} else {
				return <Navigate to={'/home'} />;
			}
		});
	}
	componentDidMount() {
		this.awaitUser();
	}
	render() {
		return (
			<div className='dashUnderNav'>
				<div className='row2'>
					<div className='column25'>
						<div>
							<form onSubmit={this.handleUpload}>
								<input
									type='file'
									onChange={this.handleChange}
									accept='image/*'
								/>
								<button onClick={this.getProfilePic}>upload to firebase</button>
							</form>
							<img
								src={this.state.url || noprof}
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
											value={this.state.name || ''}
											onChange={(e) => this.setState({ name: e.target.value })}
										/>
									</div>
									<div className='row mrg'>
										<label>Email</label>
										<input
											type='text'
											value={this.state.email || ''}
											onChange={(e) => this.setState({ email: e.target.value })}
										/>
									</div>
									<div className='row mrg'>
										<label>CNP</label>
										<input
											type='text'
											value={this.state.CNP || ''}
											onChange={(e) => this.setState({ CNP: e.target.value })}
										/>
									</div>
									<div className='row mrg'>
										<label>Age</label>
										<input
											type='text'
											value={this.state.age || ''}
											onChange={(e) => this.setState({ age: e.target.value })}
										/>
									</div>
								</div>
								<div className='column50 right'>
									<div className='row mrg'>
										<label>Sex</label>
										<input
											type='text'
											value={this.state.sex || ''}
											onChange={(e) => this.setState({ sex: e.target.value })}
										/>
									</div>
									<div className='row mrg'>
										<label>Degree</label>
										<input
											type='text'
											value={this.state.degree || ''}
											onChange={(e) =>
												this.setState({ degree: e.target.value })
											}
										/>
									</div>
									<div className='row mrg'>
										<label>Country</label>
										<input
											type='text'
											value={this.state.country || ''}
											onChange={(e) =>
												this.setState({ country: e.target.value })
											}
										/>
									</div>
									<div className='row mrg'>
										<label>Phone</label>
										<input
											type='text'
											value={this.state.phone || ''}
											onChange={(e) => this.setState({ phone: e.target.value })}
										/>
									</div>
								</div>
							</div>
							<div className='btnflex'>
								<button className='dreapta' type='submit'>
									submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
