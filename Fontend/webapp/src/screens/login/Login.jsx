import React, { Component } from "react";
import Member from "../../service/MemberService";
import Auth from "../../service/AuthService";

class Login extends Component {
  componentDidMount() {
    Member.getMembers().then((response) =>
      console.log(response)
    );
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
      </div>
    );
  }
}

export default Login;
