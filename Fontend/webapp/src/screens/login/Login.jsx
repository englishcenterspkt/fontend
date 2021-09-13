import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../service/AuthService";
import Cookies from "universal-cookie";
import NotifyCation from "../../components/NotifyCation";
import Footer from "../../components/Footer/Footer";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedInUser: null,
    };

    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onSubmitLogin(e) {
    e.preventDefault();
    Auth.login(this.state.username, this.state.password).then((Response) => {
      if (Response.data.code !== -9999) {
        const cookies = new Cookies();
        cookies.set("token", Response.data.payload, { path: "/" });
        console.log(2);
        this.setState({ loggedInUser: true });
      } else {
        NotifyCation.showNotification(Response.data.message);
      }
    });
  }

  render() {
    if (this.state.loggedInUser !== null) {
      // neu da login thi Redirect
      return (
        console.log(1),
        (
          <Redirect
            to={{
              pathname: "/admin",
              state: {
                from: this.state,
              },
            }}
          />
        )
      );
    }
    return (
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="username"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          value={this.state.username}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button
                        onClick={this.onSubmitLogin}
                        className="btn btn-primary btn-user btn-block"
                      >
                        Login
                      </button>
                      <hr />
                      <a
                        href="index.html"
                        className="btn btn-google btn-user btn-block"
                      >
                        <i className="fab fa-google fa-fw" /> Login with Google
                      </a>
                      <a
                        href="index.html"
                        className="btn btn-facebook btn-user btn-block"
                      >
                        <i className="fab fa-facebook-f fa-fw" /> Login with
                        Facebook
                      </a>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="text-center">
                      <a className="small" href="register.html">
                        Create an Account!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
