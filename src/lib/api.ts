import axios from 'axios'
import { BASE_URL } from './notion/server-constants'

const get = async (url: string, isServer: boolean = false) => {
  let result = null
  if (isServer) {
    result = await axios.get(`${BASE_URL}${url}`)
  } else {
    result = await axios.get(`${url}`)
  }
  return result.data
}

export default {
  get: get,
}
