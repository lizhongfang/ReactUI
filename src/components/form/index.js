import React, { Component } from 'react';
import Radiobox, { RadioboxGroup } from './radiobox';
import Checkbox, { CheckboxGroup } from './checkbox';
import Select from './../select';
import DatePicker from './../date-picker';
import DateTimePicker from './../datetime-picker';
import TimePicker from './../time-picker';
import Input from './input';

import { cloneExtendNestedChildren } from './../../utils';

/**
    PROPS:
    onChange: formData => {  } // FormData 变化回调
*/
export default class Form extends Component {
    constructor (props) {
        super(props);

        this.children = this.props.children;

        this.manageFormElementsData();
    }

    manageFormElements () {
        var children = this.children;

        return children;
    }

    manageFormElementsData () {
        var children = this.children;
        var formData = {};

        children = cloneExtendNestedChildren(children, (childEle) => (
            childEle.type == RadioboxGroup || childEle.type == CheckboxGroup || childEle.type == Input
            || (childEle.type == 'input')
            || (childEle.type == Select)
            || (childEle.type == DatePicker)
            || (childEle.type == DateTimePicker)
            || (childEle.type == TimePicker)
        ), (childEle) => {
            var childProps = childEle.props || {};
            var name = childProps.name || this.generateFormName(childEle);
            if (childEle.type == RadioboxGroup || childEle.type == CheckboxGroup || childEle.type == Input
                || childEle.type == Select || childEle.type == DatePicker || childEle.type == DateTimePicker
                || childEle.type == TimePicker
            ) {
                formData[name] = {
                    value: childProps.value,
                    required: !!childProps.required,
                };
                return Object.assign({}, childProps, { name: name, __parentInjectChange__: (newValue) => this.triggerFormEleChanged(name, newValue) })
            }
            if (childEle.type == 'input' && childProps.type == 'text') {
                formData[name] = {
                    value: childProps.value || childProps.defaultValue,
                    required: !!childProps.required
                };

                var orgOnChange = childProps.onChange;
                var __parentInjectChange__ = (newValue) => this.triggerFormEleChanged(name, newValue);
                var onChange = function (e) {
                    childProps.onChange && typeof childProps.onChange == 'function' && childProps.onChange(e);
                    __parentInjectChange__(e.target.value);
                };

                return Object.assign({}, childProps, { name: name, onChange: onChange });
            }
            // if (childEle.type == Select) {
            //     formData[name] = {
            //         value: childProps.value,
            //         required: !!childProps.required,
            //     };
            //     return Object.assign({}, childProps, { name: name, __parentInjectChange__: (newValue) => this.triggerFormEleChanged(name, newValue) })
            // }
        });

        this.children = children;
        this.formData = formData;
    }

    triggerFormEleChanged (name, value) {
        this.formData[name] = this.formData[name] || {};
        this.formData[name].value = value;

        this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange(this.formatFormData());
    }

    formatFormData () {
        var data = {};
        Object.keys(this.formData).map(name => (data[name] = this.formData[name].value));
        return data;
    }

    generateFormName (childEle) {
        var randomId = (Math.random() * 100).toFixed() + '_' + Date.now();
        var prefix = 'formField';
        if (childEle.type == RadioboxGroup) {
            prefix = 'radioField';
        } else if (childEle.type == CheckboxGroup) {
            prefix = 'checkboxField';
        }
        return prefix + randomId;
    }

    render () {
        return (
            <div>
                {this.children}
            </div>
        );
    }
}
