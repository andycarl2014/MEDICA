import React from 'react';
import eu from '../../images/eu.png';
class Home extends React.Component {
	render() {
		return (
			<div className='mijloc'>
				<h1>
					"Sănătatea e ca banii, niciodată nu vom avea o adevărată idee de
					valoarea sa până când o vom pierde."
					<h4>
						Constantin Dragos
						<br />
						<h7>PhD in Epidemiology and Biomedical Data Science</h7>
					</h4>
				</h1>
				<img src={eu} />
			</div>
		);
	}
}

export default Home;
