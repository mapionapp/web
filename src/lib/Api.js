import BaseAxios from 'axios'

const axios = BaseAxios.create({
  baseURL: process.env.VUE_APP_API_BASE,
})

export class Api {
  /**
   * @param placeId
   * @returns {Promise<{
   *  id: string,
   *  placeId: string,
   *  name: string,
   *  placeType: string[],
   *  location: { lat: number, lng: number},
   *  icon: string,
   *  googleUrl: string,
   *  vicinity: string,
   *  comments: Array<{ id: string content: string}>,
   *  tags: Array<{ id: string, tag: string}>,
   *  createdAt: string
   * }>}
   */
  static async getPlaceById(placeId) {
    const {data} = await axios.get(`/v1/place/${placeId}`)
    return data
  }

  /**
   * Has a default radius of 50m
   * @param {number} latitude
   * @param {number} longitude
   * @returns {Promise<Array<{
   *  id: string,
   *  placeId: string,
   *  name: string,
   *  placeType: string[],
   *  location: { lat: number, lng: number},
   *  icon: string,
   *  googleUrl: string,
   *  vicinity: string,
   *  comments: Array<{ id: string, content: string}>,
   *  tags: Array<{ id: string, tag: string}>,
   *  createdAt: string
   * }>>}
   */
  static async getPlacesWithDetails(latitude, longitude) {
    const {data} = await axios.get(`/v1/places/${latitude}/${longitude}`)
    return data
  }

  /**
   * @param latitude
   * @param longitude
   * @returns {Promise<Array<{
   *  id: string
   *  placeId: string
   *  name: string
   *  placeType: string[]
   *  location: {lat: number,lng: number}
   *  commentsCount: number
   * }>>}
   */
  static async getPlacesWithBasics(latitude, longitude, radius = 1500) {
    const {data} = await axios.get(`/v1/vicinity/${latitude}/${longitude}/${radius}`)
    return data
  }

  /**
   * @param {string} query
   * @returns {Promise<Array<{
   *  name: string,
   *  placeId: string,
   *  commentsCount: 0
   * }>>}
   */
  static async getPlaceSuggestions(query) {
    const {data} = await axios.get(`/v1/autocomplete/${query}`)
    return data
  }

  /**
   *
   * @param query
   * @returns {Promise<Array<{
   *  id: string,
   *  label: string
   * }>>}
   */
  static async getTags(query) {
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
