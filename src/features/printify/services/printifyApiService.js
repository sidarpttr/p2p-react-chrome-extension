import { ePortalHatasi } from "../../portal/models/hatalar";
import eArsivPortal from "../../portal/repositories/portal";
import Order from "../models/order";
import Printify from "../repositories/printify";

class PrintifyApiService {
    /**
     *
     * @param {Printify} printify
     * @param {eArsivPortal} portal
     */
    constructor(printify, portal) {
        this.printify = printify;
        this.portal = portal;
    }

    /**
     *
     * @param {Order} order
     */
    async generateInvoiceFromOrder(order) {
        try {
            const fatura = await this.portal.fatura_olustur(order);
            if (!fatura) {
                throw Error("fatura oluşturulamadı");
            }
            this.printify.faturaEkle(fatura);
            this.portal.faturaEkle(fatura);
            return true;
        } catch (error) {
            throw new ePortalHatasi(`Portal Hatası: ${error.message}`);
        }
    }
}

export default PrintifyApiService;
