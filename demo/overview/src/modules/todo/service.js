import { Utils, ObserverService } from 'cc-ui';

const storageDB = Utils.storageDB;
const TodoDataKey = 'HF-Todo-Data';

class TodoService extends ObserverService {
    constructor () {
        super();
        this.list = this.initData();
    }

    initData () {
        var list = storageDB.getItem(TodoDataKey) || [];

        return (list || []).map(item => ({ id: item.id, name: item.name, createdAt: item.createdAt, done: item.done }));
    }

    saveData () {
        // this.list =
        var saveList = (this.list || []).map(item => ({ id: item.id, name: item.name, createdAt: item.createdAt, done: item.done }));

        return storageDB.setItem(TodoDataKey, saveList);
    }

    getList () {
        return [].concat(this.list);
    }

    query (id) {
        var targetItem = this.list.find(item => item.id == id);
        return targetItem;
    }

    add (item) {
        this.list.push({
            id: item.id || this.getRandomId(),
            name: item.name,
            done: false,
            createdAt: Date.now()
        });

        this.triggerEvent('listChanged');

        this.saveData();
    }

    delete (id) {
        var targetItem = this.list.find(item => item.id == id);
        var targetIdx = this.list.indexOf(targetItem);
        targetIdx > -1 && this.list.splice(targetIdx, 1);

        this.triggerEvent('listChanged');

        this.saveData();

        return this.list;
    }

    update (id, item) {
        var targetItem = this.list.find(item => item.id == id);
        var targetIdx = this.list.indexOf(targetItem);

        delete item.id;
        targetIdx > -1 && (this.list[targetIdx] = Object.assign({}, this.list[targetIdx], item));

        this.triggerEvent('itemChanged');

        this.saveData();

        return this.list[targetIdx];
    }

    getRandomId () {
        return 'HF_' + Date.now() + '_' + Math.random().toFixed(2) * 100;
    }

    updateVisible (predicate) {
        this.list.map(item => (item.visible = item.name.indexOf(predicate) > -1));
        this.triggerEvent('listVisibleChanged');
    }
}

export default new TodoService();
