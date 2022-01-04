import React from 'react';
import { HashRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Navbarr from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import Upload from './Upload';
class App extends React.Component {
	render() {
		return (
			<div className='App container'>
				<Router>
					<Navbarr />
					<Routes>
						<Route exact path='/register' element={<Register />} />
						<Route exact path='/login' element={<Login />} />
						<Route exact path='/dashboard' element={<Dashboard />} />
						<Route exact path='/home' element={<Home />} />
						<Route exact path='/profile' element={<Profile />} />
						<Route exact path='/upload' element={<Upload />} />
						<Route path='/' element={<Home />} />
					</Routes>
				</Router>
			</div>
		);
	}
}

export default App;
