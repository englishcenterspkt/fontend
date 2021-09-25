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

  componentWillReceiveProps(nextProps) {
    if (nextProps.student !== null) {
      this.setState({
        name: nextProps.student.name,
        email: nextProps.student.email,
      });
    } else {
      this.setState({
        name: "",
        email: "",
        password: "",
      });
    }
  }

  render() {
    return (
      <div
        hidden={!this.props.show_add}
        style={{
          position: "fixed",
          zIndex: "998",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(34, 34, 34, 0.5)",
            zIndex: "999",
            width: "100vw",
            height: "100vh",
            position: "absolute",
          }}
          onClick={() => this.props.close_modal()}
        ></div>
        <div
          className="modal-content"
          style={{
            zIndex: "1000",
            width: "30%",
          }}
        >
          <form className="needs-validation" noValidate>
            <div className="modal-header">
              <h4>Thông tin học viên</h4>
              <a onClick={() => this.props.close_modal()}>
                <i class="fas fa-times"></i>
              </a>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  required
                  value={this.state.name}
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
                  value={this.state.email}
                />
                <div className="invalid-feedback">Oh no! Email is invalid.</div>
              </div>
              <div
                className="form-group"
                hidden={this.props.student !== null ? true : false}
              >
                <label>Mật khẩu</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  onChange={this.handleChange}
                  required
                  value={this.state.password}
                />
                <div className="valid-feedback">Good job!</div>
              </div>
            </div>
            <div className="modal-footer text-right">
              <button className="btn btn-primary" onClick={this.onSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddEditStudent;
