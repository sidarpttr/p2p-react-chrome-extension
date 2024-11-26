import React from "react";
import { Skeleton } from "@mui/material";

const Skeletons = () => {
    return (
        <>
            <Skeleton
                variant="text"
                animation="wave"
                sx={{ bgcolor: "grey.800", width: "40%" }}
            />
            <Skeleton
                variant="rounded"
                height={80}
                animation="wave"
                sx={{ bgcolor: "grey.800", width: "80%", marginTop: 2 }}
            />
            <Skeleton
                variant="rounded"
                height={80}
                animation="wave"
                sx={{ bgcolor: "grey.800", marginTop: 2, width: "80%" }}
            />
            <Skeleton
                variant="rounded"
                height={80}
                animation="wave"
                sx={{ bgcolor: "grey.800", marginTop: 2, width: "80%" }}
            />
        </>
    );
};

export default Skeletons;
