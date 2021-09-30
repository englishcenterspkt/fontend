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
      student: null,
    };

    this.onClickAdd = this.onClickAdd.bind(this);
    this.reload = this.reload.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.showEdit = this.showEdit.bind(this);
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
    this.setState({ show_add: !this.state.show_add, student: null });
  }

  showEdit(event) {
    this.setState({
      student: JSON.parse(event.currentTarget.getAttribute("data-item")),
      show_add: !this.state.show_add,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-content">
          <section className="section">
            <div className="section-header">
              <h1>Học viên</h1>
              <div className="section-header-breadcrumb">
                <div className="breadcrumb-item">
                  <button
                    onClick={this.onClickAdd}
                    className="btn btn-icon btn-primary"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="section-body">
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
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th>ID</th>
                              <th>Họ và tên</th>
                              <th>Email</th>
                              <th>Ngày tạo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.students.map((student, index) => {
                              return (
                                <tr
                                  key={index + 1}
                                  data-item={JSON.stringify(student)}
                                  onClick={this.showEdit}
                                >
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
                    <div className="card-footer">
                      <nav className="d-inline-block">
                        <ul className="pagination mb-0">
                          <li
                            key="previous"
                            className={
                              this.state.has_previous
                                ? "page-item"
                                : "page-item disabled"
                            }
                            onClick={
                              this.state.has_previous ? this.previousPage : null
                            }
                          >
                            <button className="page-link" tabIndex="-1">
                              <i className="fas fa-chevron-left"></i>
                            </button>
                          </li>
                          {Array.from(Array(this.state.total_pages), (e, i) => {
                            if (i < 5) {
                              return (
                                <li
                                  key={i + 1}
                                  className={
                                    this.state.current_page === i + 1
                                      ? "page-item active"
                                      : "page-item"
                                  }
                                >
                                  <button
                                    className="page-link"
                                    onClick={this.onChangePage}
                                    value={i + 1}
                                  >
                                    {i + 1}{" "}
                                    <span className="sr-only">(current)</span>
                                  </button>
                                </li>
                              );
                            }
                          })}
                          <li
                            key="next"
                            className={
                              this.state.has_next
                                ? "page-item"
                                : "page-item disabled"
                            }
                            onClick={this.state.has_next ? this.nextPage : null}
                          >
                            <button className="page-link">
                              <i className="fas fa-chevron-right"></i>
                            </button>
                          </li>
                        </ul>
                      </nav>
                      <h1>nam</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <AddEditStudent
          show_add={this.state.show_add}
          close_modal={this.onClickAdd}
          reload={this.reload}
          student={this.state.student}
        />
      </React.Fragment>
    );
  }
}

export default ManagerStudents;
