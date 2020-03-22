<template>
  <div class="fill-height">
    <places-search></places-search>

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
  import PlacesSearch from '../components/places-search'

  export default {
    name: 'map-page',
    components: { InfoBox, PlacesSearch },
    data: () => ({
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
