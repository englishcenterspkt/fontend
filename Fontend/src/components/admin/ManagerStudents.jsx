import React, {useEffect, useState} from "react";
import {getMembers} from "../../service/MemberService";
import {showNotification} from "../common/NotifyCation";
import AddEditStudent from "./AddEditStudent";
import UpDownButton from "../common/UpDownButton";
import {
    changeSize,
    getKeyByValue,
    range,
    getTimestamp,
    handleInput,
    onChangePage,
    onNextPage,
    onPreviousPage,
    parseDate
} from "../common/Utils";
import Select from "react-select";
import {FormControl, Image, InputGroup} from "react-bootstrap";
import DateRange from "../common/DateRange";

const key = {_id: "ID", name: "Họ và tên", create_date: "Ngày tạo"};

const colourOptions = [
    {value: "admin", label: "Admin"},
    {value: "student", label: "Học viên"},
];

const style = {
    control: base => ({
        ...base,
        border: 0,
        boxShadow: "none"
    })
};

function ManagerStudents(props) {
    const [showAdd, setShowAdd] = useState(false);
    const [students, setStudents] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    const [size, setSize] = useState(5);
    const [previousPage, setPreviousPage] = useState(1);
    const [nextPage, setNextPage] = useState(1);
    const [item, setItem] = useState(null);
    const [isAsc, setIsAsc] = useState(false);
    const [field, setField] = useState("ID");
    const [filterTypes, setFilterTypes] = useState([]);
    const [keyword, setKeyword] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    useEffect(() => {
        console.log("useEffect");
        reload();
    })

    function handleSelect(e) {
        this.setState(
            {filter_types: Array.isArray(e) ? e.map((x) => x.value) : []},
            () => {
                this.reload();
            }
        );
    }

    function onSort(event) {
        setIsAsc(!this.state.is_asc);
        setField(event.target.innerText);
        this.reload();
    }

    function reload() {
        getMembers(
            currentPage,
            size,
            getKeyByValue(key, field),
            isAsc,
            filterTypes,
            keyword,
            getTimestamp(fromDate),
            getTimestamp(toDate)
        ).then((Response) => {
            if (Response.data.code !== -9999) {
                setStudents(Response.data.payload.items);
            } else {
                showNotification(Response.data.message);
            }
        });
    }

    function onKeyPress(event) {
        this.setState({[event.target.id]: event.target.value}, () => {
            if (event.charCode === 13) {
                this.reload()
            }
        });
    }

    function setDates(dates) {
        if (dates !== null) {
            this.setState({from_date: dates[0], to_date: dates[1]}, () => {
                this.reload()
            })
        } else {
            this.setState({from_date: null, to_date: null}, () => {
                this.reload()
            })
        }
    }

    function onShowAdd() {
        setShowAdd(!showAdd);
        setItem(props.item);
    }

    function onShowEdit(event) {
        setItem(JSON.parse(event.currentTarget.getAttribute("data-item")));
    }

    function getPageShow() {
        if (currentPage - 2 < 1) {
            return range(1, totalPages > 5 ? 5 : totalPages);
        }
        if (currentPage + 2 > totalPages) {
            return range(
                totalPages - 5 > 1 ? totalPages - 4 : 1,
                totalPages
            );
        }
        return range(currentPage - 2, currentPage + 2);
    }

    function onPreviousPage() {
        setCurrentPage(previousPage);
    }

    function onNextPage() {
        setCurrentPage(nextPage);
    }

    return (
        <React.Fragment>
            <div className="main-content">
                <section className="section">
                    <div className="section-header">
                        <h1>Học viên</h1>
                        <div className="section-header-breadcrumb">
                            <div className="breadcrumb-item">
                                <button
                                    onClick={onShowAdd}
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
                                        className="custom-css-006"
                                    >
                                        <InputGroup className="custom-css-007">
                                            <InputGroup.Text className="custom-css-008">
                                                Loại:
                                            </InputGroup.Text>
                                            <Select
                                                placeholder={"Chọn"}
                                                closeMenuOnSelect={false}
                                                isMulti
                                                options={colourOptions}
                                                value={colourOptions.filter((obj) =>
                                                    filterTypes.includes(obj.value)
                                                )}
                                                onChange={handleSelect}
                                                styles={style}
                                            />
                                        </InputGroup>
                                        <InputGroup className="custom-css-007">
                                            <InputGroup.Text className="custom-css-008">
                                                Ngày tạo:
                                            </InputGroup.Text>
                                            <DateRange setDates={setDates}/>
                                        </InputGroup>
                                    </div>
                                    <div className="card-body p-0">
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <Image className="custom-css-009"
                                                       src="https://firebasestorage.googleapis.com/v0/b/englishcenter-bd4ab.appspot.com/o/images%2Fsearch.png?alt=media&token=FGHT2AXQBr0xWNS6d7mALw=="/>
                                            </InputGroup.Text>
                                            <FormControl
                                                id="keyword"
                                                placeholder="Tìm kiếm"
                                                onChange={handleInput}
                                                onKeyPress={onKeyPress}
                                            />
                                        </InputGroup>
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th onClick={onSort}>
                                                        <UpDownButton
                                                            asc={isAsc}
                                                            col_name={key._id}
                                                            select_field={field}
                                                        />
                                                    </th>
                                                    <th onClick={onSort}>
                                                        <UpDownButton
                                                            asc={isAsc}
                                                            col_name={key.name}
                                                            select_field={field}
                                                        />
                                                    </th>
                                                    <th>Email</th>
                                                    <th onClick={onSort}>
                                                        <UpDownButton
                                                            asc={isAsc}
                                                            col_name={key.create_date}
                                                            select_field={field}
                                                        />
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {students.map((student, index) => {
                                                    return (
                                                        <tr
                                                            key={index + 1}
                                                            data-item={JSON.stringify(student)}
                                                            onClick={onShowEdit}
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
                                                        hasPrevious
                                                            ? "page-item"
                                                            : "page-item disabled"
                                                    }
                                                    onClick={
                                                        hasPrevious ? onPreviousPage : null
                                                    }
                                                >
                                                    <button className="page-link" tabIndex="-1">
                                                        <i className="fas fa-chevron-left"/>
                                                    </button>
                                                </li>
                                                {Array.from(getPageShow(), (e, i) => {
                                                    return (
                                                        <li
                                                            key={e}
                                                            className={
                                                                currentPage === e
                                                                    ? "page-item active"
                                                                    : "page-item"
                                                            }
                                                        >
                                                            <button
                                                                className="page-link"
                                                                onClick={onChangePage}
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
                                                        hasNext
                                                            ? "page-item"
                                                            : "page-item disabled"
                                                    }
                                                    onClick={hasNext ? onNextPage : null}
                                                >
                                                    <button className="page-link">
                                                        <i className="fas fa-chevron-right"/>
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
                                                {size + " dòng mỗi trang"}
                                            </button>
                                            <div
                                                className="dropdown-menu"
                                                style={{width: "auto"}}
                                            >
                                                <button
                                                    className="btn btn-outline-secondary dropdown-item"
                                                    type="button"
                                                    value="5"
                                                    onClick={changeSize}
                                                >
                                                    5 dòng mỗi trang
                                                </button>
                                                <button
                                                    className="btn btn-outline-secondary dropdown-item"
                                                    type="button"
                                                    value="10"
                                                    onClick={changeSize}
                                                >
                                                    10 dòng mỗi trang
                                                </button>
                                                <button
                                                    className="btn btn-outline-secondary dropdown-item"
                                                    type="button"
                                                    value="20"
                                                    onClick={changeSize}
                                                >
                                                    20 dòng mỗi trang
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className="float-right"
                                            style={{marginRight: "5px"}}
                                        >
                                            <button type="button" className="btn btn-light">
                                                {"Tổng học viên: " + totalItems}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {showAdd && (
                <AddEditStudent
                    show_add={showAdd}
                    close_modal={showAdd}
                    reload={reload}
                    student={item}
                />
            )}
        </React.Fragment>
    );
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
