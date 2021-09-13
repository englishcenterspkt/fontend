import React, { Component } from "react";
import Member from "../../service/MemberService";
import NotifyCation from "../../components/NotifyCation";
import AdminNavbar from "../../components/Navbars/AdminNavbar"

class Admin extends Component {
  componentDidMount() {
    Member.getMembers();
  }
  render() {
    return (
      <div>
        <AdminNavbar/>
      </div>
    );
  }
}

export default Admin;
