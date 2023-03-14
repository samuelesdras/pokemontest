import { Key, useEffect, useState } from 'react'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { api } from '@/services/apiClient'
import { Card } from '@/components/Card'

import 'bootstrap/dist/css/bootstrap.min.css'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import styles from '../styles/home.module.scss'
import Link from 'next/link'

export default function Home() {
  const [pokemonList, setPokemonList] = useState<string | Key>()
  const [page, setPage] = useState<number>(0)

  async function getPokemons() {
    try {
      const response = await api.get(`pokemon/?limit=9&offset=${page}`)
      setPokemonList(response.data.results)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPokemons()
  }, [page])

  function advancePage() {
    setPage(page + 9)
  }

  function backPage() {
    setPage(page - 9)
  }

  return (
    <>
      <Head>
        <title>Pokemon!! The best web page!</title>
      </Head>
      <Header />
      <div className={styles.body__navbar}>
        {page > 0 && <BsChevronLeft size={35} onClick={backPage} />}
        <BsChevronRight size={35} onClick={advancePage} />
      </div>
      <div className={styles.body__cards}>
        {pokemonList?.map((pokemon: { name: Key | string }) => (
          <div key={pokemon.name} className={styles.body__card}>
            <Link
              className={styles['body__card--links']}
              href={`/details/${pokemon.name}`}
            >
              <Card name={pokemon.name} />
              Click here for details!!
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
