import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Accordion} from 'cc-ui';

import DropDownDemo from './dropDownDemo';

export default class DropDown extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div style={{ padding: "10px" }}>
                <Accordion activeIndex={0}>
                    <Accordion.Item title={'Dropdown'}>
                        <div style={{ padding: "10px" }}>
                            <DropDownDemo />
                        </div>
                    </Accordion.Item>
                </Accordion>
            </div>
        );
    }
}
