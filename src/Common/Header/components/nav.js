import React, { useContext } from 'react'; 
import logo from './logo.svg';
import Language from './language';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { LanguageContext } from '../../Context/LanguageContext'


const Nav = () => {
    const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);

    return (
        <Box component="nav" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Link to="/">
                <Box component="img" src={logo} alt="Logo" height={'60px'} />
            </Link>
            <Box>
                <Language currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
            </Box>
        </Box>
    );
};

export default Nav;
