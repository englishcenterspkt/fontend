import React, {Component} from "react";
import {storage} from "./firebase/Config";
import {getImageURL} from "./Utils";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, url: "" };

    this.handleUpload = this.handleUpload.bind(this);
    this.getImageURL = getImageURL.bind(this);
  }

  componentDidMount() {
    this.getImageURL();
  }

  handleUpload(name) {
    const { image } = this.state;
    storage.ref(`images/${name}.png`).put(image);
  }

  _handleImageChange(e) {
    e.preventDefault();
    if (e.target.files.length > 0) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          image: file,
          url: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <div className="text-center">
        <label htmlFor="up-image-0" className="col-6">
          <img
            id="img-upload-0"
            alt="avatar"
            className="img-thumbnail"
            src={this.state.url}
          />
        </label>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="up-image-0"
            name="up-image-0"
            accept="image/*"
            onChange={(e) => this._handleImageChange(e)}
          />
        </div>
      </div>
    );
  }
}

export default ImageUpload;
