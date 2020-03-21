import BaseAxios from 'axios'

export const googleApiKey = 'AIzaSyDyZJW3scD0AU8qirs2cfALX9kg_ZKYxho'

const axios = BaseAxios.create({
  baseURL: process.env.VUE_APP_API_BASE,
})

const googleApiPlacesBaseUrl = 'https://maps.googleapis.com/maps/api/place'

export class Api {
  static async getPlace(placeId) {
    const { data } = await axios.get(`/v1/place/${placeId}`)
    return data
  }
  static async nearbyPlaces({
    location: { latitude, longitude },
    type,
    keyword,
  }) {
    const radius = 1500

    const { data } = await axios.get(
      `${googleApiPlacesBaseUrl}/nearbysearch/json?`,
      {
        params: {
          location: `${latitude},${longitude}`,
          radius,
          type,
          keyword,
          key: googleApiKey,
        },
      }
    )
    return data
  }
}
