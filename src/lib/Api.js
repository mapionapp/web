import BaseAxios from 'axios'

const axios = BaseAxios.create({
  baseURL: process.env.VUE_APP_API_BASE,
})

export class Api {
  static async getPlace(placeId) {
    const {data} = await axios.get(`/v1/place/${placeId}`)
    return data
  }

  static async queryTags(query) {
    const {data} = await axios.get(`/v1/tags/${query}`)
    return data
  }

  static async submitTag(comment, label) {
    const {data} = await axios.put(`/v1/tag`, {
      label,
    })
    return data
  }

  static async submitComment(placeId, comment, tags = []) {
    const {data} = await axios.put(`/v1/place/${placeId}/comment`, {
      content: comment,
      tags,
    })
    return data
  }
}
