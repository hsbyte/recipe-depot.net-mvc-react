import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Gallery from "./components/FetchRecipe";
import RecipeItem from "./components/HandlerRecipe";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ChildRoute from "./components/ChildRoute";
import NotFound from "./components/404";

export default ({ childProps }) =>
	<Switch>
		<ChildRoute path="/" exact component={Home} props={childProps} />
		<ChildRoute path="/gallery" exact component={Gallery} props={childProps} />
		<ChildRoute path="/detail" exact component={RecipeItem} props={childProps} />
		<ChildRoute path="/login" exact component={Login} props={childProps} />
		<ChildRoute path="/signup" exact component={Signup} props={childProps} />
		<Route component={NotFound} />
	</Switch>;
