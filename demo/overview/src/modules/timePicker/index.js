import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Accordion,TimePicker} from 'cc-ui';

export default class MyTimePicker extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        return (
            <div style={{ padding: "10px" }}>
                <Accordion activeIndex={0}>
                    <Accordion.Item title={'TimePicker'}>
                        <div style={{ padding: "10px" }}>
                            <TimePicker value={'12:20:23'} />
                        </div>
                    </Accordion.Item>
                </Accordion>
            </div>
        );
    }
}
