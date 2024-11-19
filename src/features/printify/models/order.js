const { default: tarih_ayir } = require("../../../utils/tarih_ayir");

export default class Order {
    /**
     *
     * @param {Object} order
     */
    constructor(order) {
        const [tarih, saat] = tarih_ayir(order.fulfilled_at);

        this.id = order.id;
        this.tarih = tarih;
        this.saat = saat;
        this.vkn_veya_tckn = "11111111111";
        this.ad = order.address_to.first_name;
        this.soyad = order.address_to.last_name;
        this.urun_adi = order.line_items[0].metadata.variant_label;
        this.fiyat = order.total_price;
        this.fatura_notu = "";
        this.para_birimi = order.para_birimi || "TRY";
        this.dovzTLkur = order.dovzTLkur || "0";
    }

    /**
     *
     * @param {Array} orders
     * @returns {Order[]}
     */
    static toOrdersList(orders) {
        return orders.map((order) => new Order(order));
    }
}
