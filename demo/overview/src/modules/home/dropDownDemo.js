import React, { Component } from 'react';

import { DropDown } from 'cc-ui';

import XHMImg from './xhm.img';

export default class Demo extends Component {
    constructor (props) {
        super(props);

        this.state = {};

        this.state.dropdownVisible = false;
    }

    toggleDropDown (toggle) {
        this.state.dropdownVisible = toggle === false ? false : true;
        this.setState({ dropdownVisible: this.state.dropdownVisible });
    }

    render () {
        return (
            <div>
                <div><span className="span-btn" onClick={() => this.toggleDropDown()}>DropDownOpen</span></div>
                <DropDown toggle={this.state.dropdownVisible} onClosed={() => this.toggleDropDown(false)}>
                    <div style={{ width: '400px', padding: '0 20px' }}>
                        <div style={{ textAlign: 'center', fontSize: '13px', margin: '20px' }}>--- AnyThing That Inner Drop Panel ---</div>
                        <div>
                            <div style={{ textAlign: 'center', fontSize: '13px', margin: '20px' }}>面向对象面相君, 不负代码不负卿</div>
                            <div style={{ textAlign: 'center', fontSize: '13px', margin: '20px' }}><XHMImg /></div>
                        </div>
                    </div>
                </DropDown>
            </div>
        );
    }
}
