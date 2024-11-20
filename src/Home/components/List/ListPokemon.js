import React from 'react'
import { Box, Typography } from '@mui/material'
import types from '../../../Common/types.json'
import { Link } from 'react-router-dom'
import Card from '../card'
import { useLocalContext } from '../../../Common/Context/LocalContext'

const ListPokemon = ({ filteredPokemons }) => {
  const { currentLanguage } = useLocalContext()

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
                typesData={types}
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
