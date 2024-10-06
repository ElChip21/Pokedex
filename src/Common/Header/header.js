import React from "react";
import Nav from "./components/nav";
import { Box } from "@mui/material";

const Header = () => {
    return (
        <Box sx={{padding: '0px 24px 0px 8px'}}>
        <Nav />
        </Box>
    )
}

export default Header;