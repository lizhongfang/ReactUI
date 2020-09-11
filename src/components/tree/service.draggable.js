import CoreService from './service';

export default class DraggableService extends CoreService {
    /*@ngInject*/
    constructor () {
        super();

        this.isDragging = false;
        this.targetId = null;
    }

    checkDropEnable (id) {
        var enable = true;
        var targetData = this.getData(id);
        // debugger;
        while (targetData) {
            enable = enable && (targetData.id !== this.dragId);
            targetData = targetData.parentId ? this.getData(targetData.parentId) : null;
        }

        return enable;
    }

    dragStart (id) {
        this.dragId = id;
        this.isDragging = true;
        this.triggerEvent('dragStart', this);
    }

    dragStop () {
        this.isDragging = false;
        this.triggerEvent('dragEnd', this);
    }

    hoverTarget (id) {
        this.hoverTargetId = id;
    }

    recoverDragTargetId () {
        this.dragBeforeId = null;
        this.dragAfterId = null;
        this.dragHoverId = null;
        this.dragOverId = null;
    }

    dragBeforeTarget (id) {
        this.recoverDragTargetId();
        this.dragOverId = id;
        this.dragBeforeId = id;
        // this.triggerEvent('dragStart', this);
    }
    dragAfterTarget (id) {
        this.recoverDragTargetId();
        this.dragOverId = id;
        this.dragAfterId = id;
        // this.triggerEvent('dragStart', this);
    }
    dragHoverTarget (id) {
        this.recoverDragTargetId();
        this.dragOverId = id;
        this.dragHoverId = id;
        // this.triggerEvent('dragStart', this);
    }

    submitDrop () {
        // console.log(this);

        if (this.dragBeforeId) {
            this.moveNode('before');
        } else if (this.dragAfterId) {
            this.moveNode('after');
        } else if (this.dragHoverId) {
            this.moveNodeInto();
        }
    }

    moveNodeInto () {
        var intoId = this.dragHoverId;
        var intoNode = this.dataMap[intoId];

        var children = intoNode.children || [];
        if (children.length > 0) {
            this.dragAfterId = children[children.length - 1].id;
            this.moveNode('after');
        } else {
            var id = this.dragId;
            var node = this.dataMap[id];

            var preParent = node.parentId && this.dataMap[node.parentId];
            var targetParent = intoNode;
            if (preParent != targetParent && (preParent || targetParent)) {
                if (preParent) {
                    preParent.children.splice(preParent.children.indexOf(node), 1);
                }
                if (targetParent) {
                    node.parentId = targetParent.id;
                    targetParent.children = targetParent.children || [];
                    targetParent.children.push(node);
                }
            }
            var maxSeq = this.list[this.list.length - 1].seq || 0;
            node.seq = maxSeq + 1;
            this.list = this.list.sort(function (l, r) { return l.seq - r.seq; });

            node.level = this.getNodeDeepLevel(node);

            this.triggerEvent('nodeUpdated', node);
            this.triggerEvent('nodeUpdated', preParent);
            this.triggerEvent('nodeUpdated', targetParent);
        }
    }

    moveNode (position) {
        var id = this.dragId;
        var targetId = null;
        if (position == 'before') {
            targetId = this.dragBeforeId;
        } else if (position == 'after') {
            targetId = this.dragAfterId;
        }

        console.log(position);

        var node = this.dataMap[id];
        var targetNode = this.dataMap[targetId];
        var preParent = node.parentId && this.dataMap[node.parentId];
        var targetParent = targetNode.parentId && this.dataMap[targetNode.parentId];

        if (preParent != targetParent && (preParent || targetParent)) {
            if (preParent) {
                preParent.children.splice(preParent.children.indexOf(node), 1);
            }
            if (targetParent) {
                node.parentId = targetParent.id;
                targetParent.children = targetParent.children || [];
                targetParent.children.push(node);
            } else {
                node.parentId = null;
            }
        }

        this.list.map(item => {
            item.seq > targetNode.seq && (item.seq = item.seq + 1);
        });

        if (position == 'before') {
            node.seq = targetNode.seq;
            targetNode.seq = targetNode.seq + 1;
        } else if (position == 'after') {
            node.seq = targetNode.seq + 1;
        }

        this.list = this.list.sort(function (l, r) { return l.seq - r.seq; });
        targetParent && (targetParent.children = targetParent.children.sort(function (l, r) { return l.seq - r.seq; }));

        node.level = this.getNodeDeepLevel(node);

        this.triggerEvent('nodeUpdated', node);
        this.triggerEvent('nodeUpdated', preParent);
        this.triggerEvent('nodeUpdated', targetParent);
    }
}
