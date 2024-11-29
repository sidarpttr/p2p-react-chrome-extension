import React, { useContext, useState } from "react";
import { AppContext } from "./popup";
import { Box, Tab, Tabs } from "@mui/material";
import OrderList from "../organisms/OrderList";
import GoBackFab from "../atoms/goBackFab";
import Invoices from "../organisms/InvoicesTab";

const OrdersPage = ({ shop }) => {
    const { state, setState } = useContext(AppContext);
    const [value, setValue] = useState("one");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            {value == "one" ? <OrderList shop={shop} /> : <Invoices />}
            <Box
                sx={{
                    width: "100%",
                    position: "fixed",
                    bottom: "0",
                    right:0,
                    left:0,
                    backgroundColor: "#111İ",
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    indicatorColor="primary"
                    TabIndicatorProps={{
                        sx: {
                            top: 0,
                            bottom: "unset",
                        },
                    }}
                    variant="fullWidth"
                >
                    <Tab value="one" label="Orders"/>
                    <Tab value="two" label="Inovices" />
                </Tabs>
            </Box>
            <GoBackFab />
        </>
    );
};

export default OrdersPage;
