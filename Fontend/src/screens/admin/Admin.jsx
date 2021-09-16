import React, { Component } from "react";
import Member from "../../service/MemberService";
import Navbar from "../../components/Navbar/Navbar";

class Admin extends Component {
  componentDidMount() {
    Member.getMembers();
  }
  render() {
    return (
      <div>
        <Navbar></Navbar>
      </div>
    );
  }
}

export default Admin;
