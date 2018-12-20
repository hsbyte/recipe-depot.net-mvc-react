/* Log in container */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, FormControl, Image, Row } from "react-bootstrap";
import SubmitButton from "../components/SubmitButton";
import './Login.css'

export default class Login extends Component {
	displayName = Login.name

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			passwd: "",
			user: [],
			error: "",
			isLoading: false
		};
	}

	validateForm() {
		return this.state.email.length > 0 && this.state.passwd.length > 0;
	}

	handleChange = ev => {
		this.setState({ [ev.target.id]: ev.target.value });
	}

	handleSubmit = async ev => {
		ev.preventDefault();
		try {
			// Authenticate login credentials
			fetch('api/Patrons/' + this.state.email)
				.then(response => response.json())
				.then(data => {
					this.setState({ user: data, isLoading: false });
					sessionStorage.setItem('user', data.email);
					sessionStorage.setItem('name', data.name);
					sessionStorage.setItem('avatar', data.avatarUrl);
					if (data.passwd === this.state.passwd) {
						this.props.userHasAuthenticated(true);
						this.props.history.push("/");
					} else
						this.setState({ error: "Invalid password, try again!" });
				})
				.catch(() => {
					this.setState({ error: "Oops! Something went wrong. Please try again, or contact Customer Support if you need help." });
					this.props.userHasAuthenticated(false);
				});
		} catch (e) {
			alert(e.message);
			this.setState({ isLoading: false });
		}
	}

	render() {
		return (
			<Row className="Login">
				<div className="wrapper">
					<form onSubmit={this.handleSubmit}>
						<Image src={'/asset/logo.svg'} circle />
						<h3>Log in for Registered Patrons</h3>
						<p className="error-message">{this.state.error}</p>
						<FormGroup controlId="email" bsSize="large">
						<FormControl
							autoFocus
							type = "email"
							placeholder="Email"
							value={this.state.email}
								onChange={this.handleChange}
						/>
						</FormGroup>
						<FormGroup controlId="passwd" bsSize="large">
							<FormControl
								type = "password"
								placeholder="Password"
								value={this.state.passwd}
								onChange={this.handleChange}
							/>
						</FormGroup>
						<SubmitButton
							block
							bsSize="large"
							type="submit"
							text="Log in"
							loadingText="Logging in…"
							disabled={!this.validateForm()}
							isLoading={this.state.isLoading}
						/>
						<Link to="/signup">
							<span className="join-for-free">Join for free!</span>
						</Link>
						<p className="sub-text">
							By signing in, you are agreeing to our Terms of	Service and our Privacy Policy—Your Rights.
            </p>
					</form>
				</div>
			</Row>
		);
	}
}
