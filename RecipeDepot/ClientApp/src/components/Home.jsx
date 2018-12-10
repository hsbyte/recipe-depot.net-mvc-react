/* Home container */
import React, { Component } from "react";
import { Image, Row } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
	render() {
		return (
			<Row className="Home">
				<Image src={'/asset/logo.svg'} circle />
				<h1>Shared your Food Recipes</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</Row>
		);
	}
}
