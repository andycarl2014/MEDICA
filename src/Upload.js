import React, { useState } from 'react';
import { storage } from './Components/extras/db/firebase';

export default function Upload() {
	const [file, setFile] = useState(null);
	const [url, setURL] = useState('');

	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	function handleUpload(e) {
		e.preventDefault();
		const ref = storage.ref(`/images/${file.name}`);
		const uploadTask = ref.put(file);
		uploadTask.on('state_changed', console.log, console.error, () => {
			ref.getDownloadURL().then((url) => {
				setFile(null);
				setURL(url);
			});
		});
	}

	return (
		<div>
			<form onSubmit={handleUpload}>
				<input type='file' onChange={handleChange} accept='image/*' />
				<button disabled={!file}>upload to firebase</button>
			</form>
			<button>
				<img src={url} alt='' />
			</button>
		</div>
	);
}
