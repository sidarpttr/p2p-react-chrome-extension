import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    IconButton,
    OutlinedInput,
    Slide,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import eArsivPortal from "../../features/portal/repositories/portal";
import { goBack } from "react-chrome-extension-router";
import ErrorMessage from "../atoms/Error";
import { AppContext } from "../pages/popup";
import { Close } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 *
 * @param {eArsivPortal} portal
 * @returns
 */
const PortalLoginForm = ({ open, onClose }) => {
    const { state, setState } = useContext(AppContext);
    if (state == null) {
        return null;
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
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: "relative", backgroundColor:"black" }}>
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
                        Login ePortal
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
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} /> : "Login"}
                </Button>
                {error && <ErrorMessage error={error} />}
            </Box>
        </Dialog>
    );
};

export default PortalLoginForm;
