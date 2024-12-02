import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Card, CardContent, CardMedia, Divider, Chip, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import Badge from '../Home/components/badge'
import { LanguageContext } from '../Common/Context/LanguageContext'

const PokemonDetail = () => {
  const { id } = useParams()
  const { currentLanguage } = useContext(LanguageContext)
  const [pokemon, setPokemon] = useState(null)
  const [types, setTypes] = useState({})
  const [showMoves, setShowMoves] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Récupérer les Pokémon et les types depuis APIs
        const [pokemonResponse, typesResponse] = await Promise.all([
          fetch('https://pokedex-jgabriele.vercel.app/pokemons.json'),
          fetch('https://pokedex-jgabriele.vercel.app/types.json'),
        ])

        const pokemonData = await pokemonResponse.json()
        const typesData = await typesResponse.json()

        // Chercher le Pokémon spécifique par ID
        const foundPokemon = pokemonData.find((pokemon) => pokemon.id === parseInt(id, 10))
        setPokemon(foundPokemon)
        setTypes(typesData)
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err)
        setError('Impossible de charger les données.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id]) // La dépendance sur 'id' permet de recharger les données si l'ID change

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h4" color="primary">
          Chargement...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h4" color="error">
          {error}
        </Typography>
      </Box>
    )
  }

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
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
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
              color="default"
              size="large"
              onClick={() => setShowMoves((prev) => !prev)}
              sx={{
                textTransform: 'none',
                border: '1px solid #ff9441',
                color: '#000',
                boxShadow: 'none',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                backgroundColor: showMoves
                  ? pokemon.types.length > 0
                    ? types[pokemon.types[0]]?.backgroundColor || '#f1f1f1' // Prendre seulement le premier type
                    : '#f1f1f1'
                  : '#f1f1f1',
              }}
            >
              {showMoves ? 'CACHER LES MOVES' : 'VOIR LES MOVES'}
            </Button>
          </Box>

          {showMoves && ( // Afficher les mouvements si showMoves est true
            <Box mt={3}>
              <Typography variant="h6" color="text.primary" align="center" gutterBottom>
                Moves :
              </Typography>
              <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
                {pokemon.moves.map((move, index) => (
                  <Chip key={index} label={move} color="default" sx={{ margin: '4px' }} />
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
