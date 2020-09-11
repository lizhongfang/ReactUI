import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Accordion, DatePicker} from 'cc-ui';

export default class MyDatePicker extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        return (
            <div style={{ padding: "10px" }}>
                <Accordion activeIndex={0}>
                    <Accordion.Item title={'DatePicker'}>
                        <div style={{ padding: "10px" }}>
                            <DatePicker />
                        </div>
                    </Accordion.Item>
                </Accordion>
            </div>
        );
    }
}
