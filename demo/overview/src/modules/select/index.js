import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Accordion, Select } from 'cc-ui';
import DropDownDemo from '../dropDown/dropDownDemo';

export default class Lzf extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.selectDataList = [
            {
                value: 'boboChicken',
                label: '钵钵鸡',
                disabled: true
            },
            {
                value: 'fish',
                label: '烤鱼'
            }
        ];
    }

    render () {
        return (
            <div style={{ padding: "10px" }}>
                <Accordion activeIndex={0}>
                    <Accordion.Item title={'Select'}>
                        <div style={{ padding: "10px" }}>
                            <Select onChange={console.log} value={'钵钵鸡'} disabled={false} searchAble>
                                <Select.Option value={'钵钵鸡'}>
                                    <div>
                                        <span><span>钵钵鸡 </span></span><span> xka 最爱</span>
                                    </div>
                                </Select.Option>
                                <Select.Option value={'火锅'}>火锅</Select.Option>
                            </Select>
                        </div>
                        <div style={{ padding: "10px" }}>
                            <Select value={'boboChicken'} searchAble dataList={this.state.selectDataList}></Select>
                        </div>
                    </Accordion.Item>
                </Accordion>
            </div>
        );
    }
}
