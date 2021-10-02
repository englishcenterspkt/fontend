import React, { Component } from "react";
import { storage } from "./firebase/Config";
import MemberService from "../../service/MemberService";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
    };

    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(id) {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${id}.png`).put(image);
    uploadTask.on("state_changed", () => {
      console.log("1");
      storage
        .ref("images")
        .child(id + ".png")
        .getDownloadURL()
        .then((url) => {
          console.log("2");
          this.setState({ url: url });
          MemberService.updateMember(id, null, url);
          this.props.reload();
        });
    });
  }

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

  componentWillReceiveProps(nextProps) {
    if (this.state.url === "") {
      this.setState({
        url: nextProps.url,
      });
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
