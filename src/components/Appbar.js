import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Appbar = () => {
    return (
        <AppBar
            position="sticky"
            style={{ backgroundColor: "black", color: "#9EDF9C" }}
        >
            <Toolbar>
                <Typography variant="h5" >P2P</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
