import axios from "axios";
import { legacySession, modernSession } from "../../session";
import { OturumSonlandi } from "../models/hatalar";

class Printify {
    /**
     *
     * @param {String} token
     */
    constructor(token) {
        this.token = token;
        this.shops = [];
        this.oturum = modernSession();
        this.base_url = "https://api.printify.com/v1/";
    }

    async init() {
        await this.getShops();
    }

    /**
     *
     * @param {String} token
     */
    setToken(token) {
        localStorage.setItem("printify_token", token);
        this.token = token;
    }

    async getShops() {
        if (!this.token) {
            throw new OturumSonlandi("Token geçersiz");
        }
        try {
            const response = await this.oturum.get(
                `${this.base_url}shops.json`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
            );

            this.shops = response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     *
     * @param {Object} shop
     */
    async getOrders(shop) {
        const id = shop.id;
        if (!this.token) {
            throw new OturumSonlandi(`Token geçersiz: ${this.token}`);
        }

        try {
            //const response = await this.oturum.get(
            //    `${this.base_url}shops/${id}/orders.json`,
            //    {
            //        headers: {
            //            Authorization: `Bearer ${this.token}`,
            //        },
            //    }
            //);

            const response = await axios.get(
                `http://192.168.225.252:3000/shops/${id}/orders.json`
            );

            //throw JSON.stringify(response.data.data);
            return response.data.data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default Printify;
