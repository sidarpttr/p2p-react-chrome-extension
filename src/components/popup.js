import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Appbar from "./Appbar";
import Printify from "../features/printify/repositories/printify";
import theme from "../theme";
import { Router } from "react-chrome-extension-router";
import Skeletons from "./Skeletons";
import ListShops from "./ListShops";
import ErrorMessage from "./Error";
import eArsivPortal from "../features/portal/services/portal";

const Popup = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const printify_token = localStorage.getItem("printify_token") || "";
    const portal_token = localStorage.getItem("portal_token") || "";

    const printify = new Printify(printify_token);
    const portal = new eArsivPortal(portal_token);

    useEffect(() => {
        async function initializePrintify() {
            setLoading(true);
            try {
                if (printify) {
                    await printify.init();
                    setContent(printify.shops);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        initializePrintify();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Appbar printify={printify} portal={portal} />
            <Box
                display="flex"
                justifyContent="initial"
                alignItems="center"
                paddingTop={5}
                flexDirection="column"
                style={{ minHeight: "calc(100vh - 64px)" }}
            >
                <Router>
                    {loading ? (
                        <Skeletons />
                    ) : error ? (
                        <ErrorMessage error={error} />
                    ) : (
                        <ListShops shops={content} printify={printify} />
                    )}
                </Router>
            </Box>
        </ThemeProvider>
    );
};

export default Popup;
