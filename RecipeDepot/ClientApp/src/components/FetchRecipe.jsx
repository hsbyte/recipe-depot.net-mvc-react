import React, { Component } from 'react';
import { Image, Col, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './FetchRecipe.css';

export default class FetchRecipe extends Component {
  displayName = FetchRecipe.name

  constructor(props) {
    super(props);
		this.state = {
			email: "",
			password: "",
			recipes: [],
			isLoading: true
		};

    fetch('api/Recipes')
      .then(response => response.json())
      .then(data => {
        this.setState({ recipes: data, isLoading: false });
			});
		console.log(this.state);
  }

  renderRecipeList(recipes) {
		return (
			<Row>
				{recipes.map(recipe =>
					<Col xs={6} sm={4} md={3} key={recipe.id} className='col-padding'>
						<Link to={{
							pathname: '/detail',
							recipeId: recipe.id,
							action: 'Show'
						}}>
							<Image src={recipe.imageUrl} thumbnail />
						</Link>
					</Col>
					)}
			</Row>
		);
  }

  DeleteItem(id) {
    fetch('api/Recipes/Delete/' + id, {
        method: 'delete'
    })
      .then(data => {
				this.setState(
					{
						recipes: this.state.recipes.filter( asset => {
								return (asset.RecipeId !== id);
						})
					});
      });
  }

  EditItem(id) {
    //this.props.history.push("/recipes/edit/" + id);
  }

  render() {
    let contents = this.state.isLoading
        ? <p><em>isLoading...</em></p>
        : this.renderRecipeList(this.state.recipes);

		return (
			<Grid className="RecipeBoard">
        <h1>Recipe Collections</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </Grid>
    );
  }
}
