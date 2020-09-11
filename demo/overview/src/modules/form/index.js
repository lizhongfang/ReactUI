import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Accordion, Calendar, DatePicker, Timer, TimePicker, DateTimePicker, Tree, Radiobox, RadioboxGroup, Checkbox, CheckboxGroup, Form, Input, Select } from 'cc-ui';

export default class MyForm extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        return (
            <div style={{ padding: "10px" }}>
                <Accordion activeIndex={0}>
                    <Accordion.Item title={'Form'}>
                        <div style={{ padding: "10px" }}>
                            <Form onChange={console.log}>
                                <div className="cc-form-row">
                                    <span className="cc-form-label">标题(XHM-Input):</span>
                                    <div className="cc-form-input-container">
                                        <Input require name="xhmName" value={'初始化标题'} />
                                    </div>
                                </div>
                                <div className="cc-form-row">
                                    <span className="cc-form-label">标题(原生input):</span>
                                    <div className="cc-form-input-container">
                                        <div className="cc-form-input-wrap">
                                            <input type="text" required defaultValue={''} name="name" onChange={ event => console.log(event.target.value) }></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="cc-form-row">
                                    <span className="cc-form-label">想吃什么:</span>
                                    <div className="cc-form-input-container">
                                        <CheckboxGroup value={['hotPot', 'boboChicken']} onChange={console.log} name="xkeaLikes">
                                            <Checkbox selected value='hotPot'>火锅</Checkbox>
                                            <Checkbox selected value='fish'>烤鱼</Checkbox>
                                            <Checkbox selected value='boboChicken'>钵钵鸡</Checkbox>
                                        </CheckboxGroup>
                                    </div>
                                </div>
                                <div className="cc-form-row">
                                    <span className="cc-form-label">什么时候吃:</span>
                                    <div className="cc-form-input-container">
                                        <RadioboxGroup value='evening' onChange={console.log} name="xkeaWantTime">
                                            <Radiobox value='morning'>早上</Radiobox>
                                            <Radiobox value='afternoon'>中午</Radiobox>
                                            <Radiobox value='evening'>晚上</Radiobox>
                                        </RadioboxGroup>
                                    </div>
                                </div>

                                <div className="cc-form-row">
                                    <span className="cc-form-label">填个备注吧:</span>
                                    <div className="cc-form-input-container">
                                        <div className="cc-form-input-wrap">
                                            <input type="text" defaultValue={''} name="remark"></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="cc-form-row">
                                    <span className="cc-form-label">想吃什么:</span>
                                    <div className="cc-form-input-container">
                                        <Select onChange={console.log} value={''}>
                                            <Select.Option value={'钵钵鸡'}>
                                                <div>
                                                    <span><span>钵钵鸡 </span></span><span> xka 最爱</span>
                                                </div>
                                            </Select.Option>
                                            <Select.Option value={'火锅'}>火锅</Select.Option>
                                        </Select>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Accordion.Item>
              </Accordion>
            </div>
        );
    }
}
