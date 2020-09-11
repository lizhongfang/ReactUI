import React, { Component } from 'react';
import DropDown from './../dropdown';

import { classes, cloneExtendNestedChildren, getElementTextContent } from './../../utils';

/**
    PROPS: {
        dataList: 可选范围列表,
        value: 选中值,
        valueGetter: 从可选列表元素中取得value的方法
        labelGetter: 从可选列表元素中取得label的方法
        searchAble: 是否支持搜索
        disabled: 不可用状态
        name: Form表单标识name(非必填)
    },

    dataList: [{ // 默认 支持 value，label 结构 ( 在 valueGetter 没有设置的情况下， 默认给到 valueGetter = item => item.value )
        value: 'boboChicken',
        label: '钵钵鸡',
        disabled: true
    }, {
        value: 'fish',
        label: '烤鱼'
    }]
    dataList: [ // 默认 支持 简单字符串 结构
        'boboChicken',
        'fish'
    ]

**/
class Select extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.dataList = this.props.dataList;
        this.state.value = this.props.value;
        this.state.searchAble = !!this.props.searchAble;
        this.state.disabled = !!this.props.disabled;
        this.valueGetter = this.props.valueGetter;
        this.labelGetter = this.props.labelGetter;

        this.children = this.props.children;

        this.dataMode = !!this.state.dataList;

        if (this.dataMode) {
            this.checkDataStructure();
        } else {
            this.manageOptionsDataMap();
        }

        this.state.dropToggle = false;
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state.predicate = '';
        this.state.delayPredicate = '';
        this.predicateChanged = this.predicateChanged.bind(this);

        this.trigerFromOptionChanged = this.trigerFromOptionChanged.bind(this);
    }

    checkDataStructure () {
        var dataList = this.state.dataList || [];
        var dataItem = dataList && dataList[0];
        var valueGetter = this.valueGetter;
        var labelGetter = this.labelGetter;
        var disabledGetter = this.disabledGetter;
        if (dataItem) {
            if (typeof dataItem == 'string') {
                !valueGetter && (valueGetter = function (dataItem) { return dataItem; });
                !labelGetter && (labelGetter = function (dataItem) { return dataItem; });
            }
            if (typeof dataItem == 'object') {
                if (!valueGetter && (dataItem.value || dataItem.key)) {
                    valueGetter = function (dataItem) { return dataItem.value || dataItem.key; };
                }
                if (!labelGetter && (dataItem.label || dataItem.name)) {
                    labelGetter = function (dataItem) { return dataItem.label || dataItem.name; };
                }
                !disabledGetter && (disabledGetter = function (dataItem) { return dataItem.disabled; });
            }
        }
        this.valueGetter = valueGetter;
        this.labelGetter = labelGetter;
        this.disabledGetter = disabledGetter;
    }

    manageOptionsDataMap () {
        var children = this.children || [];
        var dataList = [];

        children = cloneExtendNestedChildren(children, childEle => (childEle.type == Option), (childEle, idx) => {
            var childProps = childEle.props || {};
            var textContent = getElementTextContent(childEle);

            dataList.push({ value: childProps.value, label: textContent });
        });

        this.state.dataList = dataList;
        this.checkDataStructure();
    }

    manageSelectOptionsChildren () {
        var children = this.children || [];

        children = cloneExtendNestedChildren(children, childEle => (childEle.type == Option), (childEle, idx) => {
            var childProps = childEle.props || {};

            var selected = this.state.value ? (this.state.value == childProps.value) : (!!childProps.selected);
            var __parentInjectChange__ = value => this.trigerFromOptionChanged(value);
            var textContent = getElementTextContent(childEle);
            var visible = !this.state.delayPredicate || (textContent.indexOf(this.state.delayPredicate) > -1)

            return Object.assign({}, childProps, { selected, __parentInjectChange__, visible });
        });

        this.children = children;
    }

    renderDataListItems () {
        return (
            <div>
            {
                this.state.dataList && this.state.dataList.map((data, idx) => (
                    <Option key={idx}
                        selected={this.valueGetter(data) == this.state.value}
                        value={this.valueGetter(data)}
                        visible={!this.state.delayPredicate || (this.labelGetter(data).indexOf(this.state.delayPredicate) > -1)}
                        onChange={this.trigerFromOptionChanged}
                        disabled={ this.disabledGetter && this.disabledGetter(data) }
                    >{this.labelGetter(data)}</Option>
                ))
            }
            </div>
        );
    }

    renderOptionListItems () {
        this.manageSelectOptionsChildren();

        return (
            <div>{this.children}</div>
        );
    }

    toggleDropDown () {
        if (this.state.disabled) { return; }

        this.state.dropToggle = true;

        this.setState({ dropToggle: this.state.dropToggle });
    }

    trigerFromOptionChanged (value) {
        this.state.value = value;
        this.setState({ value: this.state.value }, () => {
            this.state.dropToggle = false;
            this.setState({ dropToggle: this.state.dropToggle });
            this.props.__parentInjectChange__ && typeof this.props.__parentInjectChange__ == 'function' && this.props.__parentInjectChange__(this.state.value);
        });
    }

    getSelectedValueLabel () {
        var value = this.state.value;
        if (!value) { return '' };

        if (this.state.dataList) {
            var selectedItem = this.state.dataList.find(item => (this.valueGetter(item) == value));
            return selectedItem && this.labelGetter(selectedItem);
        }
    }

    predicateChanged (event) {
        this.state.predicate = event.target.value;
        this.setState({ predicate: this.state.predicate }, () => {
            clearTimeout(this.searchDelayFlag);

            this.searchDelayFlag = setTimeout(() => {
                this.updateVisible();
            }, 400);
        })
    }

    updateVisible () {
        this.state.delayPredicate = this.state.predicate;
        this.setState({ delayPredicate: this.state.delayPredicate });
    }

    renderSearch () {
        return (
            <div className="search-ipt-container-wrap">
                <div className="cc-form-input-wrap">
                    <span className="iconfont iconsearch"></span>
                    <input type="text" placeholder="SEARCH" value={this.state.predicate} onChange={this.predicateChanged} />
                </div>
            </div>
        );
    }

    render () {
        return (
            <div className={classes({ "cc-select-wrapper": true, "disabled": this.state.disabled })}>
                <div className="cc-form-input-wrap">
                    <span className="cc-select-value" onClick={this.toggleDropDown}>{this.getSelectedValueLabel()}</span>
                    <span className="icon-drop iconfont iconexpand" onClick={this.toggleDropDown}></span>

                    <DropDown toggle={this.state.dropToggle} onClosed={() => (this.state.dropToggle = false)}>
                        { this.state.searchAble && this.renderSearch() }
                        { this.dataMode ? this.renderDataListItems() : this.renderOptionListItems() }
                    </DropDown>
                </div>
            </div>
        );
    }
}

// onChange
class Option extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.value = this.props.value;
        this.state.selected = this.props.selected;
        this.state.visible = !!this.props.visible;
        this.state.disabled = !!this.props.disabled;

        this.onSelectValue = this.onSelectValue.bind(this);
    }

    componentWillReceiveProps (newProps) {
        if (newProps) {
            if (newProps.visible !== this.state.visible) {
                this.state.visible = newProps.visible;
                this.setState({ visible: this.state.visible });
            }
        }
    }

    onSelectValue () {
        if (this.state.disabled) { return; }

        this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange(this.state.value);
        this.props.__parentInjectChange__ && typeof this.props.__parentInjectChange__ == 'function' && this.props.__parentInjectChange__(this.state.value);
    }

    render () {
        return this.state.visible ? (
            <div className={classes({ "cc-select-option-wrapper": true, "disabled": this.state.disabled })} onClick={this.onSelectValue}>
                <div className={classes({ "cc-select-option": true, "selected": this.state.selected })}>{this.props.children}</div>
            </div>
        ) : null;
    }
}

Select.Option = Option;

export default Select;
