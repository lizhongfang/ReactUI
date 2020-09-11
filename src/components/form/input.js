import React, { Component } from 'react';
import { classes } from './../../utils';

export default class Input extends Component {
    constructor (props) {
        super(props);

        this.state = {};
        this.state.value = this.props.value;
        this.state.require = this.props.require;
        this.state.invalid = false;
        this.state.invalidMsg = null;

        this.onChange = this.onChange.bind(this);
    }

    onChange (event) {
        this.state.value = event.target.value;
        this.checkInvalid();

        this.setState(this.state, () => {
            this.props.onChange && typeof this.props.onChange == 'function' && this.props.onChange(this.state.value);
            this.props.__parentInjectChange__ && typeof this.props.__parentInjectChange__ == 'function' && this.props.__parentInjectChange__(this.state.value);
        });
    }

    checkInvalid () {
        var value = this.state.value;

        this.state.invalid = false;
        this.state.invalidMsg = null;

        if (this.state.require) {
            this.state.invalid = !value;
            this.state.invalidMsg = this.state.invalid ? 'Should Not Be Empty !!' : null;
        }
    }

    render () {
        return (
            <div className={classes({ "cc-form-input-wrap": true, "invalid": this.state.invalid })}>
                <input type="text" required value={this.state.value} name="name" onChange={this.onChange}></input>
                { this.state.invalidMsg && <div className="cc-invalid-msg">{this.state.invalidMsg}</div> }
            </div>
        );
    }
}
