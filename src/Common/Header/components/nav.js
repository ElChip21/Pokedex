import React from 'react'; 
import logo from './logo.svg';
import Language from './language';
import { Box } from '@mui/material';

const Nav = ({ currentLanguage, onLanguageChange }) => {
    return (
        <Box component="nav" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box component="img" src={logo} alt="Logo" height={'60px'} />
            <Box>
                <Language currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
            </Box>
        </Box>
    );
};

export default Nav;
