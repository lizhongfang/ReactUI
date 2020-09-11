import React, { Component } from 'react';

import { classes, extendNestedChildren } from './../../utils';

/**
    PROPS:
    selected: 是否选中
    value: 选择值内容
    disabled: 不可用状态
    onChange: 点击选中回调
*/
class Radiobox extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.selected = !!props.selected;
        this.state.disabled = !!props.disabled;
        this.onSelectValue = this.onSelectValue.bind(this);
    }

    componentWillReceiveProps (newProps) {
        if (newProps) {
            if (newProps.selected !== this.state.selected || newProps.disabled !== this.state.disabled) {
                this.state.selected = newProps.selected;
                this.state.disabled = newProps.disabled;
                this.setState({ selected: this.state.selected, disabled: this.state.disabled });
            }
        }
    }

    onSelectValue () {
        !this.state.disabled && this.triggerOnSelect();
    }

    render () {
        var iconClass = '';
        var { selected, disabled } = this.state;
        if (selected) { // 选中 - 可选
            iconClass = 'iconselected1';
        } else if (!selected) { // 未选中 - 可选
            iconClass = 'iconunselected1';
        }
        disabled && (iconClass = (iconClass + ' disabled'));

        return (
            <div className={classes({ "cc-radiobox": true, "selected": selected, "disabled": disabled })} onClick={this.onSelectValue}>
                <span className={"iconfont radio-icon " + iconClass}></span>
                <span className="cc-radio-label-content">{this.props.children}</span>
            </div>
        );
    }

    triggerOnSelect () {
        this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange(this.props.value);
    }
}

/**
    PROPS:
    value: 选中的内容
    disabled: 不可用状态
    onChange: 改变选中回调
*/
export class RadioboxGroup extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.value = this.props.value;
        this.state.disabled = this.props.disabled;

        this.updateSelectedValue = this.updateSelectedValue.bind(this);

        this.children = this.generateRadioboxes();
    }

    updateSelectedValue (value) {
        this.state.value = value;

        this.setState({ value: this.state.value }, () => {
            this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange(this.state.value);

            this.props.__parentInjectChange__ && typeof this.props.__parentInjectChange__ == 'function' && this.props.__parentInjectChange__(this.state.value);
        });
    }

    generateRadioboxes () {
        var children = this.props.children || [];

        children = extendNestedChildren(children, (childEle) => (childEle.type == Radiobox), (childEle, idx) => {
            var eleProps = Object.assign({}, childEle.props || {});

            var eleOnSelectChange = eleProps.onChange;
            eleProps.onChange = (value) => {
                eleOnSelectChange && typeof eleOnSelectChange == 'function' && eleOnSelectChange(value);
                this.updateSelectedValue(value);
            };

            eleProps.key = eleProps.key || idx;

            var wrapperedChildEle = React.cloneElement(childEle, eleProps);

            return wrapperedChildEle;
        });

        return children;
    }

    updateRadioboxes () {
        var children = this.children || [];

        children = extendNestedChildren(children, (childEle) => (childEle.type == Radiobox), (childEle, idx) => {
            var eleProps = Object.assign({}, childEle.props || {});
            eleProps.selected = this.state.value ? (this.state.value == eleProps.value) : eleProps.selected;
            eleProps.key = eleProps.key || idx;

            var wrapperedChildEle = React.cloneElement(childEle, eleProps);

            return wrapperedChildEle;
        });

        this.children = children;

        return children;
    }

    render () {
        this.updateRadioboxes();

        return (
            <div className="cc-radiobox-group">
                {this.children}
            </div>
        );
    }
}






export default Radiobox;
