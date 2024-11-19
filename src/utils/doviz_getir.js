const axios = require("axios");
const parseString = require("xml2js").parseString;

export const dolarKur = async () => {
    try {
        const response = await axios.get(
            "https://www.tcmb.gov.tr/kurlar/today.xml"
        );
        parseString(response.data, (err, result) => {
            if (err) {
                throw err;
            }
            const data = result.Tarih_Date.Currency.find(
                (currency) => currency.$.CurrencyCode === "USD"
            );
            return data;
        });
    } catch (error) {
        console.error(error);
    }
};
