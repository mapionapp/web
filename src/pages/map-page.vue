<template>
  <div class="fill-height">
    <floating-card class="pa-1 search-bar" :class="{'elevation-24': searchFocused}">
      <v-text-field
        v-model="searchQuery"
        placeholder="Standort suchen"
        @focus="searchFocused = true"
        @blur="searchFocused = false"
        class="search-input"
        :class="{expanded: searchShouldExpand}"
        :append-icon="searchQuery ? 'mdi-magnify' : 'mdi-crosshairs-gps'"
        hide-details
        solo
        flat
      />
    </floating-card>

    <gmap-map
      class="map"
      :center="mapCenter"
      :zoom="mapZoom"
      :options="{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }"
    >

    </gmap-map>
  </div>
</template>

<script>
  import FloatingCard from '../components/floating-card'
  export default {
    name: 'map-page',
    components: {FloatingCard},
    data: () => ({
      searchFocused: false,
      searchQuery: '',
      mapCenter: {lat: 50.6498903, lng: 11.0150288},
      mapZoom: 6,
      mapLocationAcquired: false,
    }),
    computed: {
      searchShouldExpand() {
        return this.searchFocused || this.searchQuery
      }
    },
    watch: {
      '$store.state.location': {
        immediate: true,
        handler(location) {
          if (location !== null && !this.mapLocationAcquired) {
            this.mapLocationAcquired = true
            this.mapCenter = location
            this.mapZoom = location.accuracy < 500
              ? 12
              : 10
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/variables";

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
    }
  }

  .map {
    z-index: 0;
    width: 100%;
    height: 100%;
  }
</style>