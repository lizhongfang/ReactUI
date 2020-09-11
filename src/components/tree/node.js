import React, { Component } from 'react';

import ObserverComponent from './../../core/observerComponent';

import { classes, getAbsolutePos } from './../../utils';

class Node extends ObserverComponent {
    constructor (props) {
        super(props);
        this.props = props || { };
        this.id = this.props.id || null;
        this.service = props.service;

        this.init();
        this.bindEvents();

        this.expandAble = true;
    }

    init () {
        this.state = {};
        this.updateData();
    }

    dataDiff (prevData, nextData) {
        return !prevData
        || prevData.name !== nextData.name
        || prevData.selected !== nextData.selected
        || prevData.expanded !== nextData.expanded
        || prevData.visible !== nextData.visible
        || false;
    }

    updateData () {
        var originData = this.state.data;
        var newData = this.service.getData(this.id);
        var isDiff = this.dataDiff(originData, this.service.getData(this.id));
        this.state.data = Object.assign({}, newData);
        // isDiff && (this.state.data = Object.assign({}, newData));
        return isDiff;
    }

    updateState () {
        var diff = this.updateData();

        return new Promise((resolve) => {
            diff && this.setState(this.state, () => { console.log('UPDATED-STATUS'); resolve(); });
            !diff && resolve();
        });


        // !diff && this.stateUpdated();
        // return diff;
    }

    stateUpdated () {

    }

    // toggleChanged () {
    //     this.updateState();
    // }

    // bindEvent () {
    //     this.selectedChanged = node => this.updateState();
    //     this.service.bindEvent('selectedChanged', this.selectedChanged);
    //     this.toggleChanged = node => this.updateState();
    //     this.service.bindEvent('toggleChanged', this.toggleChanged);
    //     this.visibleChanged = node => this.updateState();
    //     this.service.bindEvent('visibleChanged', this.visibleChanged);
    // }
    //
    // unbindEvent () {
    //     this.service.unbindEvent('selectedChanged', this.selectedChanged);
    //     this.service.unbindEvent('toggleChanged', this.toggleChanged);
    //     this.service.unbindEvent('visibleChanged', this.visibleChanged);
    // }

    bindEvents () {
        this.selectedChanged = node => this.updateState();
        this.bindEvent('selectedChanged', this.selectedChanged);
        this.toggleChanged = node => this.updateState();
        this.bindEvent('toggleChanged', this.toggleChanged);
        this.visibleChanged = node => this.updateState();
        this.bindEvent('visibleChanged', this.visibleChanged);
    }

    clickNode () {
        this.service.selectNode(this.id);
    }

    toggleChildren (e) {
        this.service.toggleChildren(this.id);
        e && e.stopPropagation();
    }

    renderItemIcon () {
        return null;

        // return (<span className="iconfont tree-icon-a-folder iconfolder1"></span>);
    }

    renderInnerContent () {
        var data = this.state.data;
        return (
            <span className={classes({'selected': data.selected, 'tree-node-name': true})}>
                <span>{data.name}</span>
                { data.otherInfo && <span className="other-info">{data.otherInfo}</span> }
            </span>
        );
    }

    renderContent () {
        var data = this.state.data;
        var service = this.service;
        var hasChildren = data && data.children && data.children.length > 0;
        var expandAble = this.expandAble && hasChildren;

        return (
            <div className={[
                'tree-node-content',
                this.currentAction ? 'active' : null,
                data.editAble ? 'edit-mode' : null,
                data.selected ? 'selected' : null
            ].join(' ')}
            onClick={this.clickNode.bind(this)}
            >
                { !expandAble && <span style={{visibility: 'hidden'}} className="tree-icon-a-r iconfont iconnext"></span> }
                { !data.expanded && expandAble && <span style={{'visibility': !expandAble ? 'hidden' : 'visible' }} className="tree-icon-a-r iconfont iconnext" onClick={this.toggleChildren.bind(this)} ></span> }
                { data.expanded && expandAble && <span style={{'visibility': !expandAble ? 'hidden' : 'visible' }} className="tree-icon-a-d iconfont iconexpand" onClick={this.toggleChildren.bind(this)} ></span> }
                { this.renderItemIcon() }
                { this.renderInnerContent() }
            </div>
        )
    }

    render () {
        var data = this.state.data;
        var service = this.service;
        var hasChildren = data && data.children && data.children.length > 0;
        var expandAble = this.expandAble && hasChildren;

        // debugger;

        var SelfNodeComponent = this.constructor; // For OVERRITE Node Component

        return (
            <div id={'J_SUPER_TREE_NODE_' + data.id}
                className="tree-node group-tree-node"
                style={{ 'display': (data.visible === false) ? 'none' : '' }}
            >
                { this.renderContent() }
                <div className="tree-node-children-wrap" style={{ display: data.expanded && hasChildren ? 'block' : 'none' }}>
                {
                    (data.children || []).map(function (childData) {
                        return (<SelfNodeComponent id={childData.id} service={service} key={childData.id} />);
                    })
                }
                </div>
            </div>
        );
    }

    // componentWillUnmount () {
    //     this.unbindEvent();
    // }
}

import { Draggable, Droppable } from 'react-drag-and-drop';

export class DraggableNode extends Node {
    constructor (props) {
        super(props);

        // this.service = this.props.service;

        this.state = this.state || {};
        this.state.hoverPos = null;
        this.state.dropEnable = true;

        this.domInfo = {};
        this.hoverClientY = null;
        this.refId = 'J_dropContainer' + Math.random().toFixed(2) * 100 + this.id;
    }

    bindEvents () {
        Node.prototype.bindEvents.call(this);

        this.dragStart = () => {
            this.state.dropEnable = this.service.checkDropEnable(this.id);
            this.updateState();
        }
        this.bindEvent('dragStart', this.dragStart);

        this.dragEnd = () => {
            this.state.dropEnable = true;
            this.updateState();
        };

        this.bindEvent('dragEnd', this.dragEnd);
    }

    // unbindEvent () {
    //     Node.prototype.unbindEvent.call(this);
    //
    //     this.service.unbindEvent('dragStart', this.dragStart);
    //     this.service.unbindEvent('dragEnd', this.dragStart);
    // }

    updateState () {
        Node.prototype.updateState.call(this).then(() => this.stateUpdated());
    }

    stateUpdated () {
        this.initDomInfo();
    }

    renderContent () {
        var defaultContent = Node.prototype.renderContent.call(this);

        return (
                <div
                    style={{ position: 'relative' }}
                >
                <div id={this.refId}
                    ref={ele => (this.containerEle = ele)}
                    className={classes({
                        'drop-container': true,
                        "drag-handler": false,
                    })}
                    style={{ position: 'absolute', top: '0px', left: 0, right: 0, bottom: '0px' }}
                    onDragEnter={e => this.onDragEnter(e)}
                    onDragOver={e => this.onDragOver(e)}
                    onDragLeave={e => this.onDragLeave(e)}

                    onDrop={e => this.onDrop(e)}
                >
                </div>
                <div
                    className={classes({
                        "drag-handler": true,
                        'drag-hover': this.state.isDragHover,
                        ['hover-pos-' + this.state.hoverPos]: this.state.hoverPos,
                        'drop-disable': !this.state.dropEnable
                    })}
                    draggable="true"
                    onDragStart={e => this.onDragStart(e)}
                    onDragEnd={e => this.onDragEnd(e)}
                >
                    <div className="insert-top-line"></div>
                    {defaultContent}
                    <div className="insert-bottom-line"></div>
                </div>
            </div>
        );
    }

    renderInnerContent () {
        var defaultInnerContent = Node.prototype.renderInnerContent.call(this);

        return defaultInnerContent;
    }

    onDragStart () {
        this.service.dragStart(this.id);
    }

    onDragEnd () {
        this.service.dragStop(this.id);
    }

    onDragEnter (e) {
        // this.service.dragHoverTarget(this.id);
        var enable = this.service.checkDropEnable(this.id)
        console.log("ENABLE");
        console.log(enable);

        if (enable) {
            setTimeout(() => {
                this.state.isDragHover = true;

                this.setState({ isDragHover: this.state.isDragHover });

                console.log('-----ENTER----- : ' + this.state.data.name);
            }, 0);
        }
    }

    onDragLeave () {
        this.state.isDragHover = false;
        this.state.hoverPos = null;
        this.service.recoverDragTargetId();
        this.clearHoverMiddleDelay();
        console.log('-----LEAVE----- : ' + this.state.data.name);
        setTimeout(() => {
            this.setState({
                isDragHover: this.state.isDragHover,
                hoverPos: this.state.hoverPos
            });
        }, 100);
    }

    onDragOver (e) {
        e.preventDefault(); // Fix Drop Event Did Not Trigger Issue

        var enable = this.service.checkDropEnable(this.id);

        if (enable) {
            if (this.hoverClientY !== e.pageY) {
                this.hoverClientY = e.pageY;

                this.updateRelativeOverPosition();
            }
            if (this.state.hoverPos == 'middle') {
                this.service.dragHoverTarget(this.id);
                console.log('---MIDDLE---');

                !this.hoverMiddleDelayFlag && (this.hoverMiddleDelayFlag = setTimeout(() => {
                    this.service.toggleChildren(this.service.getData(this.id));
                }, 1000));
            } else if (this.state.hoverPos == 'top') {
                this.clearHoverMiddleDelay();
                this.service.dragBeforeTarget(this.id);
            } else if (this.state.hoverPos == 'bottom') {
                this.clearHoverMiddleDelay();
                this.service.dragAfterTarget(this.id);
            }
        }
    }

    clearHoverMiddleDelay () {
        clearTimeout(this.hoverMiddleDelayFlag);
        this.hoverMiddleDelayFlag = null;
    }

    onDrop (e) {
        var enable = this.service.checkDropEnable(this.id);

        enable && this.service.submitDrop();

        // debugger;

        this.state.isDragHover = false;
        this.state.hoverPos = null;
        this.service.recoverDragTargetId();
        this.clearHoverMiddleDelay();
        this.setState({
            isDragHover: this.state.isDragHover,
            hoverPos: this.state.hoverPos
        });

    }

    componentDidMount () {
        // 未解决的问题： Tree组件渲染时处于不可见状态， 那 absolute 坐标 无法获取
        this.initDomInfo();
        console.log(this.state.data.name + '  --- Mounted');
    }

    initDomInfo () {
        // var dropContainerEle = this.containerEle || this.refs[this.refId];
        var dropContainerEle = document.getElementById(this.refId);

        this.domInfo = this.domInfo || {};
        // debugger;
        this.domInfo.top = getAbsolutePos(dropContainerEle).top;

        this.domInfo.height = dropContainerEle.offsetHeight;
        // console.log(this.domInfo);
    }

    updateRelativeOverPosition () {
        var height = this.domInfo.height;
        var enterY = this.domInfo.top;
        var hoverPosY = this.hoverClientY;

        var position = null;

        // console.log(hoverPosY)

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

        if ((this.state.hoverPos !== position) && position) {
            this.state.hoverPos = position;
            this.setState({ hoverPos: this.state.hoverPos });
        }
    }
}

export default Node;
