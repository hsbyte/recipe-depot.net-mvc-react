import React, { Component } from 'react';
import {
	Form,
	FormControl,
	FormGroup,
	ControlLabel,
	Button, Image, Col, Grid, Row, Glyphicon
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Loading from '../components/Loading';
import List from '../components/List';
import ImageUploader from '../components/ImageUploader';
import {
	getStaticList,
	apiCRUD,
	parseNewLine, parseToList, parseToArray,
	averageRating, getDateString
} from './SharedMethods';
import './HandlerRecipe.css';

export default class HandlerRecipe extends Component {
	displayName = HandlerRecipe.name

	constructor(props) {
		super(props);
		this.state = {
			action: props.location.action,
			recipe: [],
			isLoading: true,
		};
		getStaticList('dishType', 'api/DishTypes');
		getStaticList('mainIngredients', 'api/MainIngredients');
		getStaticList('seasons', 'api/Seasons');
		if (this.state.action !== "Create") {
			(props.location.recipeId === undefined)
				? sessionStorage.getItem('recipeId')
				: sessionStorage.setItem('recipeId', props.location.recipeId);
			//if (sessionStorage.getItem('recipeId') === null || this.state.action === undefined)
			//	window.location.href = '/';
			fetch('api/Recipes/' + sessionStorage.getItem('recipeId'))
				.then(response => response.json())
				.then(data => {
					this.setState({ recipe: data, isLoading: false });
				});
		}
		else {
			this.state = {
				action: props.location.action,
				recipe: {
					shared: true,
					title: '',
					description: '',
					ingredients: '',
					steps: '',
					imageUrl: '',
					cookTime: 0,
					prepTime: 0,
					dishType: '',
					mainIngredient: '',
					seasons: '',
					modified: "",
					email: sessionStorage.getItem('user'),
					patron: {
						avatarUrl: sessionStorage.getItem('avatar'),
						email: sessionStorage.getItem('user'),
						name: sessionStorage.getItem('name')
					},
					reviews: []
				},
				isLoading: false
			}
		}
	}

	handleChange = ev => {
		this.setState({
			recipe: {
				...this.state.recipe, [ev.target.id]: ev.target.value
			}
		});
	}

	handleSave = async ev => {
		ev.preventDefault();
		let data = this.state.recipe;
		// Eliminate attributes that can cause 400-bad request
		delete data.patron;
		delete data.reviews;
		delete data.modified;
		delete data.created;
		if (sessionStorage.getItem('imgTemp'))
			data.imageUrl = '/img/catalog/' + sessionStorage.getItem('imgTemp');
		this.removeTempImages();
		let method = 'POST',
				api = 'api/Recipes/create';
		if (this.state.action === 'Edit') {
			method = 'PUT';
			api = 'api/Recipes/update/' + sessionStorage.getItem('recipeId');
		}
		apiCRUD(api, method, JSON.stringify(data));
		let file = document.querySelector('input[type=file]').files[0];
		if (file) {
			let formData = new FormData();
			formData.append("file", file);
			apiCRUD('api/image/catalog', 'POST', formData);
			apiCRUD('api/image/delete/' + (data.imageUrl).replace(/\//g, '='), 'DELETE', null);
		}
		this.props.history.push("/gallery");
	}

	removeTempImages = () => {
		sessionStorage.removeItem('formData');
		sessionStorage.removeItem('imgBin');
		sessionStorage.removeItem('imgBinTemp');
		sessionStorage.removeItem('imgTemp');
	}

	handleCancel = ev => {
		this.removeTempImages();
		this.props.history.push("/gallery");
	}

	handleDelete = ev => {
		ev.preventDefault();
		apiCRUD('api/Recipes/delete/' + this.state.recipe.recipeId, 'DELETE', null)
			.then(() => this.props.history.push("/gallery"));
	}

	renderDetails() {
		return (
			<div>
				<Form onSubmit={this.handleSave}>
					<Row>
						{/* Recipe photo */}
						<Col xs={12} sm={12} md={6}>
							{this.state.action !== "Show"
								? <div>
										<ControlLabel>Recipe photo</ControlLabel>
										<ImageUploader
										id="imageUrl"
										imgfile={this.state.recipe.imageUrl} />
									</div>
								:	<Image src={this.state.recipe.imageUrl} responsive />
							}
						</Col>
						{/* Recipe title */}
						<Col xs={12} sm={12} md={6}>
							{this.state.action !== "Show"
							? <FormGroup controlId="title">
									<ControlLabel>Recipe Title</ControlLabel>
									<FormControl
										autoFocus
										bsSize="large"
										type="text"
										placeholder="Enter title"
										value={this.state.recipe.title}
										onChange={this.handleChange}
									/>
								</FormGroup>
							: <h1>{this.state.recipe.title}</h1>
							}

							{/* Author of the recipe */}
							<div className="author">
								<Link to={{
									pathname: '/gallerybyauthor',
									search: this.state.recipe.email
								}}
								>
									{this.state.recipe.patron.avatarUrl
										? <Image src={this.state.recipe.patron.avatarUrl 
											? this.state.recipe.patron.avatarUrl : sessionStorage.getItem('avatar')
											} circle responsive />
									: <Glyphicon glyph="user" className="glyph" />
									}
									&nbsp;
								</Link>

								<div>
									<p className="star-rating">{('★').repeat(averageRating(this.state.recipe.reviews))}</p>
									<h4>Recipe by {this.state.recipe.patron.name}</h4>
								</div>
							</div>

							{this.state.action !== "Show"
							? <FormGroup controlId="description">
									<FormControl
										bsSize="large"
										componentClass="textarea"
										placeholder="Enter short description"
										value={this.state.recipe.description}
										onChange={this.handleChange}
									/>
								</FormGroup>
							: <p>{this.state.recipe.description}</p>
							}

							{/* Main ingredient, seasons and dish type */}
							{this.state.action !== "Show"
							? <div>
									<FormGroup controlId="mainIngredient">
										<ControlLabel>Main Ingredient</ControlLabel>
										<FormControl
											bsSize="large"
											value={this.state.recipe.mainIngredient}
											onChange={this.handleChange}
											componentClass="select">
											{parseToArray(sessionStorage.getItem('mainIngredients')).map((item, index) =>
												<option key={index}>{item}</option>
											)}
										</FormControl>
									</FormGroup>

									<FormGroup controlId="seasons">
										<ControlLabel>Season</ControlLabel>
										<FormControl
											bsSize="large"
											value={this.state.recipe.seasons}
											onChange={this.handleChange}
											componentClass="select">
											{parseToArray(sessionStorage.getItem('seasons')).map((item, index) =>
												<option key={index}>{item}</option>
											)}
										</FormControl>
									</FormGroup>

									<FormGroup controlId="dishType">
										<ControlLabel>Dish Type</ControlLabel>
										<FormControl
											bsSize="large"
											value={this.state.recipe.dishType}
											onChange={this.handleChange}
											componentClass="select">
											{parseToArray(sessionStorage.getItem('dishType')).map((item, index) =>
												<option key={index}>{item}</option>
											)}
										</FormControl>
									</FormGroup>
								</div>
							: <p>
									<strong>Main Ingredient:</strong> {this.state.recipe.mainIngredient}<br />
									<strong>Season:</strong> {this.state.recipe.seasons}<br />
									<strong>Dish:</strong> {this.state.recipe.dishType}
								</p>
							}

							{/* Prep and cook time */}
							<div className="inline">
								<span className="glyphicon glyphicon-cutlery"></span>&nbsp;&nbsp;
								{this.state.action !== "Show"
									? <FormGroup controlId="prepTime">
										<FormControl
											bsSize="large"
											type="text"
											value={this.state.recipe.prepTime}
											onChange={this.handleChange}
											style={{ width: 60 }}
										/>
									</FormGroup>
									: <span>{this.state.recipe.prepTime}</span>
								}
								&nbsp;mins.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<span className="glyphicon glyphicon-time"></span>&nbsp;&nbsp;
								{this.state.action !== "Show"
								? <FormGroup controlId="cookTime">
										<FormControl
											bsSize="large"
											type="text"
											value={this.state.recipe.cookTime}
											onChange={this.handleChange}
											style={{ width: 60 }}
										/>
									</FormGroup>
								: <span>{this.state.recipe.cookTime}</span>
								}
								&nbsp;mins.
							</div>
							</Col>
					</Row>
					{/* Ingredients */}
					<Row>
						<Col xs={12} sm={12} md={6} className="ingredients">
							<h3>Ingredients</h3>
							{this.state.action !== "Show"
								? <FormGroup controlId="ingredients">
									<FormControl
										bsSize="large"
										componentClass="textarea"
										placeholder="Put each ingredients on its own line"
										value={this.state.recipe.ingredients}
										onChange={this.handleChange}
										style={{ height: 150 }}
									/>
								</FormGroup>
								: <List lineItem={parseToList(this.state.recipe.ingredients)}></List>
							}
						</Col>

						{/* Steps */}
						<Col xs={12} sm={12} md={6} className="steps">
							<h3>Steps</h3>
							{this.state.action !== "Show"
								? <FormGroup controlId="steps">
									<FormControl
										bsSize="large"
										componentClass="textarea"
										placeholder="Enter short steps or methods"
										value={this.state.recipe.steps}
										onChange={this.handleChange}
										style={{ height: 150 }}
									/>
								</FormGroup>
								: parseNewLine(this.state.recipe.steps)
							}
						</Col>
					</Row>
					{/* Buttons */}
					<Row>
					{this.state.action !== "Show"
						? <Col xs={12} sm={12} md={12} >
								<Button type="submit" bsSize="large" className="save-button">Save Changes</Button>{'  '}
								<Button onClick={this.handleCancel} bsSize="large">Cancel</Button><br /><br />
								{this.state.action === "Edit"
								? <div>
										<Button onClick={this.handleDelete} bsSize="large" className="delete-button">Delete Repository</Button>&nbsp;&nbsp;&nbsp;
										<ControlLabel style={{ color: 'red' }}>Once you delete a repository, there is no going back. Please be certain.</ControlLabel>
									</div>
								: ''
								}
							</Col>
						: ''
						}
					</Row>
				</Form>
				{/* Comments */}
				<Row>
					<Col xs={12} sm={12} md={12} className="reviews">
							<h3>Comments</h3>
						<div>
							{this.state.recipe.reviews.map((asset) =>
								<p key={asset.id}>
									<Link to={{
										pathname: '/gallerybyauthor',
										search: asset.email
									}} >
										<Image src={asset.patron.avatarUrl} circle />
									</Link>
									&nbsp;&nbsp;&nbsp;
									<strong>{asset.patron.name}</strong><br />
									<span className="star-rating">{('★').repeat(asset.rating)}</span><br />
									{getDateString(asset.created)}<br />
									{asset.comment}
								</p>
							)}
							<p id="addComment"></p>
							<p></p>
						</div>
					</Col>
				</Row>
				{this.state.action === "Show" && sessionStorage.getItem('user')
					? <Form onSubmit={this.handleSaveComment}>
							<Row>
								<Col xs={12} sm={12} md={12} className="reviews">
									<FormGroup controlId="comment">
										<ControlLabel>Comments</ControlLabel>
										<FormControl
										bsSize="large"
										componentClass="textarea"
										placeholder="Give comments" />
									</FormGroup>

									<FormGroup controlId="rating">
										<ControlLabel>Rating</ControlLabel>
										<FormControl
										bsSize="large"
										componentClass="select"
										style={{ width: 75 }} >
											<option value="0">0</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</FormControl>
									</FormGroup>
									<Button type="submit" bsSize="large" className="save-button">Save Comment</Button>{'  '}
									<Button onClick={this.handleCancel} bsSize="large">Close</Button>
								</Col>
							</Row>
						</Form>
					: <p></p>
				}
			</div>
		)
  }

	handleSaveComment = async e => {
		e.preventDefault();
		let newReview = {
			recipeId: sessionStorage.getItem('recipeId'),
			email: sessionStorage.getItem('user'),
			comment: document.querySelector('#comment').value,
			rating: document.querySelector('#rating').value
		},
			elem = document.getElementById('addComment'),
			preHtml = `<image src=${sessionStorage.getItem('avatar')} class="img-circle" />
				&nbsp;&nbsp;&nbsp;<strong>${sessionStorage.getItem('name')}</strong><br />
				<span class="star-rating">${('★').repeat(newReview.rating)}</span><br />
				${getDateString(new Date())}<br />${newReview.comment}`;
		elem.insertAdjacentHTML('afterend', preHtml);
		apiCRUD('api/Reviews/post', 'POST', JSON.stringify(newReview));
	}

	render() {
		let contents = this.state.isLoading
			? <Loading loadingText="Loading"></Loading>
			: this.renderDetails(this.state.recipe);
		return (
			<Grid className="RecipeBoard" >
				<Row className="wrapper">{contents}</Row>
			</Grid>
		);
	}
}
