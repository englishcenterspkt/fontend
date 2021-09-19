import React, { Component } from "react";
import Member from "../../service/MemberService";
import Navbar from "../../components/Navbar/Navbar";
import Dashboard from "../../components/admin/Dashboard";
import Dashboard2 from "../../components/admin/Dashboard2";
class Admin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Member.getMembers();
  }

  renderSwitch() {
    switch (window.location.pathname) {
      case "/admin":
        return <Dashboard></Dashboard>;
      case "/admin/abc":
        return <Dashboard2></Dashboard2>;
    }
  }

  render() {
    return (
      <div>
        <Navbar index={window.location.pathname}></Navbar>
        {this.renderSwitch()}
      </div>
    );
  }
}

export default Admin;
