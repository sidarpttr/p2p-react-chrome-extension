/**
 *
 * @param {String} tarih
 * @returns {String[]}
 */
export default function tarih_ayir(tarih) {
    var [gun, saat] = tarih.split(" ");
    gun = gun.split("-").reverse().join("/");
    saat = saat.split("+")[0];
    return [gun, saat];
}
