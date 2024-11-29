import React from "react";
import { Dialog, AppBar, Box, Slide } from "@mui/material";
import BasicAppBar from "./basicAppBar";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ open, onClose, title, children }) => {
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <BasicAppBar cb={onClose} title={title} />
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#111",
                    justifyContent: "center",
                    padding: 5,
                    height: "100%",
                }}
            >
                {children}
            </Box>
        </Dialog>
    );
};

export default FullScreenDialog;
