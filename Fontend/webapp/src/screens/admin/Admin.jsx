import React, { Component } from "react";
import Member from "../../service/MemberService";


class Admin extends Component {
    componentDidMount() {
        Member.getMembers();
    }
  render() {
    return (
        <div>
            <h1>
                ADMIN
            </h1>
        </div>
    );
  }
}

export default Admin;
