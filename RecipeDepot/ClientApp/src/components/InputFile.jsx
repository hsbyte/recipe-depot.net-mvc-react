/* Customized input component for file upload */
import React from "react";
import { FieldGroup } from "react-bootstrap";
import "./SubmitButton.css";

export default ({
	label = "",
	help = "",
	loadingText,
	className = "",
	disabled = false,
	...props
}) =>
<FieldGroup
	className={`InputFile ${className}`}
	disabled={disabled}
	id="formControlsFile"
	type="file"
	label={label}
	help={help}
	{...props} />