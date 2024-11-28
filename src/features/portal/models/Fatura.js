export default class Fatura {
    constructor(
        belgeNumarasi,
        aliciVknTckn,
        aliciUnvanAdSoyad,
        belgeTarihi,
        belgeTuru,
        onayDurumu,
        ettn
    ) {
        this.belgeNumarasi = belgeNumarasi;
        this.aliciVknTckn = aliciVknTckn;
        this.aliciUnvanAdSoyad = aliciUnvanAdSoyad;
        this.belgeTarihi = belgeTarihi;
        this.belgeTuru = belgeTuru;
        this.onayDurumu = onayDurumu;
        this.ettn = ettn;
    }
}
