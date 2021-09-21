import React, { Component } from "react";
import Member from "../../service/MemberService";
import NotifyCation from "../../components/NotifyCation";
import AddEditStudent from "./AddEditStudent";
import Modal from "react-bootstrap4-modal";

class ManagerStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_add: false,
      students: [
        {
          _id: 1,
          email: "nam",
        },
      ],
    };

    this.onClickAdd = this.onClickAdd.bind(this);
  }

  parseDate(timestamp) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(timestamp);
  }

  componentDidMount() {
    Member.getMembers().then((Response) => {
      if (Response.data.code !== -9999) {
        this.setState({ students: Response.data.payload });
        console.log(this.state.students);
      } else {
        NotifyCation.showNotification(Response.data.message);
      }
    });
  }

  onClickAdd() {
    this.setState({ show_add: !this.state.show_add });
  }

  render() {
    return (
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Học viên</h1>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item">
                <a
                  onClick={this.onClickAdd}
                  className="btn btn-icon btn-primary"
                >
                  <i className="fas fa-plus"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="section-body">
            <AddEditStudent
              show_add={this.state.show_add}
              close_modal={this.onClickAdd}
            />
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Danh sách học viên</h4>
                    <div className="card-header-form">
                      <form>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                          />
                          <div className="input-group-btn">
                            <button className="btn btn-primary">
                              <i className="fas fa-search" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>ID</th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Ngày tạo</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.students.map((student, index) => {
                            return (
                              <tr key={student._id}>
                                <th>{index + 1}</th>
                                <td>{student._id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{this.parseDate(student.create_date)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ManagerStudents;
