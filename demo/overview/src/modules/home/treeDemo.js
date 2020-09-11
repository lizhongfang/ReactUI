import React, { Component } from 'react';

import { Tree, TreeNode, DraggableTree, DraggableNode, TreeDraggableService, TreeComponentMaker } from 'cc-ui';

const MockTreeData = [{
    id: 'ID_1',
    name: '一级分类A',
    parentId: null,
    expanded: true
},{
    id: 'ID_2',
    name: '一级分类B',
    parentId: null,
    iconType: 'iconnight'
},{
    id: 'ID_3',
    name: '一级分类C',
    parentId: null,
    iconType: 'iconnight'
},{
    id: 'ID_4',
    name: '二级分类A-1',
    parentId: 'ID_1'
},{
    id: 'ID_5',
    name: '二级分类A-2',
    parentId: 'ID_1',
    iconType: 'iconnight'
},{
    id: 'ID_6',
    name: '二级分类B-1',
    parentId: 'ID_2'
},{
    id: 'ID_7',
    name: '一级分类D',
    parentId: null,
    iconType: 'iconnight'
},{
    id: 'ID_8',
    name: '一级分类E',
    parentId: null
},{
    id: 'ID_9',
    name: '一级分类F',
    parentId: null,
    iconType: 'iconnight'
},{
    id: 'ID_10',
    name: '一级分类G',
    parentId: null
},{
    id: 'ID_11',
    name: '一级分类H',
    parentId: null
},{
    id: 'ID_12',
    name: '一级分类I',
    parentId: null
},{
    id: 'ID_13',
    name: '一级分类J',
    parentId: null
},{
    id: 'ID_14',
    name: '一级分类K',
    parentId: null
},{
    id: 'ID_15',
    name: '二级分类G-1',
    parentId: 'ID_10'
},{
    id: 'ID_16',
    name: '二级分类G-2',
    parentId: 'ID_10'
},{
    id: 'ID_17',
    name: '二级分类G-3',
    parentId: 'ID_10',
    iconType: 'iconnight'
},{
    id: 'ID_18',
    name: '二级分类G-4',
    parentId: 'ID_10'
},{
    id: 'ID_19',
    name: '一级分类L',
    parentId: null
},{
    id: 'ID_20',
    name: '一级分类M',
    parentId: null,
    iconType: 'iconnight'
},{
    id: 'ID_21',
    name: '三级分类A-1-1',
    parentId: 'ID_4'
},{
    id: 'ID_22',
    name: '三级分类G-2-1',
    parentId: 'ID_16'
},{
    id: 'ID_23',
    name: '三级分类A-1-2',
    parentId: 'ID_4',
    iconType: 'iconnight'
}];

class FileIconTreeNode extends TreeNode {
    renderItemIcon () {
        return (<span className="iconfont tree-icon-a-folder iconfolder1"></span>);
    }
}

const FileIconTree = TreeComponentMaker(null, FileIconTreeNode);

class ActiveIconTreeNode extends TreeNode {
    renderItemIcon () {
        var iconType = this.state.data.iconType || 'iconfolder1';
        return (<span className={"iconfont tree-icon-a-folder " + iconType}></span>);
    }
}
const ActiveIconTree = TreeComponentMaker(null, ActiveIconTreeNode);

// const DraggableTree = TreeComponentMaker(TreeDraggableService, DraggableNode);

export default class TreeDemo extends Component {
    constructor (props) {
        super(props);

        this.state = {};

        this.state.dataList = [].concat(MockTreeData);
    }

    render () {
        return (
            <div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', width: '320px', border: '1px solid #e0e0e0' }}>
                    <DraggableTree list={this.state.dataList}></DraggableTree>
                </div>

                <div style={{ display: 'inline-block', verticalAlign: 'top', width: '320px', border: '1px solid #e0e0e0' }}>
                    <FileIconTree list={this.state.dataList}></FileIconTree>
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', width: '320px', border: '1px solid #e0e0e0' }}>
                    <ActiveIconTree list={this.state.dataList}></ActiveIconTree>
                </div>

            </div>
        );
    }
}
