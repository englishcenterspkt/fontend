import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import React, {useState} from "react";

const { RangePicker } = DatePicker;

function DateRange() {
    const [startValue, setStartValue] = useState(null);
    const [endValue, setEndValue] = useState(null);
    const [open, setOpen] = useState(true);
    const [style, setStyle] = useState("130px");

    function onChange(dates) {
        if (dates !== null) {
            setStartValue(dates[0]);
            setEndValue(dates[1]);
            this.props.reload();
        } else {
            setStartValue(null);
            setEndValue(null);
            setOpen(true);
            setStyle("130px");
        }
    }

    function onOpenChange() {
        if (startValue !== null || endValue !== null || open) {
            setOpen(false);
            setStyle("330px");
        } else {
            setOpen(true);
            setStyle("130px");
        }
    }

    return (
        <div>
            <RangePicker
                placeholder={["Từ", "Đến"]}
                showTime
                bordered={false}
                style={{width: style}}
                onChange={onChange}
                onOpenChange={onOpenChange}
            />
        </div>
    );
}

export default DateRange;