import React from "react";
import { ArrowBackIosNew } from "@mui/icons-material";
import { AppBar, Fab, IconButton, Toolbar } from "@mui/material";
import { goBack } from "react-chrome-extension-router";
const GoBackFab = () => {
    return (
        <Fab
            size="small"
            color="primary"
            aria-label="back"
            onClick={() => goBack()}
            style={{
                position: "fixed",
                bottom: 16,
                left: 16,
            }}
        >
            <ArrowBackIosNew />
        </Fab>
    );
};
export default GoBackFab;
