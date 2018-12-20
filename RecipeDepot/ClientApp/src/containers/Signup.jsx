/* Sign up container */
import React, { Component } from "react";
import { FormGroup, FormControl, Image, Row } from "react-bootstrap";
import SubmitButton from "../components/SubmitButton";
import { apiCRUD } from "./SharedMethods";

export default class Signup extends Component {
	displayName = Signup.name

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			name: "",
			email: "",
			passwd: "",
			confirmPassword: "",
			confirmationCode: "",
			newUser: null,
			error: ''
		};
	}

	validateForm() {
		return (
			this.state.name.length > 0 &&
			this.state.email.length > 0 &&
			this.state.passwd.length > 0 &&
			this.state.passwd === this.state.confirmPassword
		);
	}

	handleChange = ev => {
		this.setState({ [ev.target.id]: ev.target.value });
	}

	handleSubmit = async ev => {
		ev.preventDefault();
		this.setState({ isLoading: true });
		try {
			let newUser = {
				name: this.state.name,
				email: this.state.email,
				passwd: this.state.passwd,
				bio: "",
				active: true,
				online: true,
				facebook: "",
				twitter: "",
				pinterest: "",
				instagram: ""
			};
			apiCRUD('api/patrons/create', 'POST', JSON.stringify(newUser))
				.then(response => response.json())
				.error(e =>
					this.setState({
						error: "Oops! Something went wrong. Please try again, or contact Customer Support if you need help."
					})
				);
		}
		catch (e) {
			//this.setState({ error: e.message });
		}
		this.setState({ isLoading: false });
		this.props.history.push("/login")
	}

	renderForm() {
		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="name" bsSize="large">
					<FormControl
						autoFocus
						type="text"
						placeholder="Name"
						value={this.state.name}
						onChange={this.handleChange} />
				</FormGroup>
				<FormGroup controlId="email" bsSize="large">
					<FormControl
						type="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<FormGroup controlId="passwd" bsSize="large">
					<FormControl
						value={this.state.passwd}
						onChange={this.handleChange}
						placeholder="Password"
						type="password"
					/>
				</FormGroup>
				<FormGroup controlId="confirmPassword" bsSize="large">
					<FormControl
						value={this.state.confirmPassword}
						onChange={this.handleChange}
						placeholder="Confirm your password"
						type="password"
					/>
				</FormGroup>
				<SubmitButton
					block
					bsSize="large"
					disabled={!this.validateForm()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Signup"
					loadingText="Signing up…" />
			</form>
		);
	}

	render() {
		return (
			<Row className="Signup">
				<div className="wrapper">
					<Image src={'/asset/logo.svg'} circle />
					<p className="error-message">{this.state.error}</p>
					<h3>Sign up</h3>
					{this.renderForm()}
				</div>
			</Row>
		);
	}
}
