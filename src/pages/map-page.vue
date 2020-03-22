<template>
  <div class="fill-height">
    <floating-card class="pa-1 search-bar" :class="{'elevation-24': searchFocused}">
      <v-text-field
        v-model="searchQuery"
        placeholder="Standort suchen"
        @focus="searchFocused = true"
        @blur="searchFocused = false"
        class="search-input"
        :class="{
          expanded: searchShouldExpand,
          mobile: $vuetify.breakpoint.smAndDown,
        }"
        :append-icon="searchQuery ? 'mdi-magnify' : 'mdi-crosshairs-gps'"
        @click:append="onTextFieldIconClick"
        hide-details
        solo
        flat
      />
    </floating-card>

    <gmap-map
      class="map"
      ref="map"
      :center="{lat: 50.6498903, lng: 11.0150288}"
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
  import FloatingCard from '../components/floating-card'
  import InfoBox from '../components/info-box'

  export default {
    name: 'map-page',
    components: {FloatingCard, InfoBox},
    data: () => ({
      mapLoaded: false,
      searchFocused: false,
      searchQuery: '',
      mapCenter: {lat: 50.6498903, lng: 11.0150288},
      mapZoom: 6,
      mapLocationAcquired: false,
      isInfoBoxShown: false,
    }),
    computed: {
      searchShouldExpand() {
        return this.searchFocused || this.searchQuery
      },
    },
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
      onTextFieldIconClick() {
        this.searchQuery ? this.onSearchIconClicked() : this.onCenterIconClicked()
      },
      onSearchIconClicked() {
        // TODO Query the Google places API
      },
      onCenterIconClicked() {
        const userDeniedGeolocation = this.$store.state.location !== null
        if (!userDeniedGeolocation) {
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
  @import '../style/variables';

  .search-bar {
    z-index: 1;

    .search-input {
      width: 350px;
      padding: 0;
      transition: width 400ms $animation-curve, padding 400ms $animation-curve;

      &.expanded {
        width: 450px;
        padding: 8px;
      }

      &.mobile {
        width: 100vw;
      }
    }
  }

  .fill-height {
    height: 100%;
  }

  .map {
    z-index: 0;
    width: 100%;
    height: 100%;
  }
</style>
