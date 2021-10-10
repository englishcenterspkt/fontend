import React, {Component} from "react";
import Navbar from "../components/Navbar/Navbar";
import Dashboard from "../components/admin/Dashboard";
import ManagerStudents from "../components/admin/ManagerStudents";
import ImageUpload from "../components/common/ImageUpload";

class Admin extends Component {
    renderSwitch() {
        switch (window.location.pathname) {
            case "/admin/abc":
                return <ImageUpload />;
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
