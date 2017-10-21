import axios from 'axios'

var instance = axios.create({
  baseURL: 'google.com',
  timeout: 3000
})

export const HTTP = instance
