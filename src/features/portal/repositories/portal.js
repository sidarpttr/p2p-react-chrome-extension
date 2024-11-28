import Order from "../../printify/models/order";
import Fatura from "../models/Fatura";
import { ePortalHatasi } from "../models/hatalar";

const { v4: uuidv4 } = require("uuid");
const { Komut, Komutlar } = require("../models/komutlar");
const { fatura_ver } = require("../services/fatura_ver");
const { modernSession } = require("./../../session");
const qs = require("qs");

class eArsivPortal {
    /**
     *
     * @param {String} kullanici_kodu
     * @param {String} sifre
     * @param {boolean} test_modu
     * @param {String} token
     * @param {Array} faturalar
     */
    constructor(
        kullanici_kodu = "33333315",
        sifre = "1",
        test_modu = true,
        token,
        faturalar
    ) {
        this.kullanici_kodu = kullanici_kodu;
        this.sifre = sifre;
        this.test_modu = test_modu;
        this.token = token;
        this.faturalar = faturalar || [];

        const apiler = {
            YAYIN: "https://earsivportal.efatura.gov.tr",
            TEST: "https://earsivportaltest.efatura.gov.tr",
        };

        this.url = apiler[test_modu ? "TEST" : "YAYIN"];
        this.oturum = modernSession();

        this.komutlar = new Komutlar();
    }

    setKullaniciKodu(kullanici_kodu) {
        this.kullanici_kodu = kullanici_kodu;
    }

    setSifre(sifre) {
        this.sifre = sifre;
    }

    /**
     *
     * @param {Fatura} fatura
     */
    faturaEkle(fatura) {
        // TODO
        this.faturalar.push(fatura);
        localStorage.setItem("portal_faturalar", this.faturalar);
    }

    /**
     *
     * @param {String} baslangic_tarihi
     * @param {String} bitis_tarihi
     * @returns {Fatura[]}
     */
    async faturalari_getir(baslangic_tarihi, bitis_tarihi) {
        //const response = await this.__kod_calistir(
        //    this.komutlar.TASLAKLARI_GETIR,
        //    {
        //        baslangic: baslangic_tarihi,
        //        bitis: bitis_tarihi,
        //        hangiTip: "5000/30000",
        //        table: [],
        //    }
        //);

        const response = await this.oturum.get(
            "http://192.168.81.252:3000/portal/faturalar"
        );

        const data = response.data.map(
            (fatura) =>
                new Fatura(
                    fatura.belgeNumarasi,
                    fatura.aliciVknTckn,
                    fatura.aliciUnvanAdSoyad,
                    fatura.belgeTarihi,
                    fatura.belgeTuru,
                    fatura.onayDurumu,
                    fatura.ettn
                )
        );

        return data;
    }

    __istek_ayristir(response, data) {
        if (response.status !== 200 || data.error) {
            const errorMessage = data.messages[0].text || data.messages[0];

            if (errorMessage.includes("Oturum zamanaşımına uğradı")) {
                throw new Error("Oturum zamanaşımına uğradı");
            }

            throw new Error(errorMessage);
        }
        return data;
    }

    async giris_yap() {
        try {
            const response = await this.oturum.post(
                `${this.url}/earsiv-services/assos-login`,
                qs.stringify({
                    assoscmd: this.test_modu ? "login" : "anologin",
                    rtype: "json",
                    userid: this.kullanici_kodu,
                    sifre: this.sifre,
                    sifre2: this.sifre,
                    parola: "1",
                })
            );

            const data = response.data;
            this.token = this.__istek_ayristir(response, data).token;
            return this.token !== null;
        } catch (error) {
            throw error;
        }
    }

    async cikis_yap() {
        if (!this.token) {
            throw new Error("Çıkış için önce giriş yapmalısın");
        }
        try {
            const response = await this.oturum.post(
                `${this.url}/earsiv-services/assos-login`,
                qs.stringify({
                    assoscmd: "logout",
                    rtype: "json",
                    token: self.token,
                })
            );

            if (response.status !== 200) {
                return false;
            }

            this.token = null;
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     *
     * @param {Komut} komut
     * @param {Object} jp
     */
    async __kod_calistir(komut, jp) {
        if (!self.token) {
            throw new Error("Yetkilendirme hatası");
        }

        try {
            const response = await self.oturum.post(
                `${this.url}/earsiv-services/dispatch`,
                qs.stringify({
                    cmd: komut.cmd,
                    callid: uuidv4(),
                    pageName: komut.sayfa,
                    token: this.token,
                    jp: jp,
                })
            );

            const data = response.data;
            return this.__istek_ayristir(response, data);
        } catch (error) {
            if (error.message.includes("Oturum zamanaşımına uğradı")) {
                await this.giris_yap();
                return this.__kod_calistir(komut, jp);
            }
            throw error;
        }
    }

    async gib_ibza() {
        const telefon_istek = await this.__kod_calistir(
            this.komutlar.TELEFONNO_SORGULA,
            {}
        );
        const telefon_veri = telefon_istek.data;
        const telefon_no = telefon_veri.telefon;

        if (!telefon_no) {
            throw ePortalHatasi("telefon numarası bulunamadı!");
        }

        const sms_gonder = await this.__kod_calistir(
            this.komutlar.SMSSIFRE_GONDER,
            {
                CEPTEL: telefon_no,
                KCEPTEL: false,
                TIP: "",
            }
        );

        return sms_gonder.data;
    }

    /**
     *
     * @param {Array} faturalar
     * @param {String} oid
     * @param {String} sifre
     */
    async gib_sms_onay(faturalar, oid, sifre) {
        const response = await this.__kod_calistir(
            this.komutlar.SMSSIFRE_DOGRULA,
            {
                SIFRE: sifre,
                OID: oid,
                OPR: 1,
                DATA: self.__fatura_ver(faturalar),
            }
        );
        const data = response.data;
        return this.__nesne_ver("GibSMSOnay", { mesaj: data.msg });
    }

    async bilgilerim() {
        const response = await this.__kod_calistir(
            this.komutlar.KULLANICI_BILGILERI_GETIR,
            {}
        );
        const data = response.data;
        return this.__nesne_ver("Bilgilerim", data);
    }

    /**
     *
     * @param {String} vkn_veya_tckn
     */
    async kisi_getir(vkn_veya_tckn) {
        try {
            const response = await this.__kod_calistir(
                self.komutlar.MERNISTEN_BILGILERI_GETIR,
                { vknTcknn: vkn_veya_tckn }
            );

            const data = response.data;
            return this.__nesne_ver("Kisi", data);
        } catch (error) {
            const veri = {
                unvan: null,
                adi: null,
                soyadi: null,
                vergiDairesi: null,
            };
            return this.__nesne_ver("Kisi", veri);
        }
    }

    __nesne_ver(isim, veri) {
        return { ...veri, modelName: isim };
    }

    /**
     *
     * @param {Order} order
     */
    async fatura_olustur(order) {
        const kisi_bilgi = await this.kisi_getir(order.vknTcknn);
        const fatura = fatura_ver(
            order.tarih || new Date().toLocaleDateString("tr-TR"),
            order.saat,
            order.vkn_veya_tckn,
            kisi_bilgi.adi || order.ad,
            kisi_bilgi.soyadi || order.soyad,
            kisi_bilgi.unvan || order.unvan,
            kisi_bilgi.vergiDairesi || order.vergiDairesi,
            order.urun_adi,
            order.fiyat,
            order.fatura_notu,
            order.para_birimi,
            order.dovzTLkur
        );

        while (true) {
            //const response = await this.__kod_calistir(
            //    this.komutlar.FATURA_OLUSTUR,
            //    fatura
            //);

            var ettn = null;
            if (
                true
                //response.data.includes("Faturanız başarıyla oluşturulmuştur.")
            ) {
                ettn = fatura.faturaUuid;
                break;
            }
        }

        return new Fatura(ettn, order);
    }
}

export default eArsivPortal;
