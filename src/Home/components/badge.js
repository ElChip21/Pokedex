import React from 'react';
import { Box } from '@mui/material';

const Badge = ({ label, color }) => {
    return (
        <Box
            component="span"
            sx={{
                display: 'inline-block',
                border: '1px solid black',
                padding: '0.2em 0.5em',
                borderRadius: '10px',
                backgroundColor: color,
                color: 'black',
                fontSize: '0.65em',
                margin: '0.2em'
            }}
        >
            {label}
        </Box>
    );
};

export default Badge;
