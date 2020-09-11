import ObserverService from './../../core/observerService';

export default class TreeModelService extends ObserverService {
    /*@ngInject*/
    constructor () {
        super ();
        this.$q = Promise;
    }

    init (options = {}) {
        return this.$q.all([
            this.initData(options)
        ]).then(() => this.nestList())
        .then(() => this.initOption(options))
        .then(() => this.updateStatus());
    }

    // FOR OVERRITE
    initData (options) {
        if (options && options.list && options.list.length > 0) {
            let list = options.list.map(item => Object.assign({}, item));

            return Promise.resolve(list).then((response) => (this.list = response));
        }
    }

    refresh () {
        this.init().then(() => this.triggerEvent('nodeUpdated'));
    }

    initOption (options = {}) {
        // THIS IS A DANGEROUS SETTING

        var { selectedId } = options;
        selectedId && this.dataMap[selectedId] && (this.dataMap[selectedId].selected = true);
    }

    updateStatus () {

    }

    getList () { return this.list; }
    getDataMap () { return this.dataMap; }
    getData (id) { return this.dataMap && this.dataMap[id]; }
    getRootLevelList () { return this.list.filter(node => !node.parentId); }


    nestList () {
        this.list = this.list || [ ];
        this.dataMap = this.dataMap || { };

        this.list.map((item, index) => (item.seq = ((item.seq === undefined || item.seq === null) ? index : item.seq)));
        this.list = this.list.sort(function (l, r) { return l.seq - r.seq; });
        this.list.map(item => (item.children = []));
        this.list.map(item => (this.dataMap[item.id] = item));
        this.list.map(item => {
            this.dataMap[item.parentId] && this.dataMap[item.parentId].children.push(item);
        });

        this.list.map(item => this.formatNode(item));
    }


    formatNode (node) {
        node && Object.assign(node, {
            visible: true,
            selected: node.selected || false,
            checked: node.selected || node.checked || false,
            children: (node.children || []).sort(function (l, r) {
                return l.seq - r.seq;
            }),
            level: this.getNodeDeepLevel(node),
            isFirst: this.getNodeIdx(node) == 0
        });
    }

    selectNode (node) {
        // node = typeof node == 'string' ? this.dataMap[node] : node;
        this.list.map(item => (item.selected = false));
        var id = typeof node != 'object' ? node : node.id;
        var targetNode = this.dataMap && this.dataMap[id];
        targetNode && (targetNode.selected = true);

        targetNode && this.triggerEvent('selectedChanged', targetNode);
    }

    toggleChildren (node, forceToggle) {
        var id = typeof node != 'object' ? node : node.id;
        var targetNode = this.dataMap && this.dataMap[id];
        targetNode && (targetNode.expanded = (forceToggle !== undefined && forceToggle !== null) ? forceToggle : !targetNode.expanded);

        targetNode && this.triggerEvent('toggleChanged', targetNode);
    }

    updateVisible (predicate) {
        this.list.map(item => (item.visible = this.getNodeVisible(item, predicate)));
        this.triggerEvent('visibleChanged');
    }

    addNode (newNode, beforeId) {
        if (!newNode) { return ; }

        this.list = this.list || [];

        this.list.push(Object.assign(newNode, { id: newNode.id || this.randomID() }));
        this.dataMap[newNode.id] = newNode;

        let brothers = newNode.parentId && this.dataMap[newNode.parentId] && this.dataMap[newNode.parentId].children;

        let beforeBro = brothers.find(bro => bro.id == beforeId);
        var maxSeq;
        if (beforeId && beforeBro) {
            var beforeIdx = brothers.indexOf(beforeBro);

            maxSeq = beforeBro.seq;
            for (var i = beforeIdx; i < brothers.length; i++) {
                brothers[i].seq = (brothers[i].seq + 1);
            }
            newNode.seq = maxSeq;
            newNode.parentId && this.dataMap[newNode.parentId] && this.dataMap[newNode.parentId].children.push(newNode);
            newNode.parentId && this.dataMap[newNode.parentId] && (this.dataMap[newNode.parentId].children = this.dataMap[newNode.parentId].children.sort(function (l, r) { return l.seq - r.seq; }));
        } else {
            maxSeq = brothers && brothers.length > 0 && brothers[brothers.length - 1].seq || 0;

            (newNode.seq === undefined || newNode.seq === null) && (newNode.seq = maxSeq + 1);
            newNode.parentId && this.dataMap[newNode.parentId] && this.dataMap[newNode.parentId].children.push(newNode);
        }

        this.formatNode(newNode);
        this.formatNode(this.dataMap[newNode.parentId]);
        // console.log(this.dataMap[newNode.parentId])

        this.triggerEvent('nodeAdded', newNode);

        return newNode;
    }

    insertNode (newNode, parentId) {
        if (!newNode) { return ; }

        this.list.push(Object.assign(newNode, { id: newNode.id || this.randomID() }));
        this.dataMap[newNode.id] = newNode;

        var parent = this.dataMap[parentId];
        if (parent) {
            var children = parent && parent.children;
            parent.children = [ newNode ];
            newNode.parentId = parent.id;
            newNode.children = children || [];
            for (var i = 0; i < newNode.children.length; i++) {
                newNode.children[i].parentId = newNode.id;
            }
        }

        this.formatNode(newNode);
        this.formatNode(this.dataMap[newNode.parentId]);
        for (i = 0; i < newNode.children.length; i++) {
            this.formatNode(newNode.children[i]);
        }

        this.triggerEvent('nodeInserted', newNode);

        return newNode;
    }

    editNode (id, data) {
        var targetNode = this.dataMap[id];
        if (!targetNode) { return ; }

        var originParentId = targetNode.parentId;

        // if (targetNode.parentId !== data.parentId) {
        //     targetNode.parentId && this.dataMap[targetNode.parentId] && this.dataMap[targetNode.parentId].children.splice(this.dataMap[targetNode.parentId].children.indexOf(targetNode), 1);
        // }

        // debugger;

        Object.assign(targetNode, data);

        if (originParentId && (originParentId !== targetNode.parentId)) {
            this.dataMap[originParentId] && this.dataMap[originParentId].children.splice(this.dataMap[originParentId].children.indexOf(targetNode), 1);

            let brothers = targetNode.parentId && this.dataMap[targetNode.parentId] && this.dataMap[targetNode.parentId].children;
            var maxSeq = brothers && brothers.length > 0 && brothers[brothers.length - 1].seq || 0;

            (targetNode.seq === undefined || targetNode.seq === null) && (targetNode.seq = maxSeq + 1);
            targetNode.parentId && this.dataMap[targetNode.parentId] && this.dataMap[targetNode.parentId].children.push(targetNode);


        }

        // console.log("***TargetNode***");
        // console.log(targetNode.children.length);

        this.formatNode(targetNode);
        this.formatNode(this.getData(targetNode.parentId));
        this.formatNode(this.getData(originParentId));

        this.triggerEvent('nodeUpdated', targetNode);

        return targetNode;
    }

    deleteNode (id) {
        id = (id && typeof id == 'object') ? id.id : id;
        var needDeleteNode = this.dataMap[id];
        if (!needDeleteNode) { return ; }

        function deleteFunc (targetNode) {
            var neededRemoveChildren = [].concat(targetNode.children || []);
            for (var i = 0; i < neededRemoveChildren.length; i++) {
                deleteFunc.call(this, neededRemoveChildren[i]);
            }
            targetNode.parentId && this.dataMap[targetNode.parentId] && this.dataMap[targetNode.parentId].children.splice(this.dataMap[targetNode.parentId].children.indexOf(targetNode), 1);
            this.list.splice(this.list.indexOf(targetNode), 1);
            delete this.dataMap[id];
        }

        // targetNode.parentId && this.dataMap[targetNode.parentId] && this.dataMap[targetNode.parentId].children.splice(this.dataMap[targetNode.parentId].children.indexOf(targetNode), 1);
        // this.list.splice(this.list.indexOf(targetNode), 1);
        // delete this.dataMap[id];

        deleteFunc.call(this, needDeleteNode);

        this.triggerEvent('nodeDeleted', needDeleteNode);

        return needDeleteNode;
    }

    copyNodeObjs (sourceNode) {
        var copyedNode = Object.assign({}, sourceNode);
        copyedNode.id = copyedNode.id + '_COPY' + (new Date().getTime()); // + 时间戳
        return copyedNode;
    }

    // 复制节点
    copyNode (sourceNode, newParentId, deep) {

        function copyFunc (node, parentId) {
            var children = [].concat(node.children || []);
            var copyedNode = this.copyNodeObjs(node);

            copyedNode.children = [];
            copyedNode.parentId = parentId;

            for (var i = 0; i < children.length; i++) {
                copyedNode.children.push(copyFunc.call(this, children[i], copyedNode.id));
            }
            return copyedNode;
        }

        (sourceNode && typeof sourceNode !== 'object') && (sourceNode = this.dataMap[sourceNode]);

        var newNode = copyFunc.call(this, sourceNode, newParentId || sourceNode.parentId);
        this.dataMap[newNode.parentId] && this.dataMap[newNode.parentId].children && this.dataMap[newNode.parentId].children.push(newNode);
        this.list.push(newNode);
        this.dataMap[newNode.id] = newNode;

        this.formatNode(this.dataMap[newNode.parentId]);
        this.formatNode(this.dataMap[newNode.id]);

        var allNestedChildren = this.getAllNestedChildren(newNode);
        for (var i = 0; i < allNestedChildren.length; i++) {
            this.list.push(allNestedChildren[i]);
            this.dataMap[allNestedChildren[i].id] = allNestedChildren[i];
            this.formatNode(allNestedChildren[i]);
        }

        this.triggerEvent('nodeCopyed', newNode);


        // allNestedChildren;

        return { newNode, newNodes: [newNode].concat(allNestedChildren || []) };
    }

    getNodeVisible (node, predicate) {
        let visible = node.name.indexOf(predicate) > -1;
        if (visible || !node.children || node.children.length < 1) { return visible; }
        node.children.map(child => visible = (visible || this.getNodeVisible(child, predicate)));
        return visible;
    }

    checkNode (node) {
        this.updateAroundNodeChecked(node);
        this.triggerEvent('checkChanged');
    }

    updateAroundNodeChecked (node) {
        // let checked = node;

        let updateChildrenNodeChecked = function (node) {
            for (var i = 0; i < node.children.length; i++) {
                if (!node.children[i].checked == node.checked) {
                    node.children[i].checked = node.checked;
                    this.triggerEvent('nodeCheckedChanged', node.children[i]);
                }

                updateChildrenNodeChecked.call(this, node.children[i]);
            }
        };

        updateChildrenNodeChecked.call(this, node);

        let updateParentsNodeChecked = function (node, nodeMap) {
            var parentId = node.parentId;
            var parent = parentId && nodeMap[parentId];
            if (parent) {
                var brothers = parent && parent.children;
                let parentChecked = true;
                brothers.map(bro => (parentChecked = parentChecked && bro.checked));

                if (parent.checked !== parentChecked) {
                    parent.checked = parentChecked;
                    this.triggerEvent('nodeCheckedChanged', parent);
                }

                updateParentsNodeChecked.call(this, parent, nodeMap);
            }
        };

        updateParentsNodeChecked.call(this, node, this.getDataMap());
    }

    // bindEvent (event, callback) {
    //     this.eventsPool = this.eventsPool || {};
    //     this.eventsPool[event] = this.eventsPool[event] || [];
    //     this.eventsPool[event].push(callback);
    // }
    //
    // // unbindEvent (event, callback) {
    // unbindEvent (event, callback) {
    //     this.eventsPool = this.eventsPool || {};
    //     this.eventsPool[event] = this.eventsPool[event] || [];
    //     var targetIdx = this.eventsPool[event].indexOf(callback);
    //
    //     (targetIdx > -1) && this.eventsPool[event].splice(targetIdx, 1);
    // }
    //
    // triggerEvent (event, body) {
    //     for (var i = 0; this.eventsPool && this.eventsPool[event] && i < this.eventsPool[event].length; i++) {
    //         typeof this.eventsPool[event][i] == 'function' && this.eventsPool[event][i](body);
    //     }
    // }

    getNodeDeepLevel (item) { // id
        typeof item == 'string' && (item = this.list.find(gItem => gItem.id == item));
        var parentId = item && item.parentId;
        var count = 0;
        while(item && parentId) {
            count = count + 1;
            item = this.list.find(gItem => gItem.id == parentId);
            parentId = item.parentId;
        }
        return count;
    }

    getNodeIdx(node) {
        var parentId = node.parentId;
        if (parentId) {
            var parentChildren = this.dataMap[parentId].children || [];
            return parentChildren.indexOf(node);
        }
        return this.getRootLevelList().indexOf(node);
    }

    getAllNestedChildren (targetNode) {
        var children = [];
        function getChildren (node) {
            for (var i = 0; (node.children && (i < node.children.length)); i++) {
                children.push(node.children[i]);
                getChildren(node.children[i]);
            }
        }
        getChildren(targetNode);
        return children;
    }

    randomID () {
        return 'RANDOMID_' + Date.now() + Math.ceil(Math.random() * 100);
    }
}
