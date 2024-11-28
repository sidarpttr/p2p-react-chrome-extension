import { Close } from "@mui/icons-material";
import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";

const SmsOnayDialog = ({ open, onClose }) => {
    const [loading, setLoading] = useState(false);

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <AppBar sx={{ position: "relative", backgroundColor: "black" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h5"
                        component="div"
                    >
                        SMS Onay
                    </Typography>
                </Toolbar>
            </AppBar>
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
                <OutlinedInput
                    placeholder="kullanıcı kodu"
                    onChange={(event) => setKullaniciKodu(event.target.value)}
                    sx={{
                        marginBottom: 1,
                        marginTop: 2,
                        width: "100%",
                        borderRadius: 2,
                    }}
                />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} /> : "Gönder"}
                </Button>
                {error && <ErrorMessage error={error} />}
            </Box>
        </Dialog>
    );
};

export default SmsOnayDialog;
