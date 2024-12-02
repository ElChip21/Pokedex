import React, { useState, useContext } from 'react'
import { Box, Typography } from '@mui/material'
import Badge from './badge'
import { LanguageContext } from '../../Common/Context/LanguageContext'

const Card = ({ types, name, image, typesData, identifier }) => {
  const { currentLanguage } = useContext(LanguageContext)

  // State pour le chargement de l'image
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoaded = () => {
    setIsLoading(false)
  }

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

        <Box sx={{ position: 'relative', width: 100, height: 100 }}>
          {isLoading && (
            <Box
              component="img"
              src="/pokeball.jpg"
              alt="loading"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 100,
                height: 100,
              }}
            />
          )}
          <Box
            component="img"
            src={image}
            onLoad={handleImageLoaded}
            alt={name}
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {types.map((type) => {
            const typeInfo = typesData[type]
            return (
              <Badge
                key={type}
                label={typeInfo.translations[currentLanguage]}
                color={typeInfo.backgroundColor}
              />
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default Card
