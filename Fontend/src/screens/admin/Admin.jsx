import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Dashboard from "../../components/admin/Dashboard";
import Dashboard2 from "../../components/admin/Dashboard2";
import ManagerStudents from "../../components/admin/ManagerStudents";
class Admin extends Component {
  renderSwitch() {
    switch (window.location.pathname) {
      case "/admin/abc":
        return <Dashboard2></Dashboard2>;
      case "/admin/student":
        return <ManagerStudents></ManagerStudents>;
      default:
        return <Dashboard></Dashboard>;
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
