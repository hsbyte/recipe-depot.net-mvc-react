import React, { Component, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Glyphicon, Image } from "react-bootstrap";
import Routes from "./Routes";
import FooterContent from "./containers/FooterContent";
import { getStaticList } from './containers/SharedMethods';
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false,
			isAuthenticating: true
		};

		getStaticList('dishType', 'api/DishTypes');
		getStaticList('mainIngredients', 'api/MainIngredients');
		getStaticList('seasons', 'api/Seasons');
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

	handleLogout = async () => {
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('name');
		sessionStorage.removeItem('avatar');
		sessionStorage.removeItem('imgTemp');
		this.userHasAuthenticated(false);
		this.props.history.push("/login");
	}

	handleSearch = async event => {
		window.location.href = '/gallery?' + sessionStorage.getItem('user');
	}

	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated
		};

		return (
			!this.state.isAuthenticating &&
			<div>
				<div className="App container">
					<Navbar fluid collapseOnSelect fixedTop>
						<Navbar.Header>
							<Navbar.Brand>
								<Link to="/">Recipe Depot</Link>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav pullRight>
								<LinkContainer to="/home" >
									<NavItem>Home</NavItem>
								</LinkContainer>
								<LinkContainer to="/gallery" >
									<NavItem>Gallery</NavItem>
								</LinkContainer>
								{this.state.isAuthenticated && sessionStorage.getItem('user') !== null
									? <Fragment>
										<NavDropdown
											eventKey="1"
											title={"Hi, " + sessionStorage.getItem('name')}
											id="nav-dropdown" >
											<LinkContainer
												to={{
													pathname: '/profile',
												}} >
												<NavItem active={false}>
													{sessionStorage.getItem('avatar')
														? <Image src={sessionStorage.getItem('avatar')} circle width="22" />
														: <Glyphicon glyph="user" />
													}&nbsp;&nbsp;&nbsp;Your profile settings
												</NavItem>	
											</LinkContainer>
											<LinkContainer to={{
												pathname: '/gallerybyauthor',
												search: sessionStorage.getItem('user')
												}} >
												<NavItem active={false}>
													<Glyphicon glyph="record" />&nbsp;&nbsp;&nbsp;Your recipe repository
												</NavItem>
											</LinkContainer>
											<LinkContainer to={{
												pathname: '/detail',
												action: 'Create'
											}} >
												<NavItem active={false}>
													<Glyphicon glyph="cloud-upload" />
													&nbsp;&nbsp;&nbsp;Create a recipe idea
												</NavItem>
											</LinkContainer>
											<MenuItem divider />
											<MenuItem eventKey="4" onClick={this.handleLogout} >
												<Glyphicon glyph="log-out" />&nbsp;&nbsp;&nbsp;Logout
											</MenuItem>
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
				<FooterContent />
			</div>
		);
	}
}
export default withRouter(App);