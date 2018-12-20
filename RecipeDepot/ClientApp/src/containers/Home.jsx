/* Home container */
import React, { Component } from "react";
import { Grid, Image, Row, Col } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
	render() {
		return (
			<Grid className="Home">
				<Row className="wrapper">
					<Col>
						<Image src={'/asset/logo.svg'} circle /><br /><br />
						<div className="banner">
							<h1>Share your Food Recipes</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
							</p>
						</div>
					</Col>
				</Row>
			</Grid>
		);
	}
}
