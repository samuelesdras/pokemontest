import Head from 'next/head'
import { Header } from '@/components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { api } from '@/services/apiClient'
import Image from 'next/image'

import styles from './favorites.module.scss'

export default function Favorites() {
  const [favoritesList, setFavoritesList] = useState()
  const [pokemonDetails, setPokemonDetails] = useState<any>()
  const pokemonImg = pokemonDetails?.sprites.front_default

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('favorites')
      setFavoritesList(JSON.parse(item))
    }
    getPokemonsDetails()
  }, [getPokemonsDetails])

  async function getPokemonsDetails() {
    try {
      const response = await api.get(`pokemon/${favoritesList}`)
      setPokemonDetails(response.data)
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
          <div className={styles.body__container}>
            <div className={styles.body__img}>
              <Image
                src={pokemonImg}
                alt="logo"
                priority
                width={300}
                height={300}
              />
            </div>
            <div className={styles.body__details}>
              Name: {pokemonDetails?.name}
            </div>
            <div className={styles.body__details}>
              {pokemonDetails?.abilities.map(
                (detail: { ability: { name: string } }) => (
                  <div key={detail.ability.name}>
                    Ability: {detail.ability.name}
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div>Loading </div>
        )}
      </div>
    </>
  )
}
