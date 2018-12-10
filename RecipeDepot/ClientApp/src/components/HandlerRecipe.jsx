import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button, Image, Col, Grid, Row } from 'react-bootstrap';
import './HandlerRecipe.css';

export default class HandlerRecipe extends Component {
  displayName = HandlerRecipe.name

  constructor(props) {
		super(props);
		this.state = {
			action: props.location.action,
			recipe: RecipeData,
			loading: true
		};

		let id = props.location.recipeId;
		if (id === undefined)
			window.location.href = "/gallery";

    if (id > 0) {
      fetch('api/Recipes/' + id)
          .then(response => response.json())
          .then(data => {
              this.setState( { action: "Edit", recipe: data, loading: false } );
          });
		}
		else {
			this.state = { action: "Create", loading: false, recipe: RecipeData };
    }
  }

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	renderRecipeItem(recipe) {
		if (recipe === "")
			this.props.history.push("/gallery");

		return (
			<form>
				<Row>
					<Col xs={12} sm={12} md={6}>
						<Image src={recipe.imageUrl} responsive />
					</Col>
					<Col xs={12} sm={12} md={6}>
						<h1>{recipe.title}</h1>
						<div className="author">
							<div>
								<Image src={recipe.patron.avatarUrl} circle responsive />
							</div>
							<div>
								<p className="star-rating">{('★').repeat(this.AverageRating(recipe.reviews))}</p>
								<h4>Recipe by {recipe.patron.firstName + ' ' + recipe.patron.lastName}</h4>
							</div>
						</div>
						<p>{recipe.description}</p>
						<p>
							<strong>Main Ingredient:</strong> {recipe.mainIngredient}<br />
							<strong>Season:</strong> {recipe.seasons}<br />
							<strong>Season:</strong> {recipe.dishType}
						</p>
						<p>
							<span className="glyphicon glyphicon-time"></span> {recipe.cookTime} mins.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<span className="glyphicon glyphicon-cutlery"></span> {recipe.prepTime} mins.
						</p>
					</Col>
				</Row>

				<Row>
					<Col xs={12} sm={12} md={6} className="ingredients">
						<h3>Ingredients</h3>
						<ul>
							{recipe.ingredients.map(asset =>
								<li key={asset.id} >{asset.description}</li>
							)}
						</ul>
					</Col>

					<Col xs={12} sm={12} md={6} className="steps">
						<h3>Steps</h3>
						<p>{recipe.steps}</p>
					</Col>
				</Row>

				<Row>
					<Col xs={12} sm={12} md={12} className="reviews">
						<h3>Reviews</h3>
						<div>
							{recipe.reviews.map((asset, index) =>
								<p key={asset.id}>
									<Image src={asset.patron.avatarUrl} circle />{(' ').repeat(3)}
									<strong>{asset.patron.firstName + ' ' + asset.patron.lastName}</strong><br />
									<span className="star-rating">{('★').repeat(asset.rating)}</span><br />{this.getDateString(asset.created)}<br />
									{asset.comment}
								</p>
							)}
							<br />
						</div>
					</Col>
				</Row>

				<Row>
					<Col xs={12} sm={12} md={12} className="reviews">
						<FormGroup controlId="formControlsTextarea">
							<ControlLabel>Reviews</ControlLabel>
							<FormControl componentClass="textarea" placeholder="" />
						</FormGroup>
						<FormGroup controlId="formControlsSelect" className="rating">
							<ControlLabel>Rating&nbsp;&nbsp;&nbsp;</ControlLabel>
							<FormControl componentClass="select" placeholder="0" className="radio-button">
								<option value="0">0</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</FormControl>
						</FormGroup>
						<Button type="submit">Submit</Button>
					</Col>
				</Row>

			</form>
		);
  }

  render() {
		let contents = this.state.loading
				? <p><em>Loading...</em></p>
				: this.renderRecipeItem(this.state.recipe);

		return (
			<Grid className="RecipeBoard">
				{contents}
			</Grid>
		);
	}

	// Calculate average star rating
	AverageRating(rating) {
		let average = 0;
		for (let i = 0; i < rating.length; i++)
			average += rating[i]['rating'];
		return average / rating.length;
	}

	// Get date string
	getDateString(date) {
		let monthlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		date = new Date(date);
		return monthlist[date.getMonth()] + ' ' + date.getDay() + ', ' + date.getFullYear();
	}
}

var RecipeData = ({
	id: 0,
	shared: 1,
	title: "",
	description: "",
	steps: "",
	imageUrl: "",
	cookTime: "",
	prepTime: "",
	dishType: "",
	mainIngredient: "",
	seasons: "",
	name: "",
	ingredients: ""
})