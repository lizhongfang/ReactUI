import { ObserverService } from 'cc-ui';

class NavService extends ObserverService {
    constructor () {
        super();
    }

    changeNav (target) {
        this.triggerEvent('navChanged', target);
    }
}

export default new NavService();
