import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Header } from '@/components/Header'
import { api } from '@/services/apiClient'
import Image from 'next/image'

import styles from './details.module.scss'
import { Form } from 'react-bootstrap'

export default function Details() {
  const { query } = useRouter()
  const [check, setCheck] = useState<boolean>()
  const [pokemon, setPokemon] = useState(query.name)
  const [pokemonDetails, setPokemonDetails] = useState<any>()
  const pokemonImg = pokemonDetails?.sprites.front_default

  var favorites: [] = JSON.parse(localStorage.getItem('favorites')) || []

  async function getPokemonsDetails() {
    try {
      const response = await api.get(`pokemon/${pokemon}`)
      setPokemonDetails(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPokemonsDetails()
  }, [])

  function handleCheck() {
    setCheck(!check)
    favorites.push(pokemon)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  return (
    <>
      <Head>
        <title>Pokemon!! Details page!</title>
      </Head>
      <div>
        <Header />
        {pokemonDetails ? (
          <div className={styles.body__container}>
            <Form.Check
              label={`This is one of my favorits!`}
              id="favoritCheck"
              checked={check}
              onClick={handleCheck}
            />
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
