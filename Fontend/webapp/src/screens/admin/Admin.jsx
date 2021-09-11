import React, { Component } from "react";
import Member from "../../service/MemberService";
import BasicToast from "../../components/BasicToast";
import { ToastContainer } from "react-toastify";

class Admin extends Component {
  componentDidMount() {
    Member.getMembers();
  }
  render() {
    return (
      <div>
        <h1>Hello StackBlitz!</h1>
        <button onClick={e=>{
            BasicToast.showNoti("nammmmmmmmmm");
        }}>
            a
        </button>
      </div>
    );
  }
}

export default Admin;
