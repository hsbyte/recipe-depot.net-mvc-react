/* Image uploader component */
import React, { Component } from 'react';
import {
	FormControl,
	FormGroup,
	Row
} from 'react-bootstrap';
import "./ImageUploader.css";

export default class ImageUploader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: '',
			imageData: (props.imgfile === undefined
				? sessionStorage.getItem('avatar')
				: props.imgfile)
		};
	}

	handleImageChange = async ev => {
		ev.preventDefault();
		let reader = new FileReader(),
			file = ev.target.files[0];
		reader.readAsDataURL(file)
		reader.onloadend = e => {
			e.preventDefault();
			let formData = new FormData();
			formData.append("file", file);
			this.setState({
				file: file,
				imageData: reader.result
			});
			//sessionStorage.setItem('imgBinTemp', reader.result);
			sessionStorage.setItem('imgTemp', file.name);
		}
	}

	render() {
		return (
			<Row className="ImageUploader">
				<FormGroup controlId="fileInput" encType="multipart/form-data">
					<FormControl type="file" onChange={this.handleImageChange} />
				</FormGroup>
				<div className="preview">
					{this.state.imageData
						? <img src={this.state.imageData} alt="" />
						: <p>Photo Preview</p>
					}
				</div>
			</Row>
		)
	}
}