import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';

import { Utils } from 'cc-ui';


export default class DragdropDemo extends Component {
    constructor (props) {
        super(props);

        this.staticInfo = this.staticInfo || {};
        this.state = {
            enterY: null, currentY: null
        };
        this.state.isEnter = false;

        this.overDelay = false;

        this.clientY = 999999;
    }

    render () {
        // onMouseMove={e => this.handleDragOver(e)}
        return (
            <div>

                <div className="drag-items-conteiner">
                    <div><span draggable="true">Apple</span></div>
                    <div><span draggable="true">Banana</span></div>
                </div>

                <div
                    onDragOver={e => this.handleDragOver(e)}
                    onDragEnter={e => this.handleDragEnter(e)}
                    onDragLeave={e => this.handleDragLeave(e)}
                    id="J_dropContainer" ref="dropContainer" className="Smoothie" style={{ height: '100px', width: '300px', border: this.state.isEnter ? '3px solid red' : '3px solid #e0e0e0', position: 'relative' }}
                >
                    <div className="insert-line" style={{ position: 'absolute', height: '4px', width: '100%', marginTop: '-2px', background: 'blue',
                        top: this.state.position == 'top' ? '0px' : ( this.state.position == 'bottom' ? '100%' : '50%')
                    }}></div>
                </div>

                <div>
                    EnterY: {this.state.enterY}
                </div>
                <div>
                    CurrentY: {this.state.currentY}
                </div>
                <div>
                    Position: {this.state.position}
                </div>
                <div>
                    OverCount: {this.state.overCount}
                </div>
            </div>
        );
    }

    handleMouseDown (e) {
        console.log('--MOUSE DOWN--');
    }

    onDrop(data) {
        console.log(data)
        // => banana
    }

    handleDragEnter (e) {
        e.preventDefault();

        this.state.enterY = e.clientY;

        this.state.overCount = 0;

        this.state.isEnter = true;

        // this.updateRelativeOverPosition(this.state);

        console.log('---ENTER---')
        this.setState({
            isEnter: this.state.isEnter
        })
        // setTimeout(() => this.setState({
        //     isEnter: this.state.isEnter
        // }));
    }


    // function jieliu ( callback, timeDelay ) {
    //     return function () {
    //         var args = arguments;
    //
    //         if (window['shouldDelay']) {
    //             return;
    //         }
    //         callback.apply(null, args);
    //         window['shouldDelay'] = true;
    //         setTimeout(function () { window['shouldDelay'] = false; }, timeDelay);
    //     }
    // }


    handleDragOver (e) {
        window.DragEvent = e.nativeEvent;
        // console.log(e.clientY);
            // this.setState(this.state);

        e.preventDefault();
        // if (this.clientY !== e.clientY
        //     &&
        // )

        // if (e.clientY < this.staticInfo.containerTop || e.clientY > (this.staticInfo.containerTop + this.staticInfo.containerHeight)) {
        //     this.handleDragLeave(e)
        // } else {
        //     !this.state.isEnter && this.handleDragEnter(e);
        // }

        if (this.clientY !== e.clientY) {

            if (Math.max(this.clientY, e.clientY) - Math.min(this.clientY, e.clientY) > 0) {
                this.clientY = e.clientY;
                if (!this.overDelay) {
                    this.state.overCount += 1;
                    this.updateRelativeOverPosition(e.clientY);
                    // this.overDelay = true;
                    // setTimeout(() => (this.overDelay = false), 0);
                }
            }


        }
    }

    handleDragLeave (e) {
        e.preventDefault();

        console.log('---LEAVE---')

        this.state.enterY = null;
        this.state.currentY = null;
        // this.updateRelativeOverPosition(this.state);

        this.state.isEnter = false;
        // setTimeout(() => this.setState({
        //     isEnter: this.state.isEnter,
        //     // overCount: this.state.overCount
        // }));
        this.setState({
            isEnter: this.state.isEnter,
            overCount: this.state.overCount
        })

    }

    updateRelativeOverPosition (hoverPosY) {
        var height = this.staticInfo.containerHeight;
        var enterY = this.staticInfo.containerTop;

        var position = null;

        if (hoverPosY) {
            var fromTop = (hoverPosY - enterY) > 0;

            var distance = hoverPosY - enterY;

            if (distance > 0) {
                var distanceFromTop = distance;

                if (distanceFromTop < (height / 3)) {
                    position = 'top'
                } else if (distanceFromTop < (height / 3 * 2)) {
                    position = 'middle'
                } else if (distanceFromTop <= height) {
                    position = 'bottom'
                }
            }
        }

        if ((this.state.position !== position) && position) {
            this.state.position = position;
            this.setState({ position: this.state.position });
        }
    }

    componentDidMount () {
        console.log(this.refs.dropContainer);

        this.staticInfo = this.staticInfo || {};

        this.staticInfo.containerTop = Utils.getAbsolutePos(this.refs.dropContainer).top;

        this.staticInfo.containerHeight = this.refs.dropContainer.offsetHeight;
        console.log(this.staticInfo);
    }
}
