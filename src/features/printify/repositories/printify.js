import axios from "axios";
import { modernSession } from "../../session";
import { OturumSonlandi } from "../models/hatalar";
import Order from "../models/order";

class Printify {
    /**
     *
     * @param {String} token
     * @param {Array} fatura_order
     */
    constructor(token, fatura_order) {
        this.token = token;
        this.shops = [];
        this.oturum = modernSession();
        this.base_url = "https://api.printify.com/v1/";
        this.fatura_order = fatura_order || [];
    }

    async init() {
        await this.getShops();
    }

    /**
     *
     * @param {Order} fatura
     */
    faturaEkle(order) {
        this.fatura_order.push(order);
        localStorage.setItem("printify_fatura_orders", this.fatura_order);
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
    async getAllOrders(shop) {
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
                `http://192.168.178.252:3000/shops/${id}/orders.json`
            );

            //throw JSON.stringify(response.data.data);
            return response.data.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getOrders(shop, printify) {
        const id = shop.id;
        if (!this.token) {
            throw new OturumSonlandi(`Token geçersiz: ${this.token}`);
        }

        const response = await axios.get(
            `http://192.168.178.252:3000/shops/${id}/orders.json`
        );

        const istenmeyen_idler = printify.fatura_order.map((order) => order.id);

        const result = response.data.data.filter(
            (order) => !istenmeyen_idler.includes(order.id)
        );

        return result;
    }
}

export default Printify;
