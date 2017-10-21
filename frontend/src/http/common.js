import axios from 'axios'

var instance = axios.create({
  baseURL: 'https://178.132.206.114/api',
  timeout: 3000
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const HTTP = instance
