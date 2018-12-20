import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import Loading from '../components/Loading';
import './Recipe.css';
import { renderCatalog } from './SharedMethods';

export default class RecipesByAuthor extends Component {
	displayName = RecipesByAuthor.name

	constructor(props) {
		super(props);
		this.state = {
			recipes: [],
			isLoading: true,
		};

		fetch('api/Recipes/email/' + (props.location.search).substr(1, (props.location.search).length))
			.then(response => response.json())
			.then(data => {
				this.setState({ recipes: data, isLoading: false });
			});
	}

	render() {
		let contents = this.state.isLoading
			? <Loading loadingText="Loading"></Loading>
			: renderCatalog(this.state.recipes);

		return (
			<Grid className="RecipeBoard">
				<Row className="wrapper">
					<h1>Recipe Collections</h1>
					<p>Cooking recipes featured on {sessionStorage.getItem('name')}’s kitchen table.</p>
					{contents}
				</Row>
			</Grid>
		)
	}
}