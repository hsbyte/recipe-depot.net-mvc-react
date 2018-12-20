import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import Loading from '../components/Loading';
import './Recipe.css';
import { renderCatalog } from './SharedMethods';

export default class RecipeCatalog extends Component {
	displayName = RecipeCatalog.name

  constructor(props) {
    super(props);
		this.state = {
			recipes: [],
			isLoading: true,
		};

		fetch('api/Recipes')
      .then(response => response.json())
      .then(data => {
        this.setState({ recipes: data, isLoading: false });
			}
		);
  }

	render() {
		let contents = this.state.isLoading
			? <Loading loadingText="Loading"></Loading>
			: renderCatalog(this.state.recipes);

		return (
			<Grid className="RecipeBoard">
				<Row className="wrapper">
					<h1>Recipe Collections</h1>
					<p>Find, share and discover everyday cooking recipes based on the food you love and the friends you follow.</p>
					{contents}
				</Row>
			</Grid>
		)
	}
}
