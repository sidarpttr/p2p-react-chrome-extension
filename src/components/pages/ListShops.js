import React, { useContext } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import theme from "../../theme";
import { goTo } from "react-chrome-extension-router";
import OrderList from "./OrderList";
import Printify from "../../features/printify/repositories/printify";
import { AppContext } from "./popup";

/**
 *
 * @param {Printify} printfy
 * @param {Object} shops
 * @returns
 */
const ListShops = () => {
    const { state, setState } = useContext(AppContext);
    if (state == null) {
        return;
    }
    return (
        <>
            <Typography variant="h6">Shops</Typography>
            <List sx={{ width: "80%" }}>
                {state.printify.shops.map((shop) => (
                    <React.Fragment key={shop.id}>
                        <ListItem
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 1.5,
                                padding: 2,
                                marginBottom: 2,
                            }}
                            onClick={() => {
                                goTo(OrderList, { shop });
                            }}
                        >
                            <ListItemText
                                primary={shop.title}
                                secondary={shop.id}
                            />
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
        </>
    );
};

export default ListShops;
