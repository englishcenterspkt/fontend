import React, { Component } from "react";

class AddEditStudent extends Component {
  render() {
    return (
      <div hidden={!this.props.show_add}>
        <div
          style={{
            backgroundColor: "black",
            zIndex: "999",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: "0.5",
          }}
        ></div>
        <div
          className="main-content"
          style={{
            zIndex: "1000",
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <div
            className="card"
            style={{
              marginRight: "50px",
              marginLeft: "50px",
              marginTop: "50px",
            }}
          >
            <form className="needs-validation" noValidate>
              <div className="card-header">
                <h4>Thông tin học viên</h4>
                <a
                  onClick={() => this.props.close_modal()}
                  className="btn btn-icon btn-primary"
                >
                  <i className="fas fa-plus"></i>
                </a>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" className="form-control" required />
                  <div className="invalid-feedback">What's your name?</div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" required />
                  <div className="invalid-feedback">
                    Oh no! Email is invalid.
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="email" className="form-control" />
                  <div className="valid-feedback">Good job!</div>
                </div>
                <div className="form-group mb-0">
                  <label>Message</label>
                  <textarea
                    className="form-control"
                    required
                    defaultValue={""}
                  />
                  <div className="invalid-feedback">What do you wanna say?</div>
                </div>
              </div>
              <div className="card-footer text-right">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEditStudent;
