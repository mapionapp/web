import BaseAxios from 'axios'

const axios = BaseAxios.create({
  baseURL: process.env.VUE_APP_API_BASE,
})

export class Api {
  static async getPlace(placeId) {
    const { data } = await axios.get(`/v1/place/${placeId}`)
    return data
  }
}
