import React, {useState} from "react";
import {addMember, updateMember} from "../../service/MemberService";
import {showNotification} from "../common/NotifyCation";
import ImageUpload from "../common/ImageUpload";
import {storage} from "../common/firebase/Config";

function AddEditStudent(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    function onSubmit(e) {
        // e.preventDefault();
        if (props.student._id === -1) {
            addMember(
                name,
                email,
                password
            ).then((Response) => {
                if (Response.data.code !== -9999) {
                    handleUpload(
                        "avatar-" + Response.data.payload._id
                    );
                    showNotification("success_add");
                    props.reload();
                    props.close_modal();
                } else {
                    showNotification(Response.data.message);
                }
            });
        } else {
            updateMember(props.student._id, name).then(
                (Response) => {
                    if (Response.data.code !== -9999) {
                        handleUpload(props.student._id);
                        showNotification("success_update");
                        props.close_modal();
                        props.reload();
                    } else {
                        showNotification(Response.data.message);
                    }
                }
            );
        }
    }

    function handleUpload(name) {
        const { image } = {url: url, file: file};
        storage.ref(`images/${name}.png`).put(image);
    }

    function onSetImage(url, file) {
        setUrl(url);
        setFile(file);
    }

        return (
            <div hidden={!props.show_add} className="custom-css-001">
                <div
                    className="custom-css-002"
                    onClick={() => props.close_modal()}
                />
                <div className="modal-content custom-css-003">
                    <form className="needs-validation" noValidate>
                        <div className="modal-header">
                            <h4>Thông tin học viên</h4>
                            <button
                                className="btn btn-link"
                                onClick={() => props.close_modal()}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body custom-css-004">
                            <div className="form-group"></div>
                            <div className="form-group">
                                <ImageUpload url={url} onSetImage={onSetImage}/>
                            </div>
                            <div className="form-group">
                                <label>Họ và tên</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    onChange={(event)=>{
                                        setName(event.target.value)
                                    }}
                                    required
                                    value={
                                        name === ""
                                            ? props.student.name
                                            : name
                                    }
                                />
                                <div className="invalid-feedback">What's your name?</div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    onChange={(event)=>{
                                        setEmail(event.target.value)
                                    }}
                                    required
                                    value={
                                        email === ""
                                            ? props.student.email
                                            : email
                                    }
                                />
                                <div className="invalid-feedback">Oh no! Email is invalid.</div>
                            </div>
                            <div
                                className="form-group"
                                hidden={props.student._id !== -1}
                            >
                                <label>Mật khẩu</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    onChange={(event)=>{
                                        setPassword(event.target.value)
                                    }}
                                    required
                                    value={password}
                                />
                                <div className="valid-feedback">Good job!</div>
                            </div>
                        </div>
                        <div className="modal-footer text-right">
                            <button className="btn btn-primary" onClick={onSubmit}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
}

AddEditStudent.defaultProps = {
    show_add: false,
    student: {
        name: "",
        email: "",
        avatar: null,
    },
};

export default AddEditStudent;
