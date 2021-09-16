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
    };
  }
  showNotification(message) {
    if (this.state[message] === null) {
      toast.error(message);
    } else {
      switch (this.state[message].type) {
        case "info":
          toast.error(this.state[message].vn);
          break;
        case "warn":
          toast.error(this.state[message].vn);
          break;
        case "success":
          toast.error(this.state[message].vn);
          break;
        default:
          toast.error(this.state[message].vn);
      }
    }
  }

  showError = () => {
    toast.error("ERROR Notification");
  };

  showSuccess = () => {
    toast.success("Success Notification");
  };

  showInfo = () => {
    toast.info("Info Notification");
  };

  showWarn = () => {
    toast.warn("Warn Notification");
  };
}

export default new Notification();
