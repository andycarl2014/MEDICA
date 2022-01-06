//import * as firebase from 'firebase/app';

import firebase from 'firebase/compat/app';

import 'firebase/compat/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const firebaseConfig = {
	apiKey: 'AIzaSyBLv182OoQ61G4SJSgpqKNgkhXbuU0Io04',
	authDomain: 'licenta-auth.firebaseapp.com',
	projectId: 'licenta-auth',
	storageBucket: 'licenta-auth.appspot.com',
	messagingSenderId: '657323896323',
	appId: '1:657323896323:web:ffcd3fbddf9b9438c7a836',
	measurementId: 'G-WEYSELDYB3',
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const storage = app.storage();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
	try {
		const res = await auth.signInWithPopup(googleProvider);
		const user = res.user;
		const query = await db
			.collection('users')
			.where('uid', '==', user.uid)
			.get();
		if (query.docs.length === 0) {
			await db.collection('users').doc(user.uid).set({
				uid: user.uid,
				name: user.displayName,
				authProvider: 'google',
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const signInWithEmailAndPassword = async (email, password) => {
	try {
		await auth.signInWithEmailAndPassword(email, password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await auth.createUserWithEmailAndPassword(email, password);
		const user = res.user;
		await db.collection('users').doc(user.uid).set({
			uid: user.uid,
			name,
			authProvider: 'local',
			email,
		});
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const sendPasswordResetEmail = async (email) => {
	try {
		await auth.sendPasswordResetEmail(email);
		alert('Password reset link sent!');
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const signInWithFacebook = async () => {
	try {
		const res = await auth.signInWithPopup(facebookProvider);
		const user = res.user;
		const query = await db
			.collection('users')
			.where('uid', '==', user.uid)
			.get();
		if (query.docs.length === 0) {
			await db.collection('users').doc(user.uid).set({
				uid: user.uid,
				name: user.displayName,
				authProvider: 'facebook',
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const updateUserDatabase = async (data) => {
	try {
		db.collection('users').doc(data.user.uid).update({
			name: data.name,
			email: data.email,
			CNP: data.CNP,
			age: data.age,
			sex: data.sex,
			degree: data.degree,
			country: data.country,
			phone: data.phone,
		});
	} catch (err) {
		alert(err.message);
	}
};
const abcd = async (user) => {};
const logout = () => {
	auth.signOut();
};

const abcd2 = onAuthStateChanged(auth, (user) => {
	if (user) return 'user';
});
export {
	auth,
	db,
	storage,
	abcd2,
	updateUserDatabase,
	abcd,
	signInWithGoogle,
	signInWithEmailAndPassword,
	signInWithFacebook,
	registerWithEmailAndPassword,
	sendPasswordResetEmail,
	logout,
};
