import React from 'react';
import { Image, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const renderCatalog = recipes => {
	sessionStorage.removeItem('recipeId');
	return (
		<Row>
			{recipes.length === 0 ? <p className="no-recipes">No recipes are<br />currently available.</p> : ''}
			{recipes.map(asset =>
				<Col xs={6} sm={4} md={3} key={asset.id} className='col-padding' >
					<div className='link-container'>
						<Image src={asset.imageUrl} thumbnail />
						<div className="overlay">
								<ul>
									<li>
										<Link to={{
											pathname: '/detail',
											recipeId: asset.id,
											action: 'Show'
										}}>
											Show
										</Link>
									</li>
								{sessionStorage.getItem('user') === asset.email
									? <li>
											<Link to={{
												pathname: '/detail',
												recipeId: asset.id,
												action: 'Edit'
											}}>
												Edit
											</Link>
										</li>
									: ''
								}
								</ul>
						</div>
					</div>
				</Col>
			)}
		</Row>
	);
}

export const apiCRUD = (api, method, data) => {
	let settings = method === 'POST'
		? {
				method: method,
				headers: [
					["Content-Type", "application/json"]
				],
				credentials: "include",
				body: data
			}
		: {
				method: method,
				headers: [
					["Content-Type", "application/json"],
					["Content-Type", "text/plain"]
				],
				credentials: "include",
				body: data
		};
	if (method === 'POST' && api.search("image") > 0)
		delete settings.headers;
	if (data)
		return fetch(api, settings);
	else
		return fetch(api, { method: method }).then(res => res.json());
}

export const getStaticList = (storage, api) => {
	fetch(api)
		.then(response => response.json())
		.then(data => {
			let item = '';
			data.map(asset => item += ',' + asset.description);
			sessionStorage.setItem([storage], item);
		});
}

export const parseToList = string => {
	return (string.split(String.fromCharCode(10))).map((asset, index) => (<li key={index}>{asset}</li>))
}

export const parseNewLine = string => {
	return (string.split(String.fromCharCode(10))).map((asset, index) => (<p key={index}>{asset}</p>))
}

export const parseToArray = string => {
	return (string.substr(1, string.length)).split(',')
}

export const averageRating = rating => {
	let average = 0;
	for (let i = 0; i < rating.length; i++)
		average += rating[i]['rating'];
	return average / rating.length;
}

export const getDateString = date => {
	let monthlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	date = new Date(date);
	return monthlist[date.getMonth()] + ' ' + date.getDay() + ', ' + date.getFullYear();
}
