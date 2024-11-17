import { Alert } from "@mui/material";
import { DataObjectRounded } from "@mui/icons-material";
import React from "react";

const InfoMessage = ({ message }) => {
    return (
        <Alert severity="info" icon={<DataObjectRounded />}>
            {message}
        </Alert>
    );
};

export default InfoMessage;
