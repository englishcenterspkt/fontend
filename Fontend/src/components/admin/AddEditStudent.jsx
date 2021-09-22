import React, { Component } from "react";
import MemberService from "../../service/MemberService";
import NotifyCation from "../NotifyCation";

class AddEditStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    MemberService.addMember(
      this.state.name,
      this.state.email,
      this.state.password
    ).then((Response) => {
      if (Response.data.code !== -9999) {
        this.props.close_modal();
        this.props.reload();
      } else {
        NotifyCation.showNotification(Response.data.message);
      }
    });
  }

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
                <a onClick={() => this.props.close_modal()}>
                  <i class="fas fa-times"></i>
                </a>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                  <div className="invalid-feedback">What's your name?</div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Oh no! Email is invalid.
                  </div>
                </div>
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                  <div className="valid-feedback">Good job!</div>
                </div>
              </div>
              <div className="card-footer text-right">
                <button className="btn btn-primary" onClick={this.onSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEditStudent;
