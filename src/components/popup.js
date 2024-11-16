import React, { useState, useEffect } from "react";
import { Container, Box, Skeleton } from "@mui/material";
import Appbar from "./Appbar";
import OrderList from "./OrderList";

const Popup = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function getOrderModels(data) {
        return data.map((order) => ({
            id: order.id,
            first_name: order.address_to.first_name,
            last_name: order.address_to.last_name,
            email: order.address_to.email,
            phone: order.address_to.phone,
            country: order.address_to.country,
            company: order.address_to.company,
            total_price: order.total_price,
            items: order.line_items.map((item) => ({
                product_id: item.product_id,
                cost: item.cost,
            })),
        }));
    }

    const fetchData = () => {
        setLoading(true);
        setError(null);
        chrome.runtime.sendMessage({ action: "makeRequest" }, (response) => {
            setLoading(false);
            if (response.status === "success") {
                const jsonData = response.data.data;
                const orderModels = getOrderModels(jsonData);
                setContent(orderModels);
            } else {
                setError(response.message);
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container
            maxWidth={false}
            disableGutters
            style={{ backgroundColor: "#1f1f1f", minHeight: "100vh" }}
        >
            <Appbar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                style={{ minHeight: "calc(100vh - 64px)" }}
            >
                {loading ? (
                    _buildSkeletons()
                ) : (
                    <OrderList orders={content} error={error} />
                )}
            </Box>
        </Container>
    );

    //build error mesage
    function _buildErrorMessage() {}

    function _buildSkeletons() {
        return (
            <>
                <Skeleton
                    variant="rounded"
                    width={300}
                    height={60}
                    animation="wave"
                    sx={{ bgcolor: "grey.800" }}
                />
                <Skeleton
                    variant="rounded"
                    width={300}
                    height={60}
                    animation="wave"
                    sx={{ bgcolor: "grey.800", marginTop: 2 }}
                />
                <Skeleton
                    variant="rounded"
                    width={300}
                    height={60}
                    animation="wave"
                    sx={{ bgcolor: "grey.800", marginTop: 2 }}
                />
            </>
        );
    }
};

export default Popup;
