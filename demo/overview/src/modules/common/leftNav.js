import React, { Component } from 'react';

import CCUI, { Nav, DropDown } from 'cc-ui';

import NavService from './../../models/navService';

export default class LeftNav extends Component {
    constructor (props) {
        super (props);

        this.state = { };
        this.state.activeNavId = 'overview';

        this.onNavItemClick = this.onNavItemClick.bind(this);

        this.service = NavService;
    }

    onNavItemClick (navItem) {
        this.state.activeNavId = navItem.id;
        this.setState({ activeNavId: this.state.activeNavId }, () => {
            this.service.changeNav(navItem);
        });
    }

    render () {
        return (
            <div>
                <Nav onItemClick={this.onNavItemClick} activeId={this.state.activeNavId}>
                    <Nav.Item id={'overview'} name={'组件总览'} href={'/overview'}>

                    </Nav.Item>
                    <Nav.Item id={'commonGroup'} name={'通用'} disabled={true}>
                        <Nav.SubNav>
                            <Nav.Item id={'nav'} name={'导航'} href={'/component-nav'}>
                            </Nav.Item>
                            <Nav.Item id={'dropdown'} name={'下拉框'} href={'/component-dropdown'}>
                            </Nav.Item>
                            <Nav.Item id={'calendar'} name={'日历'} href={'/component-nav'}>
                            </Nav.Item>
                            <Nav.Item id={'timer'} name={'时刻'} href={'/component-nav'}>
                            </Nav.Item>
                            <Nav.Item id={'dateTimePicker'} name={'时间选择器'} href={'/component-nav'}>
                            </Nav.Item>
                            <Nav.Item id={'eventCalendar'} name={'事件营销日历'} href={'/component-dropdown'}>
                            </Nav.Item>
                        </Nav.SubNav>
                    </Nav.Item>
                    <Nav.Item id={'form'} name={'Form'} disabled={true}>
                        <Nav.SubNav>
                            <Nav.Item id={'formContainer'} name={'Form容器'} href={'/component-nav'}>
                            </Nav.Item>
                            <Nav.Item id={'checkbox'} name={'Checkbox'} href={'/component-nav'}>
                            </Nav.Item>
                            <Nav.Item id={'radio'} name={'Radio'} href={'/component-nav'}>
                            </Nav.Item>
                        </Nav.SubNav>
                    </Nav.Item>
                    <Nav.Item id={'layout'} name={'布局'} disabled={true}>
                        <Nav.SubNav>
                            <Nav.Item id={'tree'} name={'树'} href={'/component-nav'}>
                            </Nav.Item>
                            <Nav.Item id={'accordion'} name={'折叠条目'} href={'/component-nav'}>
                            </Nav.Item>
                        </Nav.SubNav>
                    </Nav.Item>
                    <Nav.Item id={'commonExamples'} name={'一些示例'} disabled={true}>
                        <Nav.SubNav>
                            <Nav.Item id={'xhmTodo'} name={'XHM TODO LIST'} href={'/component-nav'}>
                            </Nav.Item>
                        </Nav.SubNav>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}
