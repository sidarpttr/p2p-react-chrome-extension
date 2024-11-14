import React, { useState, useEffect } from "react";
import {
    Container,
    Alert,
    Typography,
    Card,
    Box,
    Skeleton,
} from "@mui/material";
import Appbar from "./Appbar";

const Popup = () => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setLoading(true);
        setError(null);
        chrome.runtime.sendMessage({ action: "makeRequest" }, (response) => {
            setLoading(false);
            if (response.status === "success") {
                setContent(JSON.stringify(response.data, null, 2));
            } else {
                setError(response.message);
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container
            maxWidth={false}
            disableGutters
            style={{ backgroundColor: "#1f1f1f", minHeight: "100vh" }}
        >
            <Appbar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                style={{ minHeight: "calc(100vh - 64px)" }}
            >
                {loading ? (
                    <>
                        <Skeleton
                            variant="rounded"
                            width={300}
                            height={60}
                            animation="wave"
                            sx={{ bgcolor: "grey.800" }}
                        />
                        <Skeleton
                            variant="rounded"
                            width={300}
                            height={60}
                            animation="wave"
                            sx={{ bgcolor: "grey.800", marginTop: 2 }}
                        />
                        <Skeleton
                            variant="rounded"
                            width={300}
                            height={60}
                            animation="wave"
                            sx={{ bgcolor: "grey.800", marginTop: 2 }}
                        />
                    </>
                ) : (
                    <Card
                        style={{
                            padding: "20px",
                            marginTop: "20px",
                            backgroundColor: "#111",
                            color: "white",
                        }}
                    >
                        {error && (
                            <Alert
                                severity="error"
                                style={{ marginTop: "20px" }}
                            >
                                {error}
                            </Alert>
                        )}
                        <Typography
                            variant="body1"
                            style={{ marginTop: "20px" }}
                        >
                            {content}
                        </Typography>
                    </Card>
                )}
            </Box>
        </Container>
    );
};

export default Popup;
