import React, { useEffect, useContext, useState, createContext } from "react";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Appbar from "./Appbar";
import Printify from "../features/printify/repositories/printify";
import theme from "../theme";
import { Router } from "react-chrome-extension-router";
import Skeletons from "./Skeletons";
import ListShops from "./ListShops";
import ErrorMessage from "./Error";
import eArsivPortal from "../features/portal/services/portal.js";
import { PrintifyHatasi } from "../features/printify/models/hatalar.js";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const printify_token = localStorage.getItem("printify_token") || "";
    const portal_token = localStorage.getItem("portal_token") || "";

    const printify = new Printify(printify_token);
    const portal = new eArsivPortal(portal_token);
    const [state, setState] = useState({
        printify,
        portal,
    });

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
};

const Popup = () => {
    const { state, setState } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function initPrintify() {
            setLoading(true);
            try {
                if (state.printify) {
                    await state.printify.init();
                }
            } catch (error) {
                setError(
                    new PrintifyHatasi(
                        `Magazalar yüklenirken bir sorun oluştu: ${error.message}`
                    )
                );
            } finally {
                setLoading(false);
            }
        }
        initPrintify();
    },[]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Appbar />
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
                        <ListShops />
                    )}
                </Router>
            </Box>
        </ThemeProvider>
    );
};

export default Popup;
