import React, { Component, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Glyphicon } from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false,
			isAuthenticating: true
		};
	}

	async componentDidMount() {
		try {
			this.userHasAuthenticated(sessionStorage.getItem('user') !== null);
		}
		catch (e) {
			if (e !== 'No current user') {
				alert(e);
			}
		}

		this.setState({ isAuthenticating: false });
	}

	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	}

	handleLogout = async event => {
		sessionStorage.clear();
		this.userHasAuthenticated(false);
		this.props.history.push("/login");
	}

	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated
		};

		return (
			!this.state.isAuthenticating &&
			<div className="App container">
				<Navbar fluid collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">Recipe Depot</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							<LinkContainer to="/gallery">
								<NavItem>Gallery</NavItem>
							</LinkContainer>
							{this.state.isAuthenticated
								? <Fragment>
									<NavDropdown eventKey="4" title="Logged" id="nav-dropdown">
										<MenuItem eventKey="4.1"><Glyphicon glyph="user" />&nbsp;&nbsp;&nbsp;{sessionStorage.getItem('name')}</MenuItem>
										<MenuItem divider />
										<MenuItem eventKey="4.2" onClick={this.handleLogout} ><Glyphicon glyph="log-out" />&nbsp;&nbsp;&nbsp;Logout</MenuItem>
									</NavDropdown>
								</Fragment>
								: <Fragment>
										<LinkContainer to="/signup">
											<NavItem>Signup</NavItem>
										</LinkContainer>
										<LinkContainer to="/login">
											<NavItem>Login</NavItem>
										</LinkContainer>
									</Fragment>
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Routes childProps={childProps} />
			</div>
		);
	}
}

export default withRouter(App);