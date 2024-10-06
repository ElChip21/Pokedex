import React from 'react';
import { Box, Typography } from '@mui/material';
import Badge from './badge';

const Card = ({ types, name, image, typesData }) => {
  return (
    <Box 
      sx={{ 
        width: 200, 
        height: 200, 
        ml: '14px',
        mt: '14px',
        borderRadius: 5, 
        boxShadow: 1,
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
      }}
    >
      <Typography variant="h6" color="text.primary">
        {name}
      </Typography>
      
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
        }}
      />

      <Box 
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {types.map(type => {
          const typeInfo = typesData[type]; // On obtiens les informations sur le type
          return (
            <Badge 
              key={type} 
              label={typeInfo.translations.fr.toUpperCase()}
              color={typeInfo.backgroundColor}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Card;
