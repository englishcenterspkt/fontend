import { Upload } from "antd";
import React, { Component } from "react";

var SCOPE = "https://www.googleapis.com/auth/drive.file";
var discoveryUrl = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      googleAuth: "",
      body: "",
    };
  }

  componentDidMount() {
    var script = document.createElement("script");
    script.onload = this.handleClientLoad;
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);
  }

  initClient = () => {
    try {
      window.gapi.client
        .init({
          apiKey: "AIzaSyA7qwc4s2Dt3sbxjjfTE2ZltfEvg40d_j8",
          clientId:
            "640196743442-jc7pde9evtbv0f8mb4t977ulagvo7o95.apps.googleusercontent.com",
          scope: SCOPE,
          discoveryDocs: [discoveryUrl],
        })
        .then(() => {
          this.setState({
            googleAuth: window.gapi.auth2.getAuthInstance(),
          });
          this.state.googleAuth.isSignedIn.listen(this.updateSigninStatus);
          document
            .getElementById("signin-btn")
            .addEventListener("click", this.signInFunction);
          document
            .getElementById("signout-btn")
            .addEventListener("click", this.signOutFunction);
        });
    } catch (e) {
      console.log(e);
    }
  };

  signInFunction = () => {
    console.log(this.state.googleAuth);
    this.state.googleAuth.signIn();
    console.log(this.state.googleAuth);
    this.updateSigninStatus();
  };

  signOutFunction = () => {
    this.state.googleAuth.signOut();
    this.updateSigninStatus();
  };

  updateSigninStatus = () => {
    this.setSigninStatus();
  };

  setSigninStatus = async () => {
    console.log(this.state.googleAuth.currentUser.get());
    var user = this.state.googleAuth.currentUser.get();
    console.log(user);
    if (user.wc == null) {
      this.setState({
        name: "",
      });
    } else {
      var isAuthorized = user.hasGrantedScopes(SCOPE);
      if (isAuthorized) {
        console.log("USER");
        console.log(user);
        this.setState({
          name: user.vt.Ad,
        });

        const boundary = "-------314159265358979323846";
        const delimiter = "--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
        var fileName = "mychat123.png";
        var contentType = "image/png";
        var metadata = { name: fileName, mimeType: contentType };
        var multipartRequestBody =
          delimiter +
          "Content-Type: application/json\r\n\r\n" +
          JSON.stringify(metadata) +
          "\r\n" +
          delimiter +
          "Content-Type: " +
          contentType +
          "\r\n" +
          "Content-Transfer-Encoding: base64\r\n\r\n" +
          this.state.body +
          close_delim;
        console.log(multipartRequestBody);
        var request = window.gapi.client.request({
          path: "https://www.googleapis.com/upload/drive/v3/files",
          method: "POST",
          params: { uploadType: "multipart" },
          headers: {
            "Content-Type": "multipart/form-data; boundary=" + boundary,
          },
          body: multipartRequestBody,
        });

        request.execute(function (file) {
          console.log(file);
        });
      }
    }
  };

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  handleChange = async (file) => {
    let image;

    if (file.currentTarget) {
      image = file.currentTarget.currentSrc;
      console.log(file.currentTarget);
    } else {
      if (!file.file.url && !file.file.preview) {
        file.file.preview = await this.getBase64(file.file.originFileObj);
      }
      image = file.file.preview;
      console.log(file.file);
      this.setState({
        body: file.file.preview,
      });
    }

    console.log(image);
  };

  handleClientLoad = () => {
    window.gapi.load("client:auth2", this.initClient);
  };

  render() {
    return (
      <div className="App">
        <Upload
          style={{ width: "100%", height: "200px" }}
          listType="picture-card"
          onChange={this.handleChange}
        >
          <div>
            <div style={{ marginTop: 8 }}>Subir imagen</div>
          </div>
        </Upload>
        <div>
          UserName: <strong>{this.state.name}</strong>
        </div>
        <button id="signin-btn">Sign In</button>
        <button id="signout-btn">Sign Out</button>
      </div>
    );
  }
}

export default UploadImage;
