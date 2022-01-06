import React, { Component } from 'react';
import parse from 'html-react-parser';
export default class FetchDataFromRSSFeed extends Component {
	constructor() {
		super();
		this.state = {
			recentBlogPost: [],
		};
	}

	async FetchDataFromRssFeed() {
		const request = new XMLHttpRequest();
		request.onreadystatechange = () => {
			if (request.status === 200) {
				const myObj = request.responseText;

				for (let i = 0; i < 1; i++) {
					this.setState({
						recentBlogPost: {
							name: JSON.parse(myObj).items[i].title,
							url: JSON.parse(myObj).items[i].link,
						},
					});
				}
			}
		};

		try {
			const response = await fetch(
				'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.modernhealthcare.com%2Fsection%2Frss%2Fnews%3Fdays%3D7%26topics%3D81631'
			);
			const data = await response.text();
			if (data) {
				const jsondata = JSON.parse(data);

				const length = jsondata.items.length;
				for (let i = 0; i < length; i++) {
					this.setState({
						recentBlogPost: [
							...this.state.recentBlogPost,
							{
								name: jsondata.items[i].title,
								url: jsondata.items[i].link,
								content: jsondata.items[i].content,
							},
						],
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	componentDidMount() {
		this.FetchDataFromRssFeed();
	}

	render() {
		return (
			<div style={{ marginTop: '150px', marginBottom: '150px' }}>
				{this.state.recentBlogPost.map((item) => {
					return (
						<div
							className='row'
							style={{ border: '1px solid black' }}
							key={item.name}
						>
							<h1>{item.name}</h1>
							{parse(item.content)}
						</div>
					);
				})}
			</div>
		);
	}
}
