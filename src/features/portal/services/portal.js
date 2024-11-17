const { v4: uuidv4 } = require("uuid");
const { Komut, Komutlar } = require("../../models/portal/komutlar");
const { fatura_ver } = require("./fatura_ver");
const moment = require("moment-timezone");
const { legacySession } = require("./session");

class eArsivPortal {
    /**
     *
     * @param {String} kullanici_kodu
     * @param {String} sifre
     * @param {boolean} test_modu
     */
    constructor(kullanici_kodu = "33333315", sifre = "1", test_modu = true) {
        this.kullanici_kodu = kullanici_kodu;
        this.sifre = sifre;
        this.test_modu = test_modu;

        const apiler = {
            YAYIN: "https://earsivportal.efatura.gov.tr",
            TEST: "https://earsivportaltest.efatura.gov.tr",
        };

        this.url = apiler[test_modu ? "TEST" : "YAYIN"];
        this.oturum = legacySession();

        this.komutlar = Komutlar();
        this.token = null;
        this.giris_yap();
    }

    __istek_ayristir(response, data) {
        if (response.status !== 200 || data.error) {
            const errorMessage = data.messages[0].text || data.messages[0];

            if (errorMessage.includes("Oturum zamanaşımına uğradı")) {
                throw new Error("Oturum zamanaşımına uğradı");
            }

            throw new Error("eArsivPortalHatasi", errorMessage);
        }

        return data;
    }

    async giris_yap() {
        try {
            const response = await this.oturum.post(
                `${this.url}/earsiv-services/assos-login`,
                {
                    assoscmd: this.test_modu ? "login" : "anologin",
                    rtype: "json",
                    userid: this.kullanici_kodu,
                    sifre: this.sifre,
                    sifre2: this.sifre,
                    parola: "1",
                }
            );

            const data = response.data;
            this.token = this.__istek_ayristir(response, data).token;
            return this.token !== null;
        } catch (error) {
            throw new Error("Giriş yapılamadı", error);
        }
    }

    async cikis_yap() {
        if (!this.token) {
            throw new Error("Çıkış için önce giriş yapmalısın");
        }
        try {
            const response = await this.oturum.post(
                `${this.url}/earsiv-services/assos-login`,
                {
                    assoscmd: "logout",
                    rtype: "json",
                    token: self.token,
                }
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
                {
                    cmd: komut.cmd,
                    callid: uuidv4(),
                    pageName: komut.sayfa,
                    token: this.token,
                    jp: JSON.stringify(jp),
                }
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

    /**
     *
     * @param {String} vkn_veya_tckn
     */
    async kisi_getir(vkn_veya_tckn) {
        try {
            const response = await this.__kod_calistir(
                self.komutlar.MERNISTEN_BILGILERI_GETIR,
                { vkn_veya_tckn }
            );

            const data = response.get("data");
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
     */
    fatura_olustur(
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
        const kisi_bilgi = self.kisi_getir(vkn_veya_tckn);
        const currentDate = moment().tz("Turkey").format("DD/MM/YYYY");
        const fatura = fatura_ver(
            tarih || currentDate,
            saat,
            vkn_veya_tckn,
            kisi_bilgi.adi,
            kisi_bilgi.soyadi,
            kisi_bilgi.unvan,
            kisi_bilgi.vergiDairesi,
            urun_adi,
            fiyat,
            fatura_notu
        );
    }
}
