import { store } from '../store'

export class GeolocationService {
  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        this._locationUpdated,
        this._errorHandler
      )
    }
  }

  _locationUpdated(position) {
    store.commit('setLocation', {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracy: position.coords.accuracy,
    })
  }

  _errorHandler(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`)
    store.commit('setLocation', null)
  }
}

// Start the service
new GeolocationService()
