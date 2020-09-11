import React, { Component } from 'react';

/**
    PROPS ----
    toggle:
    mode: 'display' // 'display'模式 - 组件重新渲染; 'visibility'模式 - CSS可见切换
*/
export default class Modal extends Component {
    constructor (props) {
        super(props);

        this.state.toggle = this.props.toggle;
        this.state.mode = this.props.mode || 'display';
    }

    render () {
        return this.state.toggle ? (
            <div className="model-dimmer-wrapper">
                { this.props.children }
            </div>
        ) : null;
    }
}
