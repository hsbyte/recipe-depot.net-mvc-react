import React from "react";
import { Route } from "react-router-dom";

export default ({
	component: Child, props: cProps, ...rest }) =>
		<Route {...rest} render={props => <Child {...props} {...cProps} />} />;
