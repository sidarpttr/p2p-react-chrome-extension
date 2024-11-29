import React, { Suspense, useContext, useEffect, useState } from "react";
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    IconButton,
    Snackbar,
    Typography,
} from "@mui/material";
import Skeletons from "../atoms/Skeletons";
import ErrorMessage from "../atoms/Error";
import Printify from "../../features/printify/repositories/printify";
import Order from "../../features/printify/models/order";
import { Error, NavigateNext } from "@mui/icons-material";
import { AppContext } from "../pages/popup";
import { keyframes } from "@emotion/react";
import PrintifyApiService from "../../features/printify/services/printifyApiService";
import { ePortalHatasi } from "../../features/portal/models/hatalar";

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

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
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    useEffect(() => {
        async function getOrders() {
            try {
                const response = await state.printify.getOrders(
                    shop,
                    state.printify
                );
                setOrders(Order.toOrdersList(response));
            } catch (error) {
                setError(error);
            }
        }
        getOrders();
    }, [shop]);

    const handleSubmit = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== orderId)
        );
    };

    return (
        <>
            <Typography variant="h5">{shop.title}</Typography>
            <Suspense fallback={<Skeletons />}>
                {error
                    ? ErrorMessage(error)
                    : orders.map((order) => (
                          <OrderListItem
                              order={order}
                              key={order.id}
                              onSubmit={handleSubmit}
                              submit={(err, success) => {
                                  setSubmitError(err);
                                  setSubmitSuccess(success);
                              }}
                          />
                      ))}
            </Suspense>
            <Snackbar
                open={submitError !== null}
                autoHideDuration={6000}
                onClose={() => setSubmitError(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSubmitError(null)}
                    severity="error"
                    variant="filled"
                >
                    {submitError ? submitError.message : ""}
                </Alert>
            </Snackbar>
            <Snackbar
                open={submitSuccess}
                autoHideDuration={6000}
                onClose={() => setSubmitSuccess(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSubmitSuccess(false)}
                    severity="success"
                    variant="filled"
                >
                    Fatura başarıyla oluşturuldu. İmzalamak için faturaları
                    kontrol et
                </Alert>
            </Snackbar>
        </>
    );
};

export default OrderList;

/**
 *
 * @param {Order} order
 * @returns
 */
const OrderListItem = ({ order, onSubmit, submit }) => {
    const { state, setState } = useContext(AppContext);
    const [isRemoving, setIsRemoving] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const apiService = new PrintifyApiService(
                state.printify,
                state.portal
            );
            await apiService.generateInvoiceFromOrder(order);

            setIsRemoving(true);
            setTimeout(() => {
                onSubmit(order.id);
            }, 500);
            submit(null, true);
        } catch (error) {
            submit(error, false);
        } finally {
            setLoading(false);
        }
    };

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
                animation: isRemoving
                    ? `${slideOutRight} 0.5s forwards`
                    : "none",
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
            {loading ? (
                <CircularProgress />
            ) : (
                <IconButton
                    onClick={async () => {
                        await handleSubmit();
                    }}
                >
                    <NavigateNext />
                </IconButton>
            )}
        </Card>
    );
};
