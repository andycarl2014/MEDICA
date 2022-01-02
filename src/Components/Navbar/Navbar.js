import React from 'react';
import logo1 from '../../images/logo2.png';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../extras/db/firebase';

export default function Navbarr() {
	const [user, loading] = useAuthState(auth);
	if (user) {
		return (
			<Navbar className='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
				<Container id='containerNavbar'>
					<Navbar.Brand href='#/dashboard'>
						<img
							src={logo1}
							alt='logo'
							className='logo'
							style={{ width: '125px', height: '125px' }}
						></img>
					</Navbar.Brand>
					<Nav>
						<Nav.Link href='#/dashboard'>Home</Nav.Link>
						<Nav.Link href='#/profile'>Profile</Nav.Link>
						<Nav.Link href='#' onClick={logout}>
							Logout
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		);
	} else {
		return (
			<Navbar className='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
				<Container id='containerNavbar'>
					<Navbar.Brand href='#/dashboard'>
						<img
							src={logo1}
							alt='logo'
							className='logo'
							style={{ width: '125px', height: '125px' }}
						></img>
					</Navbar.Brand>
					<Nav>
						<Nav.Link href='#/login'>Log In</Nav.Link>
						<Nav.Link href='#/register'>Register</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		);
	}
}
