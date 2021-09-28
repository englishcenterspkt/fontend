import React, { Component } from "react";
import { storage } from "../firebase";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
    };
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on("state_changed", () => {
      // complete function ....
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          this.setState({ url: url });
        });
    });
  };

  _handleImageChange(e) {
    e.preventDefault();

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

  render() {
    return (
      <div>
        <label
          htmlFor="up-image-0"
          className="form-control-label d-inline-block w-100"
        >
          <img
            id="img-upload-0"
            alt="avatar"
            className="img-thumbnail"
            src={
              this.state.url !== ""
                ? this.state.url
                : "https://firebasestorage.googleapis.com/v0/b/englishcenter-bd4ab.appspot.com/o/images%2FTC_ADD_004.png?alt=media&token=5ef94381-4693-4e3c-a8dc-0e6ed02aeb71"
            }
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
