import React, { Component } from "react";
import Member from "../../service/MemberService";
import NotifyCation from "../../components/NotifyCation";
import AddEditStudent from "./AddEditStudent";

class ManagerStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_add: false,
      students: [],
      total_pages: 0,
      current_page: 0,
      has_previous: false,
      has_next: false,
      page: 1,
      size: 5,
      previous_page: 1,
      next_page: 1,
    };

    this.onClickAdd = this.onClickAdd.bind(this);
    this.reload = this.reload.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  parseDate(timestamp) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(timestamp);
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    Member.getMembers(this.state.page, this.state.size).then((Response) => {
      if (Response.data.code !== -9999) {
        this.setState({
          students: Response.data.payload.items,
          total_pages: Response.data.payload.total_pages,
          current_page: Response.data.payload.current_page,
          has_next: Response.data.payload.has_next,
          has_previous: Response.data.payload.has_previous,
          next_page: Response.data.payload.next_page,
          previous_page: Response.data.payload.previous_page,
        });
      } else {
        NotifyCation.showNotification(Response.data.message);
      }
    });
  }

  onChangePage(event) {
    this.state.page = event.target.attributes.value.value;
    this.reload();
  }

  previousPage(event) {
    this.state.page = this.state.previous_page;
    this.reload();
  }

  nextPage(event) {
    this.state.page = this.state.next_page;
    this.reload();
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
              reload={this.reload}
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
                  <div className="card-footer text-right">
                    <nav className="d-inline-block">
                      <ul className="pagination mb-0">
                        <li
                          className={
                            this.state.has_previous
                              ? "page-item"
                              : "page-item disabled"
                          }
                          onClick={
                            this.state.has_previous ? this.previousPage : null
                          }
                        >
                          <a className="page-link" tabindex="-1">
                            <i className="fas fa-chevron-left"></i>
                          </a>
                        </li>
                        {Array.from(Array(this.state.total_pages), (e, i) => {
                          return (
                            <li
                              className={
                                this.state.current_page === i + 1
                                  ? "page-item active"
                                  : "page-item"
                              }
                            >
                              <a
                                className="page-link"
                                onClick={this.onChangePage}
                                value={i + 1}
                              >
                                {i + 1}{" "}
                                <span className="sr-only">(current)</span>
                              </a>
                            </li>
                          );
                        })}
                        <li
                          className={
                            this.state.has_next
                              ? "page-item"
                              : "page-item disabled"
                          }
                          onClick={this.state.has_next ? this.nextPage : null}
                        >
                          <a className="page-link">
                            <i className="fas fa-chevron-right"></i>
                          </a>
                        </li>
                      </ul>
                    </nav>
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
