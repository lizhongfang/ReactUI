import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Accordion, Calendar} from 'cc-ui';

export default class MyCalendar extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        return (
            <div style={{ padding: "10px" }}>
                <Accordion activeIndex={0}>                    
                    <Accordion.Item title={'Calendar'}>
                        <div style={{ padding: "10px" }}>
                            <Calendar selectedDate={'2020-03-11'} withTodayBtn={true}></Calendar>
                        </div>
                    </Accordion.Item>
                </Accordion>
            </div>
        );
    }
}
