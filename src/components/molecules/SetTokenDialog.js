import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    OutlinedInput,
    IconButton,
    Dialog,
    Typography,
    Button,
} from "@mui/material";
import { AppContext } from "../pages/popup";

const SetTokenDialog = ({ open, onClose }) => {
    const { state, setState } = useContext(AppContext);
    if (state == null) {
        return;
    }

    const [token, setToken] = useState(state.printify.token || "");

    useEffect(() => {
        setToken(state.printify.token || "");
    }, [state.printify.token]);

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const handleTokenSubmit = () => {
        state.printify.setToken(token);
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
                    paddingTop: 5,
                    paddingBottom:5,
                    backgroundColor: "#111",
                }}
            >
                <OutlinedInput
                    placeholder="Enter your printify token"
                    value={token}
                    onChange={handleTokenChange}
                    sx={{ marginBottom: 2, width: "100%", borderRadius: 2 }}
                />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleTokenSubmit}
                    sx={{ mt: 2 }}
                >
                    Set Token
                </Button>
            </Box>
        </Dialog>
    );
};

export default SetTokenDialog;
