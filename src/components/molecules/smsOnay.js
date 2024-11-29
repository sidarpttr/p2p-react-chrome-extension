import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    OutlinedInput,
    Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import FullScreenDialog from "../atoms/fullScreenDialog";
import { Sms } from "@mui/icons-material";

const SmsOnayDialog = ({ open, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [cikisOpen, setCikisOpen] = useState(false);

    return (
        <>
            <FullScreenDialog
                open={open}
                onClose={() => setCikisOpen(true)}
                title={"SMS Onay"}
            >
                <Snackbar open={true}>
                    <Alert variant="outlined" severity="success" icon={<Sms />}>
                        Faturayı imzalayabilmek için telefonuna SMS olarak gelen
                        şifreyi girmen gerek
                    </Alert>
                </Snackbar>
                <OutlinedInput
                    placeholder="Şifre"
                    onChange={(event) => setKullaniciKodu(event.target.value)}
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
            </FullScreenDialog>
            <Dialog open={cikisOpen} onClose={() => setCikisOpen(false)}>
                <DialogTitle>Emin Misin?</DialogTitle>
                <Divider />
                <DialogContent>
                    <Box>
                        <Button
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 2, mr: 5 }}
                            onClick={() => setCikisOpen(false)}
                        >
                            İptal
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={() => {
                                setCikisOpen(false);
                                onClose();
                            }}
                        >
                            Evet
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SmsOnayDialog;
