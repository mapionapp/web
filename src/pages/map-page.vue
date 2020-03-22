<template>
  <div class="fill-height">
    <autocomplete
      :icon="searchQuery ? 'mdi-magnify' : 'mdi-crosshairs-gps'"
      :isLoading="autocompleteIsLoading"
      :suggestions="autocompleteSuggestions"
      @suggestionSelected="onAutocompleteSuggestionSelected"
      @searchChanged="onAutocompleteSearchChanged"
      @iconClicked="onAutocompleteIconClicked"
      label="Standort suchen"
    ></autocomplete>

    <gmap-map
      class="map"
      ref="map"
      :center="{ lat: 50.6498903, lng: 11.0150288 }"
      :zoom="mapZoom"
      :options="{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }"
      @click="isInfoBoxShown = true"
    >
    </gmap-map>

    <info-box v-model="isInfoBoxShown" />
  </div>
</template>

<script>
  import InfoBox from '../components/info-box'
  import Autocomplete from '../components/autocomplete'

  export default {
    name: 'map-page',
    components: { InfoBox, Autocomplete },
    data: () => ({
      autocompleteIsLoading: false,
      autocompleteSuggestions: [],
      mapLoaded: false,
      mapCenter: { lat: 50.6498903, lng: 11.0150288 },
      mapZoom: 6,
      mapLocationAcquired: false,
      isInfoBoxShown: false,
    }),
    watch: {
      '$store.state.location': {
        immediate: true,
        handler(location) {
          if (location !== null && !this.mapLocationAcquired) {
            this.mapLocationAcquired = true
            this.mapCenter = location
            this.mapZoom = location.accuracy < 500 ? 12 : 10
            this.updateMap()
          }
        },
      },
    },
    async mounted() {
      this.map = await this.$refs.map.$mapPromise
      this.mapLoaded = true
      this.updateMap()
    },
    methods: {
      updateMap() {
        if (!this.mapLoaded) return
        this.map.panTo(this.mapCenter)
        this.map.setZoom(this.mapZoom)
      },
      onAutocompleteSuggestionSelected(e) {
        console.log(e)
      },
      onAutocompleteIconClicked() {
        this.searchQuery
          ? this.onSearchIconClicked()
          : this.onCenterIconClicked()
      },
      onAutocompleteSearchChanged(e) {
        console.log(e)
      },
      onSearchIconClicked() {
        // TODO Select the first suggestion
        this.searchForQuery()
      },
      async searchForQuery() {
        const search = this.searchQuery.trim()
        if (search) {
          // TODO Call Api -> Don't allow arbitrary searches, only if a suggestion was selected
        }
      },
      onCenterIconClicked() {
        const userAllowedGeolocation = this.$store.state.location !== null
        if (userAllowedGeolocation) {
          this.centerLocation()
        } else {
          // TODO Not possible to prompt user for his location a second time, need to show a tutorial
        }
      },
      centerLocation() {
        this.mapCenter = this.$store.state.location
        this.mapZoom = this.$store.state.location.accuracy < 500 ? 12 : 10
        this.updateMap()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fill-height {
    height: 100%;
  }

  .map {
    z-index: 0;
    width: 100%;
    height: 100%;
  }
</style>
