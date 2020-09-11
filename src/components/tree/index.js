// EXPORT PROPS
// selectedId: 初始化时选中节点ID
// onSelect: 节点选择回调

import React, { Component } from 'react';

import ObserverComponent from './../../core/observerComponent';

import CoreNodeComponent, { DraggableNode as DraggableNodeComponent } from './node';
import CoreService from './service';
import DraggableService from './service.draggable';

// import './style.scss';

export function TreeComponentMaker (Service, NodeComponent = CoreNodeComponent) {
    Service = Service || CoreService;
    return class Tree extends ObserverComponent {
        constructor (props) {
            super(props);

            this.props = props;
            this.state = {
                loadingFinished: false,
                predicate: ''
            };

            this.initPromise = this.init();
        }

        init () {
            this.service = new Service();
            window['TREE_SERVICE'] = this.service;

            // console.log(this.props.selectedId)

            return Promise.all([
                this.service.init({
                    selectedId: this.props.selectedId,
                    list: this.props.list
                })
            ]);
        }

        componentDidMount () {
            this.initPromise
                .then(() => this.initData())
                .then(() => this.bindEvents())
                .then(() => (this.state.loadingFinished = true))
                .then(() => this.setState(this.state));
        }

        initData () {
            this.state.list = this.service.getList();
            this.state.dataMap = this.service.getDataMap();
            this.state.rootLevelList = this.service.getRootLevelList();
        }

        bindEvents () {
            this.bindEvent('selectedChanged', node => {
                this.triggerSelectChanged(node);
            });

            this.bindEvent('nodeUpdated', node => {
                if (!node) {
                    // this.state.loadingFinished = false;
                    this.state.isDragging = false;
                    this.initData();
                    this.setState(this.state);
                    //
                    // setTimeout(() => {
                    //     this.state.loadingFinished = true;
                    //     this.setState(this.state);
                    // }, 0);
                }
            })

            this.bindEvent('dragStart', () => {
                console.log('DRAG-START');
                this.state.isDragging = true;
                setTimeout(() => this.setState({ isDragging: this.state.isDragging }), 10);
            });
            this.bindEvent('dragEnd', () => {
                console.log('DRAG-END');
                this.state.isDragging = false;
                setTimeout(() => this.setState({ isDragging: this.state.isDragging }), 10);
            });
        }

        predicateChanged (e) {
            var value = e.target.value;
            this.state.predicate = value;
            this.setState(this.state, () => {
                clearTimeout(this.searchDelayFlag);

                this.searchDelayFlag = setTimeout(() => {
                    this.service.updateVisible(this.state.predicate);
                }, 400);
            });
        }

        render () {
            var service = this.service;

            return this.state.loadingFinished ? (
                <div className="tree-wrapper super-tree-wrapper">
                <div className="search-ipt-container-wrap">
                    <div className="cc-form-input-wrap">
                        <span className="iconfont iconsearch"></span>
                        <input type="text" placeholder="SEARCH" value={this.state.predicate} onChange={this.predicateChanged.bind(this)}></input>
                    </div>
                </div>
                    <div className={"tree-list-container" + (this.state.isDragging ? " is-dragging" : "")}>
                    {(this.state.rootLevelList || []).map(function (data) {
                        return (<NodeComponent id={data.id} service={service} key={data.id} />);
                    })}
                    </div>
                </div>
            ) : (<div>TREE LOADING...</div>)
        }

        triggerSelectChanged (node) {
            this.props.onSelect && typeof this.props.onSelect === 'function' && this.props.onSelect(node);
        }
    }

}

const Tree = TreeComponentMaker();

export const DraggableTree = TreeComponentMaker(DraggableService, DraggableNodeComponent);
export default Tree;
