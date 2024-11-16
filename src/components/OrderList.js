import React from "react";
import {
    Alert,
    Card,
    CardContent,
    List,
    ListItem,
    Typography,
} from "@mui/material";
import { DataObjectRounded } from "@mui/icons-material";

const OrderList = ({ orders, error }) => {
    if (error) {
        return (
            <Alert severity="error" style={{ marginTop: "20px" }}>
                {error}
            </Alert>
        );
    }

    if (orders.length === 0) {
        return (
            <Alert severity="info" icon={<DataObjectRounded />}>
                Henüz satış yok.
            </Alert>
        );
    }

    return (
        <List style={{width:"100%"}}>
            {orders.map((order) => (
                <ListItem key={order.id} style={{ marginBottom: "20px"}}>
                    <Card
                        style={{
                            width: "100%",
                            backgroundColor: "#111",
                            color: "white",
                        }}
                    >
                        <CardContent>
                            <Typography variant="body1" align="left">
                                {order.first_name + " " + order.last_name}
                            </Typography>
                            <Typography variant="body2" align="left">
                                {order.first_name + " " + order.last_name}
                            </Typography>
                        </CardContent>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
};

export default OrderList;
