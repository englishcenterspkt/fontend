import React, { Component } from "react";

class UpDownButton extends Component {
  render() {
    return (
      <div className="d-flex flex-row">
        <div>{this.props.col_name}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "0 8px",
          }}
        >
          <img
            alt="up"
            width="10px"
            height="10px"
            src="https://training.omicrm.dev/_next/static/chunks/media/images/ic_sort_up_g.2a19aab73031112.png"
            style={{
              opacity:
                this.props.asc &&
                this.props.select_field === this.props.col_name
                  ? 1
                  : 0.3,
            }}
          />
          <img
            alt="down"
            width="10px"
            height="10px"
            src="https://training.omicrm.dev/_next/static/chunks/media/images/ic_sort_down_g.69973dc0eebd94f.png"
            style={{
              opacity:
                !this.props.asc &&
                this.props.select_field === this.props.col_name
                  ? 1
                  : 0.3,
            }}
          />
        </div>
      </div>
    );
  }
}

export default UpDownButton;
