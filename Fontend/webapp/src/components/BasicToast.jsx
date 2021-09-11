import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class BasicToast extends Component {
    showNoti (message){
        toast.error(message);
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

export default new BasicToast;
