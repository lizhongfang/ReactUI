import React, { Component } from 'react';
import DatePicker from './../date-picker';

import Calendar from './../calendar';

export default class DateRangePicker extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.calendarVisible = !!this.state.calendarVisible;
    }

    render () {
        return (
            <div>
                <div>DateRangePicker</div>
            </div>
        );
    }
}
