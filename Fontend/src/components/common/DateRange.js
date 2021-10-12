import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import React, {Component} from "react";
import {onStartChange, onEndChange} from "./Utils"

class DateRange extends Component {
    constructor(prods) {
        super(prods);

        this.onEndChange = onEndChange.bind(this);
        this.onStartChange = onStartChange.bind(this);
    }
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }else{
            setTimeout(()=>setTimeout(() => {
                var inputs = document.getElementsByClassName("ant-calendar-input");
                console.log(inputs.length);
                if (inputs.length > 0 && inputs[0]) {
                    inputs[0].blur();
                }
            }));
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
        this.props.reload();
    }

    render() {
        const { startValue, endValue, endOpen } = this.state;
        return (
            <div>
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={startValue}
                    placeholder="Từ"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                    style={{width: "172px", border: 0, boxShadow: "none"}}
                />
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={endValue}
                    placeholder="Đến"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                    style={{width: "172px", border: 0, boxShadow: "none"}}
                />
            </div>
        );
    }
}

export default DateRange;