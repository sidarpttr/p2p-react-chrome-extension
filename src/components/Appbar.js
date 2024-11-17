import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Step, StepLabel, Stepper, Tooltip } from "@mui/material";
import Printify from "../features/printify/repositories/printify";
import SetTokenDialog from "./SetTokenDialog";
import PortalLoginForm from "./ePortalLogin";

const steps = ["Printify token", "ePortal giriş"];

/**
 *
 * @param {Printify} printfy
 * @returns
 */
const Appbar = ({ printify, portal }) => {
    //printify token dialogu için
    const [token_open, setTokenOpen] = useState(false);

    //eportal login dialogu içiçn
    const [login_open, setLoginOpen] = useState(false);

    //token ve e portal girişi kontrol için
    const activeStep = portal.token ? 2 : printify.token ? 1 : 0;

    const token_handleClickOpen = () => {
        //printify tokeni dialogu için açma fonksiyonu
        setTokenOpen(true);
    };

    const token_handleClose = () => {
        //printify tokeni dialogu için kapatma fonksiyonu
        setTokenOpen(false);
    };

    const login_handleClickOpen = () => {
        //eportal login dialogu için açma fonksiyonu
        setLoginOpen(true);
    };

    const login_handleClose = () => {
        //eportal login dialogu için kapatma fonksiyonu
        setLoginOpen(false);
    };

    return (
        <>
            {_buildAppBar()}
            <SetTokenDialog
                open={token_open}
                onClose={token_handleClose}
                printify={printify}
            />
            <PortalLoginForm
                open={login_open}
                onClose={login_handleClose}
                portal={portal}
            />
        </>
    );

    function _buildAppBar() {
        return (
            <AppBar
                position="sticky"
                style={{ backgroundColor: "black", color: "#9EDF9C" }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            width: "100%",
                        }}
                    >
                        {_buildStepper()}
                    </Box>
                </Toolbar>
            </AppBar>
        );

        function _buildStepper() {
            return (
                <Stepper
                    sx={{ margin: 1.5 }}
                    activeStep={activeStep}
                    alternativeLabel
                >
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel
                                onClick={() => {
                                    if (index === 0) {
                                        token_handleClickOpen();
                                    } else if (index === 1) {
                                        login_handleClickOpen();
                                    }
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            );
        }
    }
};

export default Appbar;
