import Head from 'next/head'
import { Header } from '@/components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Key, useEffect, useState } from 'react'

import styles from './favorites.module.scss'
import { Card } from '@/components/Card'

export default function Favorites() {
  const [favoritesList, setFavoritesList] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('favorites')
      setFavoritesList(JSON.parse(item))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Pokemon!! Favorites page!</title>
      </Head>
      <div>
        <Header />
        <div className={styles.body_header}>
          List of your favorites Pokemons!
        </div>
        <div className={styles.body__cards}>
          {favoritesList ? (
            favoritesList?.map((favorite: Key | string) => (
              <div key={favorite}>
                <Card name={favorite} />
              </div>
            ))
          ) : (
            <div>There is no Pokemons on your favorites list </div>
          )}
        </div>
      </div>
    </>
  )
}
