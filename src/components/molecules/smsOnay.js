import { Close } from "@mui/icons-material";
import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    OutlinedInput,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import ErrorMessage from "../atoms/Error";

const SmsOnayDialog = ({ open, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [cikisOpen, setCikisOpen] = useState(false);

    return (
        <>
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
                        placeholder="Şifre"
                        onChange={(event) =>
                            setKullaniciKodu(event.target.value)
                        }
                        sx={{
                            marginBottom: 1,
                            marginTop: 2,
                            width: "100%",
                            borderRadius: 2,
                        }}
                    />
                    <Button color="primary" variant="contained" sx={{ mt: 2 }}>
                        {loading ? <CircularProgress size={24} /> : "Gönder"}
                    </Button>
                </Box>
            </Dialog>
            <Dialog open={cikisOpen} onClose={() => setCikisOpen(false)}>
                <DialogTitle>Emin Misin</DialogTitle>
                <DialogContent>
                    <Box>
                        <Button
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            "İptal"
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            İptal
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SmsOnayDialog;
