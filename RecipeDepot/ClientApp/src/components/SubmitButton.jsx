/* Customized submit button component */
import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import "./SubmitButton.css";

export default ({
	isLoading,
	text,
	loadingText,
	className = "",
	disabled = false,
	...props
}) =>
	<Button
		className={`SubmitButton ${className}`}
		disabled={disabled || isLoading}
		{...props} >
		{isLoading && <Glyphicon glyph="refresh" className="spinning" />}
		{!isLoading ? text : loadingText}
	</Button>;
