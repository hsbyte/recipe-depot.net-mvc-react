import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import "./FooterContent.css";

export default class FooterContent extends Component {
	displayName = FooterContent.name

	render() {
		return (
			<div className = "Footer">
				<Grid>
					<Row>
						<Col>
							<h4>&copy; {new Date().getFullYear()} Arnold Haban</h4>
							<p>
								.NET Course project for ComIT and Manitoba Start<br />
								MVC C# React-Bootstrap 
							</p>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}