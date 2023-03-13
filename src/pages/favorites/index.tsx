import Head from 'next/head'
import { Header } from '@/components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { api } from '@/services/apiClient'

import styles from './favorites.module.scss'
import { Card } from '@/components/Card'

export default function Favorites() {
  const [favoritesList, setFavoritesList] = useState()
  const [pokemonDetails, setPokemonDetails] = useState<any>()
  const [currentPokemon, setCurrentPokemon] = useState()
  const pokemonImg = pokemonDetails?.sprites.front_default
  var favorites: [] = JSON.parse(localStorage.getItem('favorites')) || []
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('favorites')
      setFavoritesList(JSON.parse(item))
    }
    getPokemonsDetails()
  }, [getPokemonsDetails])

  async function getPokemonsDetails() {
    const response = await api.get(`pokemon/${favoritesList[3]}`)
    setPokemonDetails(response.data)
    try {
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Pokemon!! Favorites page!</title>
      </Head>
      <div>
        <Header />
        {pokemonDetails ? (
          <>
            {favoritesList?.map(favorite => (
              <div key={favorite}>
                <Card name={favorite} />
              </div>
            ))}
          </>
        ) : (
          <div>Loading </div>
        )}
      </div>
    </>
  )
}
