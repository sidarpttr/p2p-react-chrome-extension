import React from "react";
import { Alert } from "@mui/material";

const ErrorMessage = ({ error }) => {
    return <Alert severity="error">{error.message}</Alert>;
};

export default ErrorMessage;
