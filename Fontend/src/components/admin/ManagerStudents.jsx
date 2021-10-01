import React, { Component } from "react";
import Member from "../../service/MemberService";
import NotifyCation from "../../components/NotifyCation";
import AddEditStudent from "./AddEditStudent";
import UpDownButton from "../UpDownButton";

// const key = new Map();
// key.set("_id", "ID");
// key.set("name", "Họ và tên");

const key = { _id: "ID", name: "Họ và tên", create_date: "Ngày tạo" };
class ManagerStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_add: false,
      students: [],
      total_pages: 1,
      total_items: 0,
      current_page: 1,
      has_previous: false,
      has_next: false,
      size: 5,
      previous_page: 1,
      next_page: 1,
      student: null,
      is_asc: true,
      field: "ID",
    };

    this.onClickAdd = this.onClickAdd.bind(this);
    this.reload = this.reload.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
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

  getKeyByValue() {
    return Object.keys(key).find((i) => key[i] === this.state.field);
  }

  reload() {
    Member.getMembers(
      this.state.current_page,
      this.state.size,
      this.getKeyByValue(),
      this.state.is_asc
    ).then((Response) => {
      if (Response.data.code !== -9999) {
        this.setState({
          students: Response.data.payload.items,
          total_pages: Response.data.payload.total_pages,
          current_page: Response.data.payload.current_page,
          has_next: Response.data.payload.has_next,
          has_previous: Response.data.payload.has_previous,
          next_page: Response.data.payload.next_page,
          previous_page: Response.data.payload.previous_page,
          total_items: Response.data.payload.total_items,
        });
      } else {
        NotifyCation.showNotification(Response.data.message);
      }
    });
  }

  onChangePage(event) {
    this.state.current_page = event.target.attributes.value.value;
    this.reload();
  }

  previousPage(event) {
    this.state.current_page = this.state.previous_page;
    this.reload();
  }

  nextPage(event) {
    this.state.current_page = this.state.next_page;
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

  getPageShow() {
    if (this.state.current_page - 2 < 1) {
      return this.range(
        1,
        this.state.total_pages > 5 ? 5 : this.state.total_pages
      );
    }
    if (this.state.current_page + 2 > this.state.total_pages) {
      return this.range(
        this.state.total_pages - 5 > 1 ? this.state.total_pages - 4 : 1,
        this.state.total_pages
      );
    }
    return this.range(this.state.current_page - 2, this.state.current_page + 2);
  }

  range(a, b) {
    const result = [];
    for (var i = a; i <= b; i++) {
      result.push(i);
    }
    return result;
  }

  changeSize(e) {
    const s = e.target.attributes.value.value;
    this.state.current_page =
      parseInt(
        (this.state.current_page * this.state.size - (this.state.size - 1)) / s
      ) + 1;
    this.state.size = s;
    this.reload();
  }

  onChangeSort(e) {
    this.state.is_asc = !this.state.is_asc;
    this.state.field = e.target.innerText;
    this.reload();
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
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th onClick={this.onChangeSort}>
                                <UpDownButton
                                  asc={this.state.is_asc}
                                  col_name={key._id}
                                  select_field={this.state.field}
                                />
                              </th>
                              <th onClick={this.onChangeSort}>
                                <UpDownButton
                                  asc={this.state.is_asc}
                                  col_name={key.name}
                                  select_field={this.state.field}
                                />
                              </th>
                              <th>Email</th>
                              <th onClick={this.onChangeSort}>
                                <UpDownButton
                                  asc={this.state.is_asc}
                                  col_name={key.create_date}
                                  select_field={this.state.field}
                                />
                              </th>
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
                          {Array.from(this.getPageShow(), (e, i) => {
                            return (
                              <li
                                key={e}
                                className={
                                  this.state.current_page === e
                                    ? "page-item active"
                                    : "page-item"
                                }
                              >
                                <button
                                  className="page-link"
                                  onClick={this.onChangePage}
                                  value={e}
                                >
                                  {e}
                                  <span className="sr-only">(current)</span>
                                </button>
                              </li>
                            );
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
                      <div className="float-right">
                        <button
                          type="button"
                          className="btn btn-light dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {this.state.size + " dòng mỗi trang"}
                        </button>
                        <div
                          className="dropdown-menu"
                          style={{ width: "auto" }}
                        >
                          <button
                            className="btn btn-outline-secondary dropdown-item"
                            type="button"
                            value="5"
                            onClick={this.changeSize}
                          >
                            5 dòng mỗi trang
                          </button>
                          <button
                            className="btn btn-outline-secondary dropdown-item"
                            type="button"
                            value="10"
                            onClick={this.changeSize}
                          >
                            10 dòng mỗi trang
                          </button>
                          <button
                            className="btn btn-outline-secondary dropdown-item"
                            type="button"
                            value="20"
                            onClick={this.changeSize}
                          >
                            20 dòng mỗi trang
                          </button>
                        </div>
                      </div>
                      <div
                        className="float-right"
                        style={{ marginRight: "5px" }}
                      >
                        <button type="button" className="btn btn-light">
                          {"Tổng học viên: " + this.state.total_items}
                        </button>
                      </div>
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
