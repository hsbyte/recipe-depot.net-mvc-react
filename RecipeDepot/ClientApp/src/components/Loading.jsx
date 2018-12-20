/* Loading component */
import React from "react";
import { Glyphicon } from "react-bootstrap";
import "./Loading.css";

export default ({
	loadingText,
	className = "",
	...props
}) =>
	<div
		className={`Loading ${className}`}
		{...props} >
		{<Glyphicon glyph="refresh" className="spinning" />}
		<p>{loadingText}</p>
	</div>;