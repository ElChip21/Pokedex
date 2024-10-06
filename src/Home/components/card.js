import React from 'react';
import { Box, Typography } from '@mui/material';
import Badge from './badge';

const Card = ({ types, name, image, typesData, currentLanguage, identifier }) => {
  return (
    <Box 
      sx={{ 
        width: 220, 
        height: 200, 
        ml: '14px',
        mt: '14px',
        borderRadius: 5, 
        boxShadow: 1,
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
      }}
    >
      <Typography 
        variant="caption"
        color="text.secondary"
        sx={{ 
          padding: '2px 4px',
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '4px',
        }}
      >
        {identifier}
      </Typography>


      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography color="text.primary" fontSize={'20px'}>
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
            const typeInfo = typesData[type]; // Obtenir les informations sur le type
            return (
              <Badge 
                key={type} 
                label={typeInfo.translations[currentLanguage]}
                color={typeInfo.backgroundColor}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Card;