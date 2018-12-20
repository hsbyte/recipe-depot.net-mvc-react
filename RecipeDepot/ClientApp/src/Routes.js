import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Gallery from "./containers/RecipeCatalog";
import RecipesByAuthor from "./containers/RecipesByAuthor";
import RecipeItem from "./containers/HandlerRecipe";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/PatronProfile";
import ChildRoute from "./components/ChildRoute";
import NotFound from "./containers/404";

export default ({ childProps }) =>
	<Switch>
		<ChildRoute path="/" exact component={Home} props={childProps} />
		<ChildRoute path="/home" exact component={Home} props={childProps} />
		<ChildRoute path="/gallery" exact component={Gallery} props={childProps} />
		<ChildRoute path="/gallerybyauthor" exact component={RecipesByAuthor} props={childProps} />
		<ChildRoute path="/detail" exact component={RecipeItem} props={childProps} />
		<ChildRoute path="/login" exact component={Login} props={childProps} />
		<ChildRoute path="/signup" exact component={Signup} props={childProps} />
		<ChildRoute path="/profile" exact component={Profile} props={childProps} />
		<Route component={NotFound} />
	</Switch>;
