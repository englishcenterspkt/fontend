import React, { Component } from "react";
import Member from "../../service/MemberService";
import NotifyCation from "../common/NotifyCation";
import AddEditStudent from "./AddEditStudent";
import UpDownButton from "../common/UpDownButton";
import {
  parseDate,
  getKeyByValue,
  onChangePage,
  previousPage,
  nextPage,
  changeSize,
  onSort,
  getPageShow,
  showAdd,
  showEdit,
} from "../common/Utils";
import Select from "react-select";

const key = { _id: "ID", name: "Họ và tên", create_date: "Ngày tạo" };

const colourOptions = [
  { value: "admin", label: "Admin" },
  { value: "student", label: "Học viên" },
];
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
      item: null,
      is_asc: false,
      field: "ID",
      filter_types: [],
    };

    this.reload = this.reload.bind(this);
    this.showAdd = showAdd.bind(this);
    this.onChangePage = onChangePage.bind(this);
    this.previousPage = previousPage.bind(this);
    this.nextPage = nextPage.bind(this);
    this.showEdit = showEdit.bind(this);
    this.changeSize = changeSize.bind(this);
    this.onChangeSort = onSort.bind(this);
    this.getPageShow = getPageShow.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  handleSelect(e) {
    this.setState(
      { filter_types: Array.isArray(e) ? e.map((x) => x.value) : [] },
      () => {
        this.reload();
      }
    );
  }

  reload() {
    Member.getMembers(
      this.state.current_page,
      this.state.size,
      getKeyByValue(key, this.state.field),
      this.state.is_asc,
      this.state.filter_types
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
                    onClick={this.showAdd}
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
                    <div
                      className="card-header"
                      style={{ position: "relative", zIndex: 900 }}
                    >
                      <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={colourOptions}
                        value={colourOptions.filter((obj) =>
                          this.state.filter_types.includes(obj.value)
                        )}
                        onChange={this.handleSelect}
                      />
                      {/* <div className="card-header-form">
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
                      </div> */}
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
                                  <td>{parseDate(student.create_date)}</td>
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
        {this.state.show_add && (
          <AddEditStudent
            show_add={this.state.show_add}
            close_modal={this.showAdd}
            reload={this.reload}
            student={this.state.item}
          />
        )}
      </React.Fragment>
    );
  }
}

ManagerStudents.defaultProps = {
  item: {
    _id: -1,
    name: "",
    email: "",
    password: "",
    avatar: null,
  },
};

export default ManagerStudents;
