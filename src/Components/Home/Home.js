import React from 'react';
import eu from '../../images/eu.png';
class Home extends React.Component {
	render() {
		return (
			<div className='mijloc'>
				<h1>
					"Sănătatea e ca banii, niciodată nu vom avea o adevărată idee de
					valoarea sa până când o vom pierde." Constantin Dragos
					<br />
					PhD in Epidemiology and Biomedical Data Science
				</h1>
				<img src={eu} alt='tot eu' />
			</div>
		);
	}
}

export default Home;
