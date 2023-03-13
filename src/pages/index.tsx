import { Key, useEffect, useState } from 'react'
import Head from 'next/head'

import { Header } from '@/components/Header'
import { api } from '@/services/apiClient'
import { Card } from '@/components/Card'

import 'bootstrap/dist/css/bootstrap.min.css'

import styles from '../styles/home.module.scss'
import Link from 'next/link'

interface requestProps {
  name: string
  url: string
}

export default function Home() {
  const [pokemonList, setPokemonList] = useState<requestProps>()

  async function getPokemons() {
    try {
      const response = await api.get('pokemon')
      setPokemonList(response.data.results)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPokemons()
  }, [])

  return (
    <>
      <Head>
        <title>Pokemon!! The best web page!</title>
      </Head>
      <Header />
      <div className={styles.body__cards}>
        {pokemonList?.map((pokemon: { name: Key | string }) => (
          <div key={pokemon.name} className={styles.body__card}>
            <Link href={`/details/${pokemon.name}`}>
              <Card name={pokemon.name} />
              Click here for details!!
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
