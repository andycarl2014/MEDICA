import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Navbarr from './Components/Navbar/Navbar';
import Register from './Components/Register/Register';
class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<Router basename='/bagpl'>
					<Navbarr />
					<Routes>
						<Route exact path='bagpl/' element={<Home />} />
						<Route exact path='bagpl/register' element={<Register />} />
						<Route exact path='bagpl/login' element={<Login />} />
						<Route exact path='bagpl/dashboard' element={<Dashboard />} />
						<Route exact path='bagpl/home' element={<Home />} />
					</Routes>
				</Router>
			</div>
		);
	}
}

export default App;
