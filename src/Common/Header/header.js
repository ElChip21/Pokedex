import React from 'react';
import Nav from "./components/nav";
import { Box } from "@mui/material";

const Header = ({ currentLanguage, onLanguageChange }) => { 
    return (
        <Box sx={{ padding: '0px 24px 0px 8px' }}>
            <Nav currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
        </Box>
    );
}

export default Header;
