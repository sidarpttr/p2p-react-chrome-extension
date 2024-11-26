import React, { Suspense, useContext, useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import Skeletons from "../atoms/Skeletons";
import ErrorMessage from "../atoms/Error";
import Printify from "../../features/printify/repositories/printify";
import Order from "../../features/printify/models/order";
import { NavigateNext } from "@mui/icons-material";
import { AppContext } from "../pages/popup";

/**
 *
 * @param {Printify} printify
 * @param {Object} shop
 * @returns
 */
const OrderList = ({ shop }) => {
    const { state, setState } = useContext(AppContext);
    if (state == null) {
        return;
    }
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function getOrders() {
            try {
                const response = await state.printify.getOrders(
                    shop,
                    state.printify
                );
                setOrders(Order.toOrdersList(response));
            } catch (error) {
                throw error; //TODO
                setError(error);
            }
        }
        getOrders();
    }, [shop]);

    return (
        <>
            <Typography variant="h5">{shop.title}</Typography>
            <Suspense fallback={<Skeletons />}>
                {error
                    ? ErrorMessage(error)
                    : orders.map((order) => (
                          <OrderListItem order={order} key={order.id} />
                      ))}
            </Suspense>
        </>
    );
};

export default OrderList;

/**
 *
 * @param {Order} order
 * @returns
 */
const OrderListItem = ({ order }) => {
    return (
        <Card
            sx={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#222",
                marginTop: 1,
                marginBottom: 1,
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography variant="h6" component="div">
                        {order.ad + " " + order.soyad}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{ color: "text.secondary" }}
                    >
                        {order.urun_adi + ` $${order.fiyat}`}
                    </Typography>
                    <Chip label={order.tarih} />
                </CardContent>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ padding: 1 }}>
                <IconButton>
                    <NavigateNext />
                </IconButton>
            </Box>
        </Card>
    );
};
