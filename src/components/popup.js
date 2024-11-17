import React, { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Appbar from "./Appbar";
import Printify from "../features/printify/repositories/printify";
import theme from "../theme";
import { Router } from "react-chrome-extension-router";
import Skeletons from "./Skeletons";
import ListShops from "./ListShops";
import ErrorMessage from "./Error";

const Popup = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const printify_token = localStorage.getItem("printify_token") || "";
    const printify = new Printify(printify_token);

    useEffect(() => {
        async function initializePrintify() {
            try {
                if (printify) {
                    setLoading(true);
                    await printify.init();
                    setContent(printify.shops);
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        initializePrintify();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Appbar printify={printify} />
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

//<BrowserRouter
//                future={{
//                    v7_startTransition: true,
//                }}
//            >
//                <Container
//                    maxWidth={false}
//                    disableGutters
//                    style={{
//                        backgroundColor: theme.palette.background.default,
//                        minHeight: "100vh",
//                    }}
//                >
//                    <Box
//                        display="flex"
//                        justifyContent="center"
//                        alignItems="center"
//                        flexDirection="column"
//                        style={{ minHeight: "calc(100vh - 64px)" }}
//                    >
//                        <AppRoutes content={content} loading={loading} />
//                    </Box>
//                </Container>
//            </BrowserRouter>
