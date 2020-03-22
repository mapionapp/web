import BaseAxios from 'axios'

const axios = BaseAxios.create({
  baseURL: process.env.VUE_APP_API_BASE,
})

export class Api {
  static async getPlaceById(placeId) {
    const { data } = await axios.get(`/v1/place/${placeId}`)
    return data
  }
  static async getPlaceByLocation({ location: { latitude, longitude } }) {
    const { data } = await axios.get(`/v1/place/${latitude}/${longitude}`)
    return data
  }
  static async getInVicinity({ location: { latitude, longitude } }) {
    const radius = 1500
    const { data } = await axios.get(
      `/v1/vicinity/${latitude}/${longitude}/${radius}`
    )
    return data
  }

  /**
   * @param {string} query
   * @returns {Promise<Array<{name: string, placeId: string, commentsCount: 0}>>}
   */
  static async getPlaceSuggestions(query) {
    const { data } = await axios.get(`/v1/autocomplete/${query}`)
    return data
  }
  static async getTags(query) {
    const { data } = await axios.get(`/v1/tags/${query}`)
    return data
  }
}

// 1. User öffnet App zum ersten Mal -> Wir nehmen seine Location vom Browser und schicken die Location mit Radius an unser Backend. Die geben uns nearby places zurück. Das gleiche machen wir jedes Mal, wenn der User scrollt (debounced).
// 2. Wir suchen einen String im Suchfeld: Wir schicken den String ans Backend (wahrscheinlich zsm. mit Location). Die returnen ein Object mit name, placeId, location, savedInOurSystem
//     -> Wenn der User einen dieser autocomplete Vorschläge auswählt, zoomen wir zur neuen location und schicken die placeId an den Endpoint für mehr Informationen (den gibt es bereits, siehe backend.readme.md)
//
// Für 1,2 bauen sie jetzt 2 neue Endpoints
