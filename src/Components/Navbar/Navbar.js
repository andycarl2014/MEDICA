import React from 'react';
import logo1 from '../../images/logo2.png';
import { logout } from '../db/firebase';
import { Container, Navbar, Nav } from 'react-bootstrap';
function Navbarr() {
	return (
		<Navbar className='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
			<Container>
				<Navbar.Brand href='#/dashboard'>
					<img
						src={logo1}
						alt='logo'
						className='logo'
						style={{ width: '150px', height: '150px' }}
					></img>
				</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='#/dashboard'>Home</Nav.Link>
					<Nav.Link href='#/profile'>Profile</Nav.Link>
					<Nav.Link href='#' onClick={logout}>
						Logout
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
}
export default Navbarr;
