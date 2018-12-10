/* Sign up container */
import React, { Component } from "react";
import { HelpBlock, FormGroup, FormControl, ControlLabel, Image, Row } from "react-bootstrap";
import SubmitButton from "../components/SubmitButton";
import "./Signup.css";

export default class Signup extends Component {
	displayName = Signup.name

	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			email: "",
			password: "",
			confirmPassword: "",
			confirmationCode: "",
			newUser: null
		};
	}

	validateForm() {
		return (
			this.state.email.length > 0 &&
			this.state.password.length > 0 &&
			this.state.password === this.state.confirmPassword
		);
	}

	validateConfirmationForm() {
		return this.state.confirmationCode.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit = async event => {
		event.preventDefault();

		this.setState({ isLoading: true });

		try {
			// Load to LocalStorage method
			const newUser = {
				username: this.state.email,
				password: this.state.password
			};
			this.setState({
				newUser
			});
		} catch (e) {
			alert(e.message);
		}

		this.setState({ isLoading: false });
	}

	handleConfirmationSubmit = async event => {
		event.preventDefault();

		this.setState({ isLoading: true });

		try {
			// Confirm sign up method
			// Sign in and load toLocalStorage

			this.props.userHasAuthenticated(true);
			this.props.history.push("/");
		} catch (e) {
			alert(e.message);
			this.setState({ isLoading: false });
		}
	}
	renderConfirmationForm() {
		return (
			<form onSubmit={this.handleConfirmationSubmit}>
				<FormGroup controlId="confirmationCode" bsSize="large">
					<ControlLabel>Confirmation Code</ControlLabel>
					<FormControl
						autoFocus
						type="tel"
						value={this.state.confirmationCode}
						onChange={this.handleChange} />
					<HelpBlock>Please check your email for the code.</HelpBlock>
				</FormGroup>
				<SubmitButton
					block
					bsSize="large"
					disabled={!this.validateConfirmationForm()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Verify"
					loadingText="Verifying…"
				/>
			</form>
		);
	}

	renderForm() {
		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="email" bsSize="large">
					<ControlLabel>Email</ControlLabel>
					<FormControl
						autoFocus
						type="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<FormGroup controlId="password" bsSize="large">
					<ControlLabel>Password</ControlLabel>
					<FormControl
						value={this.state.password}
						onChange={this.handleChange}
						type="password"
					/>
				</FormGroup>
				<FormGroup controlId="confirmPassword" bsSize="large">
					<ControlLabel>Confirm Password</ControlLabel>
					<FormControl
						value={this.state.confirmPassword}
						onChange={this.handleChange}
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
					loadingText="Signing up…"
				/>
			</form>
		);
	}

	render() {
		return (
			<Row>
				<div className="Signup">
					<Image src={'/asset/logo.svg'} circle />
					<h3>Sign up</h3>
					{this.state.newUser === null
						? this.renderForm()
							: this.renderConfirmationForm()}
				</div>
			</Row>
		);
	}
}
