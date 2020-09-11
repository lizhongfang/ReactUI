import React, { Component } from 'react';

const CreateDimmer = function () {
    var dimmer = document.createElement('DIV');
    dimmer.setAttribute('class', 'drop-dimmer');
    document.body.appendChild(dimmer);
    return dimmer;
}

const DeleteDimmer = function (dimmer) {
    dimmer && document.body.removeChild(dimmer);
}

export default class DropDown extends Component {
    constructor (props) {
        super (props);

        this.state = {};
        this.state.toggle = !!this.props.toggle;
        this.state.clickOutsideHide = this.props.clickOutsideHide !== false;
        // this.state
    }

    componentWillReceiveProps (newProps) {
        if (newProps) {
            // this.props.toggle = newProps.toggle;
            this.state.toggle = newProps.toggle;

            this.setState({ toggle: this.state.toggle }, () => this.toggleDimmer());
        }
    }

    render () {
        return this.state.toggle ? (
            <div className="dropdown-container dropdown-panel-container">
                { this.props.children }
            </div>
        ) : null;
    }

    toggleDimmer () {
        var toggle = !!this.state.toggle;

        if (toggle && !this.dimmerEle) {
            this.dimmerEle = CreateDimmer();

            this.state.clickOutsideHide && (this.dimmerEle.onclick = () => {
                this.state.toggle = false;
                this.setState({ toggle: this.state.toggle }, () => {
                    this.toggleDimmer();
                    this.props.onClosed && (typeof this.props.onClosed == 'function') && this.props.onClosed();
                });
            });
        } else {
            this.dimmerEle && DeleteDimmer(this.dimmerEle);
            this.dimmerEle = null;
        }
    }

    componentDidMount () {
        this.toggleDimmer();
    }
}
