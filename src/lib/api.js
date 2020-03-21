import BaseAxios from 'axios'

export const api = BaseAxios.create({
  baseURL: process.env.VUE_APP_API_BASE
})