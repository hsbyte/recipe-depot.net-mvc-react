/* Customized list component */
import React from "react";
import "./List.css";

export default ({
	className = "",
	disabled = true,
	lineItem,
	...props
}) =>
	<ul
		{...props} >
		{lineItem}
	</ul>;