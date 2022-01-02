import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Navbarr from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
class App extends React.Component {
	render() {
		return (
			<div className='App container'>
				<Router basename='/'>
					<Navbarr />
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route exact path='/register' element={<Register />} />
						<Route exact path='/login' element={<Login />} />
						<Route exact path='/dashboard' element={<Dashboard />} />
						<Route exact path='/home' element={<Home />} />
						<Route exact path='/profile' element={<Profile />} />
					</Routes>
				</Router>
			</div>
		);
	}
}

export default App;
