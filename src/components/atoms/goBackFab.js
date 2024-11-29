import React, { useRef } from "react";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { goBack } from "react-chrome-extension-router";
import Draggable from "react-draggable";

const GoBackFab = () => {
    const nodeRef = useRef(null);
    const isDragging = useRef(false);

    const handleDrag = () => {
        isDragging.current = true;
    };

    const handleStop = () => {
        setTimeout(() => {
            isDragging.current = false;
        }, 0);
    };

    const handleClick = () => {
        if (!isDragging.current) {
            goBack();
        }
    };

    return (
        <Draggable nodeRef={nodeRef} onDrag={handleDrag} onStop={handleStop}>
            <div
                ref={nodeRef}
                style={{ position: "fixed", top: 116, left: 16, zIndex: 1000 }}
            >
                <Fab
                    size="small"
                    color="primary"
                    aria-label="back"
                    title="back"
                    onClick={handleClick}
                >
                    <ArrowBackIosNew />
                </Fab>
            </div>
        </Draggable>
    );
};

export default GoBackFab;
