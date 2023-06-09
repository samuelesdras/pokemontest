import Image from 'next/image'
import { useEffect, useState } from 'react'
import { api } from '@/services/apiClient'
import styles from './card.module.scss'

interface cardProps {
  name: string | number
}
//receving the name of the pokemon, which dont repeat, I took all info needed
export function Card({ name }: cardProps) {
  const [pokemonDetails, setPokemonDetails] = useState<any>()
  const pokemonImg = pokemonDetails?.sprites.front_default

  async function getPokemonsDetails() {
    try {
      const response = await api.get(`pokemon/${name}`)
      setPokemonDetails(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getPokemonsDetails()
  }, [pokemonImg])
  //Image from next has better performance rendering pictures
  return (
    <div className={styles.container}>
      {pokemonImg ? (
        <Image src={pokemonImg} alt="Pokemon image" width={150} height={150} />
      ) : (
        <div>Loading...</div>
      )}
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
    </div>
  )
}
