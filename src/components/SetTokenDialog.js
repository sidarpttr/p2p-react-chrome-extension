import React, { useState, useEffect } from "react";
import {
    Box,
    OutlinedInput,
    IconButton,
    Dialog,
    Typography,
} from "@mui/material";

const SetTokenDialog = ({ open, onClose, printify }) => {
    const [token, setToken] = useState(printify.token || "");

    useEffect(() => {
        setToken(printify.token || "");
    }, [printify.token]);

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const handleTokenSubmit = () => {
        printify.setToken(token);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 2,
                }}
            >
                <OutlinedInput
                    placeholder="Enter your printify token"
                    value={token}
                    onChange={handleTokenChange}
                    sx={{ marginBottom: 2, width: "100%", borderRadius: 2 }}
                />
                <IconButton
                    color="primary"
                    variant="contained"
                    onClick={handleTokenSubmit}
                >
                    <Typography variant="body1">Tamam</Typography>
                </IconButton>
            </Box>
        </Dialog>
    );
};

export default SetTokenDialog;
