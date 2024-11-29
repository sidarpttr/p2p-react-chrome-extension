
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#9EDF9C",
        },
        secondary:{
            main: "#AE445A"
        },
        background: {
            default: "#111111",
            paper: "#333333",
        },
        text: {
            primary: "#ffffff",
            secondary: "#9EDF9C",
        },
    },
});

export default theme;