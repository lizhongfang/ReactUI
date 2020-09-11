import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Accordion, Calendar, DatePicker, Timer, TimePicker, DateTimePicker, Tree, Radiobox, RadioboxGroup, Checkbox, CheckboxGroup, Form, Input, Select,Button,Pagination,Tabs,Steps,Drawer } from 'cc-ui';
import TreeDemo from './treeDemo';
import DragdropDemo from './dragdropDemo';

import DropDownDemo from './dropDownDemo';
import XHMImg from './xhm.img';

export default class Home extends Component {
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
        this.state.pageState = {
            page:1,
            limit:10
        };
        this.state.limitOptions = [
          10,15,30,50,100
        ];
        this.state.tabsNavList =  [
          'Tab1','Tab2','Tab3'
        ]
        this.state.stepDataList = [
          { id: 'step1', name: '文件选择' },
          { id: 'step2', name: '属性设置' },
          { id: 'step3', name: '预览保存' }
        ]
        this.state.currentStepId = 2;
        this.state.drawerToggle =  false;

        this.onTabChange = this.onTabChange.bind(this);
    }
    onTabChange(activeTabId){
         // console.log(activeTabId)
    }
    getOnPaginationChange(obj){
         // console.log(obj)
    }
    onStepChange(){
        this.setState({
           currentStepId:3
        })
    }
    openDrawer(){
      this.setState({
        drawerToggle:true
      })
    }

    render () {
        return (
            <div style={{ padding: "10px" }}>
                <Accordion activeIndex={0}>
                          <Accordion.Item title={'Drawer'}>
                            <div style={{ padding: "10px" }}>
                               <Drawer  title='Basice Drawer' toggle={this.state.drawerToggle} clickOutsideHide={false}>
                                   <div> 抽屉容器内元素 </div>
                                   <div> 抽屉容器内元素 </div>
                                   <div> 抽屉容器内元素 </div>
                               </Drawer>
                               <div style={{marginTop:"10px"}}>
                                 <Button  type={'primary'} value={'open'} onClick={()=>{this.openDrawer()}}/>
                               </div>
                            </div>
                        </Accordion.Item>
                        <Accordion.Item title={'Steps'}>
                          <div style={{ padding: "10px" }}>
                             <Steps stepDataList={this.state.stepDataList} currentStepId={this.state.currentStepId}></Steps>
                             <div style={{marginTop:"10px"}}>
                               <Button  type={'primary'} value={this.state.currentStepId != this.state.stepDataList.length ? '下一步' :'完成'} onClick={()=>{this.onStepChange()}}/>
                             </div>
                          </div>
                      </Accordion.Item>
                      <Accordion.Item title={'Tabs'}>
                          <div style={{ padding: "10px" }}>
                            <Tabs  activeTabId={'Tab1'} tabsNavList={this.state.tabsNavList} onChange={this.onTabChange}>
                               <Tabs.TabContent tabId={'Tab1'} title={'Tab1'}>
                                   <div>Content of Tab Pane 1</div>
                               </Tabs.TabContent>
                               <Tabs.TabContent tabId={'Tab2'} title={'Tab2'} disabled={true}>
                                   <div>Content of Tab Pane 2</div>
                               </Tabs.TabContent>
                               <Tabs.TabContent tabId={'Tab3'} title={'Tab3'}>
                                   <div>Content of Tab Pane 3</div>
                               </Tabs.TabContent>
                            </Tabs>
                        </div>
                    </Accordion.Item>
                    <Accordion.Item title={'Pagination'}>
                        <div style={{ padding: "10px" }}>
                            <Pagination  total={'172'} limit={this.state.pageState.limit}  limitOptions={this.state.limitOptions} page={this.state.pageState.page} onChange={this.getOnPaginationChange}/>
                        </div>
                    </Accordion.Item>
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

                    <Accordion.Item title={'Checkbox'}>
                        <div style={{ padding: "10px" }}>
                            <CheckboxGroup onChange={console.log}>
                                <Checkbox selected disabled value='XKEA' indeterminate>I Love XKEA</Checkbox>
                                <div>
                                    <span>
                                        <Checkbox value='First'>
                                            <div style={{ width: '400px', padding: '0 20px' }}>
                                                <div style={{ textAlign: 'center', fontSize: '13px', margin: '20px' }}>--- AnyThing That Inner Checkbox Content ---</div>
                                                <div>
                                                    <div style={{ textAlign: 'center', fontSize: '13px', margin: '20px' }}>面向对象面相君, 不负代码不负卿</div>
                                                    <div style={{ textAlign: 'center', fontSize: '13px', margin: '20px' }}><XHMImg /></div>
                                                </div>
                                            </div>
                                        </Checkbox>
                                        <div>SomeThing ... </div>
                                    </span>
                                </div>
                                <Checkbox selected value='Third' indeterminate>三方人群</Checkbox>
                                <Checkbox selected disabled value='Mix'>混合人群</Checkbox>
                            </CheckboxGroup>
                        </div>
                    </Accordion.Item>

                    <Accordion.Item title={'Radiobox'}>
                        <div style={{ padding: "10px" }}>
                            <RadioboxGroup value='XKEA' onChange={console.log}>
                                <Radiobox selected disabled value='XKEA'>I Love XKEA</Radiobox>
                                <span><span><span>
                                <div>
                                <Radiobox selected value='First'>
                                    <div style={{ width: '400px', padding: '0 20px' }}>
                                        <div style={{ textAlign: 'center', fontSize: '13px', margin: '20px' }}>--- AnyThing That Inner RadioBox Content ---</div>
                                        <div>
                                            <div style={{ textAlign: 'center', fontSize: '13px', margin: '20px' }}>面向对象面相君, 不负代码不负卿</div>
                                            <div style={{ textAlign: 'center', fontSize: '13px', margin: '20px' }}><XHMImg /></div>
                                        </div>
                                    </div>
                                </Radiobox>
                                <span>Some Other DOM</span>
                                </div>
                                </span></span></span>
                                <Radiobox selected disabled value='Third'>三方人群</Radiobox>
                                <Radiobox selected value='Mix'>混合人群</Radiobox>
                            </RadioboxGroup>
                        </div>
                    </Accordion.Item>

                    <Accordion.Item title={'Dropdown'}>
                        <div style={{ padding: "10px" }}>
                            <DropDownDemo />
                        </div>
                    </Accordion.Item>
                    <Accordion.Item title={'Tree'}>
                        <div style={{ padding: "10px" }}>
                            <TreeDemo  />
                        </div>
                    </Accordion.Item>
                    <Accordion.Item title={'Calendar'}>
                        <div style={{ padding: "10px" }}>
                            <Calendar selectedDate={'2020-03-11'} withTodayBtn={true}></Calendar>
                        </div>
                    </Accordion.Item>
                    <Accordion.Item title={'Timer'}>
                        <div style={{ padding: "10px" }}>
                            <Timer value={'12:20:23'} />
                        </div>
                    </Accordion.Item>
                    <Accordion.Item title={'DatePicker'}>
                        <div style={{ padding: "10px" }}>
                            <DatePicker />
                        </div>
                    </Accordion.Item>
                    <Accordion.Item title={'TimePicker'}>
                        <div style={{ padding: "10px" }}>
                            <TimePicker value={'12:20:23'} />
                        </div>
                    </Accordion.Item>
                    <Accordion.Item title={'DateTimePicker'}>
                        <div style={{ padding: "10px" }}>
                            <DateTimePicker  />
                        </div>
                    </Accordion.Item>
                    <Accordion.Item title={'Button'}>
                        <div style={{ padding: "10px" }}>
                           <div style={{marginBottom:'10px'}}>
                                <Button  type={'primary'} value={'primary'} onClick={()=>{console.log('function')}}/>
                           </div>
                           <div style={{marginBottom:'10px'}}>
                                <Button  type={'primary'} disabled={true} value={'disabled'}/>
                           </div>
                           <div style={{marginBottom:'10px'}}>
                                <Button  value={'default'} />
                           </div>
                           <div style={{marginBottom:'10px'}}>
                                <Button  type={'primary'} value={'loading'} isLoading={true}/>
                           </div>
                           <div style={{marginBottom:'10px'}}>
                                <Button  type={'primary'} value={'click me!'} isLoading={false} onClick={()=>{console.log('function')}}/>
                           </div>
                        </div>
                    </Accordion.Item>


                </Accordion>
            </div>
        );
    }
}
