import React, { Suspense, useContext, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import RangeCalendar from "../molecules/calendar";
import dayjs from "dayjs";
import { Close, Done, NavigateNext } from "@mui/icons-material";
import Skeletons from "../atoms/Skeletons";
import { AppContext } from "../pages/popup";
import ErrorMessage from "../atoms/Error";
import { CalendarIcon } from "@mui/x-date-pickers";
import SmsOnayDialog from "../molecules/smsOnay";

const Invoices = () => {
    const { state, setState } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [days, setDays] = useState([
        dayjs().startOf("week").format("DD/MM/YYYY"),
        dayjs().endOf("week").format("DD/MM/YYYY"),
    ]);
    const [visible, setVisible] = useState(true);
    const [error, setError] = useState(false);
    const [invoices, setInvoices] = useState([]);

    /**
     *
     * @param {String} baslangic_tarihi
     * @param {String} bitis_tarihi
     */
    const getInvoices = async (baslangic_tarihi, bitis_tarihi) => {
        try {
            const response = await state.portal.faturalari_getir(
                baslangic_tarihi,
                bitis_tarihi
            );
            setInvoices(response);
        } catch (error) {
            setError(error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box width={"80%"} justifyContent={"center"} alignContent={"center"}>
            {visible ? (
                _buildCalendar()
            ) : (
                <Suspense fallback={<Skeletons />}>
                    <Box
                        justifyContent={"space-between"}
                        display={"flex"}
                        width={"100%"}
                        padding={1}
                    >
                        <Typography variant="h6">Faturalar</Typography>
                        <IconButton onClick={() => setVisible(true)}>
                            <CalendarIcon />
                        </IconButton>
                    </Box>
                    {error ? (
                        <ErrorMessage error={error} />
                    ) : (
                        invoices.map((fatura) => FaturaListItem(fatura))
                    )}
                </Suspense>
            )}
            <SmsOnayDialog open={open} onClose={handleClose} />
        </Box>
    );

    /**
     *
     * @param {Fatura} fatura
     * @returns
     */
    function FaturaListItem(fatura) {
        return (
            <Card
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#222",
                    marginTop: 1,
                    marginBottom: 1,
                }}
                key={fatura.belgeNumarasi}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                    }}
                >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography variant="h6" component="div">
                            {fatura.aliciUnvanAdSoyad}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="div"
                            sx={{ color: "text.secondary" }}
                        >
                            {fatura.belgeTarihi}
                        </Typography>
                        <Chip label={fatura.onayDurumu} />
                    </CardContent>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ padding: 1 }}>
                    <IconButton onClick={handleClickOpen}>
                        <NavigateNext />
                    </IconButton>
                </Box>
            </Card>
        );
    }

    function _buildCalendar() {
        return (
            <>
                <RangeCalendar cb={(value) => setDays(value)} />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <Box>
                        <Typography>{days[0]}</Typography>
                        <Typography>{days[1]}</Typography>
                    </Box>
                    <IconButton
                        onClick={() => setVisible(false)}
                        color="secondary"
                    >
                        <Close />
                    </IconButton>
                    <IconButton
                        onClick={async () => {
                            setVisible(false);
                            await getInvoices(days[0], days[1]);
                        }}
                        color="primary"
                    >
                        <Done />
                    </IconButton>
                </Box>
            </>
        );
    }
};

export default Invoices;
