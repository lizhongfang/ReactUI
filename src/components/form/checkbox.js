import React, { Component } from 'react';

import { classes, extendNestedChildren } from './../../utils';

class Checkbox extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.selected = !!props.selected;
        this.state.disabled = !!props.disabled;
        this.state.indeterminate = !!props.indeterminate;

        this.onToggleValue = this.onToggleValue.bind(this);
    }

    componentWillReceiveProps (newProps) {
        if (newProps) {
            if (newProps.selected !== this.state.selected || newProps.disabled !== this.state.disabled)
            this.state.selected = newProps.selected;
            this.state.disabled = newProps.disabled;
            this.setState({ selected: this.state.selected, disabled: this.state.disabled });
        }
    }

    onToggleValue () {
        if (!this.state.disabled) {
            this.state.selected = !this.state.selected;
            this.state.indeterminate = false;
            this.setState({ selected: this.state.selected, indeterminate: this.state.indeterminate }, () => this.triggerOnSelect());
        }
    }

    triggerOnSelect () {
        this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange(this.state.selected, this.props.value, this.state);
    }

    render () {
        var iconClass = '';
        var { selected, indeterminate, disabled } = this.state;
        if (selected) { // 选中 - 可选
            iconClass = 'iconselected';
        } else if (!selected) { // 未选中 - 可选
            iconClass = 'iconunselected';
        }
        if (indeterminate) {
            iconClass = 'iconselectedsome';
        }
        disabled && (iconClass = (iconClass + ' disabled'));

        return (
            <div className={classes({ "cc-checkbox": true, "selected": selected, "disabled": disabled })} onClick={this.onToggleValue}>
                <span className={"iconfont check-icon " + iconClass}></span>
                <span className="cc-check-label-content">{this.props.children}</span>
            </div>
        );
    }
}



export class CheckboxGroup extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.value = this.props.value || null;
        this.state.disabled = this.props.disabled;

        this.children = this.props.children || [];

        this.manageChildCheckboxProps();
        this.updateCheckboxes();
        this.manageCheckData();
    }

    manageChildCheckboxProps () {
        var children = this.children;

        children = extendNestedChildren(children, childEle => (childEle.type == Checkbox) , childEle => {
            var eleProps = Object.assign({}, childEle.props || {});

            var eleOnSelectChange = eleProps.onChange;

            eleProps.onChange = (selected, value) => {
                eleOnSelectChange && typeof eleOnSelectChange == 'function' && eleOnSelectChange(selected, value);
                this.updateCheckData(selected, value);
            };

            eleProps.key = eleProps.key || Math.random();

            var wrapperedChildEle = React.cloneElement(childEle, eleProps);

            return wrapperedChildEle;
        });

        this.children = children;
        return this.children;
    }

    manageCheckData () {
        var children = this.children;
        var checkDataList = [];

        extendNestedChildren(children, childEle => (childEle.type == Checkbox), (childEle, idx) => {
            var eleProps = childEle.props || {};
            checkDataList.push({
                value: eleProps.value, selected: !!eleProps.selected
            });
        });

        var checkDataMap = {};
        checkDataList.map(data => (checkDataMap[data.value] = data));

        this.checkDataList = checkDataList;
        this.checkDataMap = checkDataMap;
    }

    updateCheckData (selected, value) {
        this.checkDataMap[value] && (this.checkDataMap[value].selected = !!selected);

        this.state.value = this.checkDataList.filter(data => data.selected).map(data => data.value);

        this.setState({ value: this.state.value }, () => {
            this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange(this.state.value);

            this.props.__parentInjectChange__ && typeof this.props.__parentInjectChange__ == 'function' && this.props.__parentInjectChange__(this.state.value);
        });
    }

    updateCheckboxes () {
        var children = this.children || [];
        var value = this.state.value || [];

        children = extendNestedChildren(children, childEle => (childEle.type == Checkbox), (childEle, idx) => {
            if (childEle.type == Checkbox) {
                var eleProps = Object.assign({}, childEle.props || {});
                eleProps.selected = this.state.value ? (this.state.value.indexOf(eleProps.value) > -1) : eleProps.selected;
                eleProps.key = eleProps.key || idx;

                var wrapperedChildEle = React.cloneElement(childEle, eleProps);

                return wrapperedChildEle;
            }
            return childEle;
        });

        // children = children.map();

        this.children = children;

        return children;
    }

    render () {
        this.updateCheckboxes();

        // debugger;
        return (
            <div className="cc-checkbox-group">
                {this.children}
            </div>
        );
    }
}







export default Checkbox;
