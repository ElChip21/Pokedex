import React, { useState } from 'react'
import { Box, Typography, Card, CardContent, CardMedia, Divider, Chip, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import Badge from '../Home/components/badge'
import { useLocalContext } from '../Common/Context/LocalContext'
import pokemons from '../Common/pokemons.json'
import types from '../Common/types.json'

const PokemonDetail = () => {
  const { id } = useParams()
  const { currentLanguage } = useLocalContext()
  const [showMoves, setShowMoves] = useState(false)

  const pokemon = pokemons.find((pokemon) => pokemon.id === parseInt(id, 10))

  if (!pokemon) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h4" color="error">
          Pokémon non trouvé
        </Typography>
      </Box>
    )
  }

  const formatHeight = (height) => {
    if (!height || isNaN(height)) return 'Taille inconnue'
    const heightString = height.toString()
    return heightString.length === 1
      ? `0.${heightString}m`
      : `${heightString[0]}.${heightString.slice(1)}m`
  }

  const formatWeight = (weight) => {
    if (!weight || isNaN(weight)) return 'Poids inconnu'
    const formattedWeight = (weight / 10).toFixed(1)
    return `${formattedWeight} kg`
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ width: 650, boxShadow: 3, borderRadius: 5 }}>
        <CardMedia
          component="img"
          image={pokemon.image}
          alt={pokemon.names[currentLanguage]}
          sx={{
            height: 300,
            objectFit: 'contain',
            backgroundColor: '#f1f1f1',
            borderBottom: '1px solid #e0e0e0',
          }}
        />
        <CardContent>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            {pokemon.names[currentLanguage]}{' '}
            <Chip label={`#${id}`} color="secondary" size="small" />
          </Typography>

          <Divider variant="middle" sx={{ my: 2 }} />

          <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap">
            {pokemon.types.map((type) => {
              const typeInfo = types[type]
              if (typeInfo) {
                return (
                  <Badge
                    key={type}
                    label={typeInfo.translations[currentLanguage]}
                    color={typeInfo.backgroundColor}
                  />
                )
              }
              return null
            })}
          </Box>

          <Divider variant="middle" sx={{ my: 2 }} />

          <Box>
            <Typography variant="h6" color="textSecondary" align="center" mt={2}>
              {formatHeight(pokemon.height)} - {formatWeight(pokemon.weight)}
            </Typography>
          </Box>

          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setShowMoves((prev) => !prev)}
              sx={{
                textTransform: 'none',
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
              }}
            >
              {showMoves ? 'Cacher les Moves' : 'Voir les Moves'}
            </Button>
          </Box>

          {showMoves && ( // Afficher les mouvements si showMoves est true
            <Box mt={3}>
              <Typography variant="h6" color="text.primary" align="center" gutterBottom>
                Moves :
              </Typography>
              <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
                {pokemon.moves.map((move, index) => (
                  <Chip
                    key={index}
                    label={move}
                    color="default"
                    sx={{ margin: '4px' }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default PokemonDetail
