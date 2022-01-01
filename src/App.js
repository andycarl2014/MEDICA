import React from 'react';
import { Link } from 'react-router-dom';
function App() {
	return (
		<div>
			<nav>
				<ul id='navigation'>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/about'>About</Link>
					</li>
					<li>
						<Link to='/contact'>Contact</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default App;
