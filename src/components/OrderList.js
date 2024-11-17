import React, { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    Card,
    CardContent,
    IconButton,
    List,
    ListItem,
    Toolbar,
    Typography,
} from "@mui/material";
import Skeletons from "./Skeletons";
import ErrorMessage from "./Error";
import Printify from "../features/printify/repositories/printify";
import InfoMessage from "./Info";
import GoBackBar from "./goBackFab";

/**
 *
 * @param {Printify} printify
 * @param {Object} shop
 * @returns
 */
const OrderList = ({ printify, shop }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        async function getOrders() {
            try {
                const response = await printify.getOrders(shop);
                setOrders(response);
                console.log(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        getOrders();
    }, []);

    return (
        <>
            {loading ? (
                <Skeletons />
            ) : error ? (
                <ErrorMessage error={error} />
            ) : Array.isArray(orders) ? (
                <>
                    <Typography variant="h6">Orders</Typography>
                    <List style={{ width: "100%" }}>
                        {orders.map((order) => (
                            <ListItem
                                key={order.id}
                                style={{ marginBottom: "20px" }}
                            >
                                <Card
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#111",
                                        color: "white",
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="body1"
                                            align="left"
                                        >
                                            {order.first_name +
                                                " " +
                                                order.last_name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            align="left"
                                        >
                                            {order.first_name +
                                                " " +
                                                order.last_name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </ListItem>
                        ))}
                    </List>
                </>
            ) : (
                <InfoMessage message={"no orders"} />
            )}
            <GoBackBar />
        </>
    );
};

export default OrderList;
