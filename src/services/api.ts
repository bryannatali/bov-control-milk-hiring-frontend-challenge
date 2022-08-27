import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://challenge-front-end.bovcontrol.com/v1/'
})