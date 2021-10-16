import React, {useEffect, useState} from "react";
import {getMembers} from "../../service/MemberService";
import {showNotification} from "../common/NotifyCation";
import AddEditStudent from "./AddEditStudent";
import UpDownButton from "../common/UpDownButton";
import {getKeyByValue, getTimestamp, handleInput, parseDate, range} from "../common/Utils";
import Select from "react-select";
import {FormControl, Image, InputGroup} from "react-bootstrap";
import DateRange from "../common/DateRange";
import CustomInput from "../common/CustomInput"

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
    const [object, setObject] = useState({
        items: [],
        total_pages: 1,
        current_page: 1,
        has_next: false,
        has_previous: false,
        next_page: 1,
        previous_page: 1,
        total_items: 0,
    })
    const [filter, setFilter] = useState({
        types: [],
        keyword: null,
        sort: {
            is_asc: false,
            field: "ID",
        },
        from_date: null,
        to_date: null,
    })
    const [showAdd, setShowAdd] = useState(false);
    const [size, setSize] = useState(5);
    const [page, setPage] = useState(1);
    const [item, setItem] = useState(null);

    useEffect(() => {
        reload();
    }, [filter,size, page])

    function handleSelect(e) {
        setFilter({
            types: Array.isArray(e) ? e.map((x) => x.value) : [],
            keyword: filter.keyword,
            sort: {
                is_asc: filter.sort.is_asc,
                field: filter.sort.field,
            },
            from_date: filter.from_date,
            to_date: filter.to_date,
        })
    }

    function onSort(event) {
        setFilter({
            sort: {
                is_asc: !filter.sort.is_asc,
                field: event.target.innerText,
            },
            types: filter.types,
            keyword: filter.keyword,
            from_date: filter.from_date,
            to_date: filter.to_date,
        })
    }

    function onChangePage(event) {
        setPage(event.target.attributes.value.value);
    }

    function changeSize(event) {
        const s = event.target.attributes.value.value;
        setPage(parseInt((
            (object.current_page * size - (size - 1)) / s
        ).toString()) + 1);
        setSize(s);
    }

    function reload() {
        getMembers(
            page,
            size,
            getKeyByValue(key, filter.sort.field),
            filter.sort.is_asc,
            filter.types,
            filter.keyword,
            getTimestamp(filter.from_date),
            getTimestamp(filter.to_date)
        ).then((Response) => {
            if (Response.data.code !== -9999) {
                setObject(Response.data.payload)
            } else {
                showNotification(Response.data.message);
            }
        });
    }

    function onKeyPress(event) {
        if (event.charCode === 13) {
            setFilter({
                sort: {
                    is_asc: filter.sort.is_asc,
                    field: filter.sort.field,
                },
                types: filter.types,
                keyword: filter.keyword,
                from_date: filter.from_date,
                to_date: filter.to_date,
            })
        }
    }

    function setDates(dates) {
        if (dates !== null) {
            setFilter({
                sort: {
                    is_asc: filter.sort.is_asc,
                    field: filter.sort.field,
                },
                types: filter.types,
                keyword: filter.keyword,
                from_date: dates[0],
                to_date: dates[1],
            })
        } else {
            setFilter({
                sort: {
                    is_asc: filter.sort.is_asc,
                    field: filter.sort.field,
                },
                types: filter.types,
                keyword: filter.keyword,
                from_date: null,
                to_date: null,
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
        if (object.current_page - 2 < 1) {
            return range(1, object.total_pages > 5 ? 5 : object.total_pages);
        }
        if (object.current_page + 2 > object.total_pages) {
            return range(
                object.total_pages - 5 > 1 ? object.total_pages - 4 : 1,
                object.total_pages
            );
        }
        return range(object.current_page - 2, object.current_page + 2);
    }

    function onPreviousPage() {
        setPage(object.previous_page);
    }

    function onNextPage() {
        setPage(object.next_page);
    }

    function onChangeKeyword(value){
        setFilter({
            sort: {
                is_asc: filter.sort.is_asc,
                field: filter.sort.field,
            },
            types: filter.types,
            keyword: value,
            from_date: filter.from_date,
            to_date: filter.to_date,
        })
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
                                                    filter.types.includes(obj.value)
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
                                            <CustomInput
                                                onSubmit={onChangeKeyword}
                                            />

                                        </InputGroup>
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th onClick={onSort}>
                                                        <UpDownButton
                                                            asc={filter.sort.is_asc}
                                                            col_name={key._id}
                                                            select_field={filter.sort.field}
                                                        />
                                                    </th>
                                                    <th onClick={onSort}>
                                                        <UpDownButton
                                                            asc={filter.sort.is_asc}
                                                            col_name={key.name}
                                                            select_field={filter.sort.field}
                                                        />
                                                    </th>
                                                    <th>Email</th>
                                                    <th onClick={onSort}>
                                                        <UpDownButton
                                                            asc={filter.sort.is_asc}
                                                            col_name={key.create_date}
                                                            select_field={filter.sort.field}
                                                        />
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {object.items.map((student, index) => {
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
                                                        object.has_previous
                                                            ? "page-item"
                                                            : "page-item disabled"
                                                    }
                                                    onClick={
                                                        object.has_previous ? onPreviousPage : null
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
                                                                object.current_page === e
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
                                                        object.has_next
                                                            ? "page-item"
                                                            : "page-item disabled"
                                                    }
                                                    onClick={object.has_next ? onNextPage : null}
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
                                                {"Tổng học viên: " + object.total_items}
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
