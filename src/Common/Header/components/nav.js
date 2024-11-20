import React from 'react'; 
import logo from './logo.svg';
import Language from './language';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { useLocalContext } from '../../Context/LocalContext';

const Nav = () => {
    const { currentLanguage, handleLanguageChange } = useLocalContext();

    return (
        <Box component="nav" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Link to="/">
                <Box component="img" src={logo} alt="Logo" height={'60px'} />
            </Link>
            <Box>
                <Language currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
            </Box>
        </Box>
    );
};

export default Nav;
