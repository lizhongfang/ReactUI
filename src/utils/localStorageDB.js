const DBKey = 'DataStorage';

class Storage {
    constructor () {
        this.StorageData = this.initStorage();
    }

    initStorage () {
        var strContent = localStorage.getItem(DBKey);

        return strContent && JSON.parse(strContent);
    }

    saveStorage () {
        return this.StorageData && localStorage.setItem(DBKey, JSON.stringify(this.StorageData));
    }

    setItem (key, value) {
        this.StorageData = this.StorageData || {};
        this.StorageData[key] = value;

        this.saveStorage();
    }

    getItem (key) {
        var valueStr = this.StorageData && this.StorageData[key];

        return valueStr;
    }
}

export default new Storage();
