const { v4: uuidv4 } = require("uuid");

/**
 *
 * @param {String} tarih
 * @param {String} saat
 * @param {String} vkn_veya_tckn
 * @param {String} ad
 * @param {String} soyad
 * @param {String} unvan
 * @param {String} vergi_dairesi
 * @param {String} urun_adi
 * @param {Number|Float} fiyat
 * @param {String} fatura_notu
 * @returns {Object}
 */
export function fatura_ver(
    tarih = "16/11/2024",
    saat = "10:53:13",
    vkn_veya_tckn = "11111111111",
    ad = "sidar",
    soyad = "adiguzel",
    unvan = "",
    vergi_dairesi = "",
    urun_adi = "Muhtelif Oyuncak",
    fiyat = 100,
    fatura_notu = ""
) {
    const matrah = fiyat / 1.2; // %20
    const kdv = fiyat - matrah;

    return {
        faturaUuid: uuidv4(),
        belgeNumarasi: "",
        faturaTarihi: tarih,
        saat: saat,
        paraBirimi: "TRY",
        dovzTLkur: "0",
        faturaTipi: "SATIS",
        hangiTip: "5000/30000",
        vknTckn: vkn_veya_tckn,
        aliciUnvan: unvan,
        aliciAdi: ad,
        aliciSoyadi: soyad,
        binaAdi: "",
        binaNo: "",
        kapiNo: "",
        kasabaKoy: "",
        vergiDairesi: vergi_dairesi,
        ulke: "Türkiye",
        bulvarcaddesokak: "",
        irsaliyeNumarasi: "",
        irsaliyeTarihi: "",
        mahalleSemtIlce: "",
        sehir: " ",
        postaKodu: "",
        tel: "",
        fax: "",
        eposta: "",
        websitesi: "",
        iadeTable: [],
        vergiCesidi: " ",
        malHizmetTable: [
            {
                malHizmet: urun_adi,
                miktar: 1,
                birim: "C62",
                birimFiyat: matrah.toFixed(2),
                fiyat: matrah.toFixed(2),
                iskontoOrani: 0,
                iskontoTutari: "0",
                iskontoNedeni: "",
                malHizmetTutari: matrah.toFixed(2),
                kdvOrani: "20",
                vergiOrani: 0,
                kdvTutari: kdv.toFixed(2),
                vergininKdvTutari: "0",
                ozelMatrahTutari: "0",
                hesaplananotvtevkifatakatkisi: "0",
            },
        ],
        tip: "İskonto",
        matrah: matrah.toFixed(2),
        malhizmetToplamTutari: matrah.toFixed(2),
        toplamIskonto: "0",
        hesaplanankdv: kdv.toFixed(2),
        vergilerToplami: kdv.toFixed(2),
        vergilerDahilToplamTutar: (matrah + kdv).toFixed(2),
        odenecekTutar: (matrah + kdv).toFixed(2),
        not: fatura_notu,
        siparisNumarasi: "",
        siparisTarihi: "",
        fisNo: "",
        fisTarihi: "",
        fisSaati: " ",
        fisTipi: " ",
        zRaporNo: "",
        okcSeriNo: "",
    };
}
