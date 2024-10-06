import React from 'react';
import { ReactDOM } from 'react-dom/client';
import logo from './logo.svg';
import Language from './language';
import { Box } from '@mui/material';


const Nav = ({}) => {
return (
    <Box component="nav" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box component="img" src={logo} alt="Logo" sx={{height: '50px' }} />
        <Box> <Language /> </Box>
   
    </Box>
);
};

export default Nav;
