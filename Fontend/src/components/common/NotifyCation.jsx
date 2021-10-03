import { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param_not_null: {
        vn: "Vui lòng điền đầy đủ dữ liệu!",
        type: "warn",
      },
      member_not_exist: {
        vn: "Người dùng này không tồn tại!",
        type: "info",
      },
      password_incorrect: {
        vn: "Mật khẩu không chính xác!",
        type: "info",
      },
      member_exist: {
        vn: "Người dùng này đã tồn tại!",
        type: "info",
      },
      success_add: {
        vn: "Thêm thành công",
        type: "success",
      },
      success_update: {
        vn: "Chỉnh sửa thành công",
        type: "success",
      },
    };
  }
  showNotification(message) {
    if (this.state[message] === null) {
      toast.error(message);
    } else {
      switch (this.state[message].type) {
        case "info":
          toast.info(this.state[message].vn);
          break;
        case "warn":
          toast.warn(this.state[message].vn);
          break;
        case "success":
          toast.success(this.state[message].vn);
          break;
        default:
          toast.error(this.state[message].vn);
      }
    }
  }
}

export default new Notification();
