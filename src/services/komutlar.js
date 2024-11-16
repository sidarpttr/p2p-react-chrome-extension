class Komut {
    constructor(cmd, sayfa) {
        this.cmd = cmd;
        this.sayfa = sayfa;
    }
}

class Komutlar {
    constructor() {
        this.KULLANICI_BILGILERI_GETIR = new Komut(
            "EARSIV_PORTAL_KULLANICI_BILGILERI_GETIR",
            "RG_KULLANICI"
        );
        this.MERNISTEN_BILGILERI_GETIR = new Komut(
            "SICIL_VEYA_MERNISTEN_BILGILERI_GETIR",
            "RG_BASITFATURA"
        );
        this.FATURA_OLUSTUR = new Komut(
            "EARSIV_PORTAL_FATURA_OLUSTUR",
            "RG_BASITFATURA"
        );
        this.TASLAKLARI_GETIR = new Komut(
            "EARSIV_PORTAL_TASLAKLARI_GETIR",
            "RG_BASITTASLAKLAR"
        );
        this.FATURA_GOSTER = new Komut(
            "EARSIV_PORTAL_FATURA_GOSTER",
            "RG_BASITTASLAKLAR"
        );
        this.FATURA_SIL = new Komut(
            "EARSIV_PORTAL_FATURA_SIL",
            "RG_BASITTASLAKLAR"
        );
        this.TELEFONNO_SORGULA = new Komut(
            "EARSIV_PORTAL_TELEFONNO_SORGULA",
            "RG_SMSONAY"
        );
        this.SMSSIFRE_GONDER = new Komut(
            "EARSIV_PORTAL_SMSSIFRE_GONDER",
            "RG_SMSONAY"
        );
        this.SMSSIFRE_DOGRULA = new Komut(
            "0lhozfib5410mp",
            "RG_SMSONAY"
        );
        this.ADIMA_KESILEN_BELGELERI_GETIR = new Komut(
            "EARSIV_PORTAL_ADIMA_KESILEN_BELGELERI_GETIR",
            "RG_ALICI_TASLAKLAR"
        );
    }
}

module.exports = { Komut, Komutlar };