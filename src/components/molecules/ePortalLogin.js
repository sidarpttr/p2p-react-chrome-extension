import {
    Box,
    CircularProgress,
    Dialog,
    IconButton,
    OutlinedInput,
    Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import eArsivPortal from "../../features/portal/services/portal";
import { goBack } from "react-chrome-extension-router";
import ErrorMessage from "../atoms/Error";
import { AppContext } from "../pages/popup";

/**
 *
 * @param {eArsivPortal} portal
 * @returns
 */
const PortalLoginForm = ({ open, onClose }) => {
    const { state, setState } = useContext(AppContext);
    if (state == null) {
        return;
    }
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [kullanici_kodu, setKullaniciKodu] = useState("");
    const [sifre, setSifre] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        try {
            state.portal.kullanici_kodu = kullanici_kodu;
            state.portal.sifre = sifre;
            const response = await state.portal.giris_yap();
            if (!response) {
                setError(new Error("kullanici kodu veya sifre hatalı"));
            }
            goBack();
        } catch (error) {
            setError(new Error(error));
        } finally {
            setLoading(false);
        }
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
                }}
            >
                <Typography variant="h5">Login ePortal</Typography>
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
                <OutlinedInput
                    placeholder="şifre"
                    onChange={(event) => setSifre(event.target.value)}
                    sx={{
                        marginBottom: 1,
                        marginTop: 2,
                        width: "100%",
                        borderRadius: 2,
                    }}
                />
                <IconButton
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    <Typography variant="body1">Login</Typography>
                </IconButton>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <ErrorMessage error={error} />
                ) : (
                    <></>
                )}
            </Box>
        </Dialog>
    );
};

export default PortalLoginForm;
