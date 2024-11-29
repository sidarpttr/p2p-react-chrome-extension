import { Close } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";

const BasicAppBar = ({ title, cb = null }) => {
    return (
        <AppBar sx={{ position: "relative", backgroundColor: "black" }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={cb}
                    aria-label="close"
                >
                    <Close />
                </IconButton>
                <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h5"
                    component="div"
                >
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default BasicAppBar;
