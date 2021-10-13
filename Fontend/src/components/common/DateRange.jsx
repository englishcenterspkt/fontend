import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import React, {Component} from "react";

const { RangePicker } = DatePicker;

class DateRange extends Component {
    constructor(prods) {
        super(prods);

        this.onChange = this.onChange.bind(this);
    }
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    onChange(dates) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        this.setState({startValue: dates[0], endValue: dates[1]}, () => {this.props.reload()});
    }

    render() {
        return (
            <div>
                <RangePicker
                    renderExtraFooter={() => 'extra footer'}
                    showTime
                    bordered={false}
                    style={{width: "172px"}}
                    onChange={this.onChange}/>
            </div>
        );
    }
}

export default DateRange;