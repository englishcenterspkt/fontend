import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import React, {useState} from "react";

const { RangePicker } = DatePicker;

function DateRange(props) {
    const [style, setStyle] = useState("130px");
    const [open, setOpen] = useState(true);
    let myDates = null;

    function onChange(dates) {
        console.log("onChange");
        props.setDates(dates);
        myDates = dates;
        if (dates !== null) {
            setOpen(false);
            setStyle("330px");
        } else {
            setOpen(true);
            setStyle("130px");
        }
    }

    function onOpenChange() {
        console.log("onOpenChange " + open);
        if (myDates !== null || open) {
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