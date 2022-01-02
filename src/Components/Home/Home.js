import React from 'react';
import eu from '../../images/eu.png';
class Home extends React.Component {
	render() {
		return (
			<div className='mijloc'>
				<h1>
					"Sănătatea e ca banii, niciodată nu vom avea o adevărată idee de
					valoarea sa până când o vom pierde." <br />
					<br />
					<h2>Constantin Dragos-Gabriel</h2>
					<h4>PhD in Epidemiology and Biomedical Data Science</h4>
				</h1>
				<br />

				<img src={eu} alt='tot eu' />
			</div>
		);
	}
}

export default Home;
