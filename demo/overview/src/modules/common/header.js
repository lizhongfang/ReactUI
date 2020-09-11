import React, { Component } from 'react';

export default class Header extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="header-container">
                <span className="header-nav">
                    <div className="header-logo">
                      
                    </div>
                    <span className="header-title">
                        CC UI
                    </span>
                    <span className="header-sub-title">我的 通用组件集合（ React ）</span>
                </span>
            </div>
        );
    }
}
