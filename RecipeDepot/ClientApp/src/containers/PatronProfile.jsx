/* Sign up container */
import React, { Component } from "react";
import {
	Form,
	FormControl,
	FormGroup,
	Button,
	ControlLabel,
	Grid, Col, Row
} from "react-bootstrap";
import Loading from '../components/Loading';
import ImageUploader from '../components/ImageUploader';
import { apiCRUD } from './SharedMethods';
import "./PatronProfile.css";

export default class Signup extends Component {
	displayName = Signup.name

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			email: sessionStorage.getItem('user'),
			name: sessionStorage.getItem('name'),
			avatar: sessionStorage.getItem('avatar'),
			user: {
					email: "",
					name: "",
					avatarUrl: "",
					passwd: "",
					bio: "",
					active: true,
					online: true,
					facebook: "",
					twitter: "",
					pinterest: "",
					instagram: "",
					created: "",
					modified: ""
			}
		};

		fetch('api/Patrons/' + this.state.email)
			.then(response => response.json())
			.then(data => {
				sessionStorage.setItem('avatar', data.avatarUrl);
				this.setState({
					avatar: data.avatarUrl,
					user: data,
					isLoading: false
				})
			});
	}

	// Handlers
	handleChange = event => {
		this.setState({
			user: {
				...this.state.user, [event.target.id]: event.target.value
			}
		});
	}

	handleDelete = async () => {
		apiCRUD('api/patrons/delete/' + sessionStorage.getItem('user'), 'DELETE', null);
		if (this.state.avatar !== null)
			apiCRUD('api/image/delete/' + (this.state.avatar).replace(/\//g, '='), 'DELETE', null);
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('name');
		sessionStorage.removeItem('avatar');
		sessionStorage.removeItem('imgTemp');
		this.props.history.push("/login");
	}

	handleSubmit = ev => {
		ev.preventDefault();
		let data = this.state.user;
		data.avatarUrl = (this.state.avatarUrl
			? this.state.avatarUrl
			: '/img/patrons/'+sessionStorage.getItem('imgTemp'));
		sessionStorage.setItem('avatar', data.avatarUrl);
		apiCRUD('api/patrons/update/' + data.email, 'PUT', JSON.stringify(data));
		let file = document.querySelector('input[type=file]').files[0];
		if (file !== undefined) {
			let formData = new FormData();
			formData.append("file", document.querySelector('input[type=file]').files[0]);
			apiCRUD('api/image/patrons', 'POST', formData);
			apiCRUD('api/image/delete/' + (this.state.avatarUrl).replace(/\//g, '='), 'DELETE', null);
		}
		//this.props.history.push("/");
		window.location.href = "/";
	}

	renderProfile() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Row>
					<Col xs={12} sm={7} md={7}>
						<FormGroup controlId="name">
							<ControlLabel>Full name</ControlLabel>
							<FormControl
								autoFocus
								bsSize="large"
								type="text"
								placeholder="Full name"
								value={this.state.user.name}
								onChange={this.handleChange}
							/>
						</FormGroup>
						<FormGroup controlId="bio" bsSize="large">
							<ControlLabel>What I do</ControlLabel>
							<FormControl
								type="text"
								value={this.state.user.bio}
								onChange={this.handleChange}
								placeholder="What I do"
							/>
						</FormGroup>
						<FormGroup controlId="email" bsSize="large" style={{ "display": "none" }}>
							<ControlLabel>Email address</ControlLabel>
							<FormControl
								type="email"
								value={this.state.user.email}
								onChange={this.handleChange}
								placeholder="Email"
							/>
						</FormGroup>
						<FormGroup controlId="facebook" bsSize="large">
							<ControlLabel>Facebook</ControlLabel>
							<FormControl
								type="text"
								value={this.state.user.facebook}
								onChange={this.handleChange}
								placeholder="Facebook"
							/>
						</FormGroup>
						<FormGroup controlId="instagram" bsSize="large">
							<ControlLabel>Instagram</ControlLabel>
							<FormControl
								type="text"
								value={this.state.user.instagram}
								onChange={this.handleChange}
								placeholder="Instagram"
							/>
						</FormGroup>
						<FormGroup controlId="pinterest" bsSize="large">
							<ControlLabel>Pinterest</ControlLabel>
							<FormControl
								type="text"
								value={this.state.user.pinterest}
								onChange={this.handleChange}
								placeholder="Pinterest"
							/>
						</FormGroup>
						<FormGroup controlId="twitter" bsSize="large">
							<ControlLabel>Twitter</ControlLabel>
							<FormControl
								type="text"
								value={this.state.user.twitter}
								onChange={this.handleChange}
								placeholder="Twitter"
							/>
						</FormGroup>
					</Col>
					<Col xs={12} sm={5} md={5}>
						<ImageUploader
							id="imageFile"
							imgfile={this.state.avatar}
						/>
					</Col>
				</Row>

				<Row className="buttons-right">
					<Col sm={12}>
						<Button type="submit" bsSize="large" className="save-button">Save Changes</Button>{'  '}
						<Button type="submit" bsSize="large">Cancel</Button>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<Button onClick={this.handleDelete} bsSize="large" className="delete-button">Delete Repository</Button>
						<ControlLabel style={{ color: 'red' }}><br />Once you delete your profile, there is no going back. Please be certain.</ControlLabel>
					</Col>
				</Row>
			</Form>
		);
	}

	render() {
		let contents = this.state.isLoading
			? <Loading loadingText="Loading"></Loading>
			: this.renderProfile();

		return (
			<Grid className="PatronProfile">
				<Row className="wrapper">
					<h1>Your profile</h1>
					{contents}
				</Row>
			</Grid>
		);
	}
}