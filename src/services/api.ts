import axios from 'axios'

export function setupAxios() {
  const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
  })
  return api
}
