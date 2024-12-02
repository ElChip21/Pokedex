import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Card from '../card'
import { LanguageContext } from '../../../Common/Context/LanguageContext'

const ListPokemon = ({ filteredPokemons }) => {
  const { currentLanguage } = useContext(LanguageContext)

  const [types, setTypes] = useState([]) // État pour stocker les types
  const [loading, setLoading] = useState(true) // État pour gérer le chargement
  const [error, setError] = useState(null) // État pour gérer les erreurs de fetch

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('https://pokedex-jgabriele.vercel.app/types.json')
        if (!response.ok) {
          throw new Error('Erreur de chargement des types')
        }
        const data = await response.json()
        setTypes(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTypes()
  }, []) // Appel seulement au chargement du composant

  if (loading) return <Typography>Chargement des types...</Typography>
  if (error) return <Typography>Erreur : {error}</Typography>

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {filteredPokemons.map((pokemon) => {
        // Formater l'index
        const formattedIndex = `No.${pokemon.id.toString().padStart(3, '0')}`

        return (
          <Box
            key={pokemon.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none' }}>
              <Card
                types={pokemon.types}
                name={pokemon.names[currentLanguage]}
                image={pokemon.image}
                typesData={types} // Passer les données types récupérées à Card
                currentLanguage={currentLanguage}
                identifier={formattedIndex}
              />
            </Link>
          </Box>
        )
      })}
    </Box>
  )
}

export default ListPokemon
