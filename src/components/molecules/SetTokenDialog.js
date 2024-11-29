import React, { useState, useEffect, useContext } from "react";
import {
    OutlinedInput,
    Button,
    Slide,
    Box,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import { AppContext } from "../pages/popup";
import FullScreenDialog from "../atoms/fullScreenDialog";
import InfoMessage from "../atoms/Info";
import { QuestionMark } from "@mui/icons-material";

const SetTokenDialog = ({ open, onClose }) => {
    const { state, setState } = useContext(AppContext);
    if (state == null) {
        return;
    }

    const guide = "Printify > Account > Connections > API Tokens > Generate";

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
        <FullScreenDialog
            open={open}
            onClose={onClose}
            title={"Printify Token"}
        >
            <img
                src="https://printify.com/wp-content/uploads/2024/10/Printify-Green-Favicon-96x96.png"
                alt="Printify Logo"
                style={{ marginBottom: 50 }}
            />
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
            <Snackbar open={true}>
                <Alert icon={<QuestionMark />} color="primary" variant="filled">
                    {guide}
                </Alert>
            </Snackbar>
        </FullScreenDialog>
    );
};

export default SetTokenDialog;
