import Printify from "../repositories/printify";

class PrintifyApiService {
    constructor() {
        this.printify = new Printify();
    }

    /**
     *
     * @param {Function} cb
     */
    async init() {
        await this.printify.init();
    }


}

export default PrintifyApiService;
