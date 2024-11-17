import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Step, StepLabel, Stepper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Printify from "../features/printify/repositories/printify";
import SetTokenDialog from "./SetTokenDialog";

const steps = ["Printify token", "ePortal giriş"];

/**
 *
 * @param {Printify} printfy
 * @returns
 */
const Appbar = ({ printify }) => {
    const [open, setOpen] = useState(false);
    const activeStep = printify.token ? 1 : 0;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            {_buildAppBar()}
            <SetTokenDialog
                open={open}
                onClose={handleClose}
                printify={printify}
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
                                        handleClickOpen();
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
//<IconButton
//                        onClick={handleClickOpen}
//                        edge="start"
//                        color="inherit"
//                        aria-label="menu"
//                    >
//                        <MenuIcon />
//                    </IconButton>
//                    <Typography variant="h5"></Typography>
