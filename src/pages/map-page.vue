<template>
  <div class="fill-height">
    <floating-card class="pa-1 search-bar d-flex align-center" :class="{'elevation-24': searchFocused}">
      <v-autocomplete
        v-model="searchedPlace"
        placeholder="Standort suchen"
        @focus="searchFocused = true"
        @blur="searchFocused = false"
        auto-select-first
        :items="searchItems"
        class="search-input"
        :class="{
          expanded: searchShouldExpand,
          mobile: $vuetify.breakpoint.smAndDown,
        }"
        clearable
        item-text="name"
        return-object
        :search-input.sync="searchQuery"
        :append-icon="searchQuery ? '' : 'mdi-crosshairs-gps'"
        @click:append="onTextFieldIconClick"
        hide-details
        solo
        flat
      />
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$router.push({name: 'welcome'})">
            <v-list-item-title>Welcomepage</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push({name: 'imprint'})">
            <v-list-item-title>Impressum</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push({name: 'privacy'})">
            <v-list-item-title>Datenschutz</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
      @click="onMapClick"
    >
    </gmap-map>

    <info-box v-model="isInfoBoxVisible" :place-id="$route.params.placeId" @place-updated="onPlaceUpdated" />
  </div>
</template>

<script>
  import FloatingCard from '../components/floating-card'
  import InfoBox from '../components/info-box'
  import {Api} from '../lib/Api'
  import throttle from 'lodash.throttle'

  export default {
    name: 'map-page',
    components: {FloatingCard, InfoBox},
    data: () => ({
      mapLoaded: false,
      searchFocused: false,
      searchedPlace: '',
      searchQuery: '',
      searchItems: [],
      mapCenter: {lat: 50.6498903, lng: 11.0150288},
      mapZoom: 6,
      mapLocationAcquired: false,
      isInfoBoxVisible: false,
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
      '$route.params.placeId': {
        immediate: true,
        handler(placeId) {
          this.isInfoBoxVisible = !!placeId
        },
      },
      searchQuery() {
        this.throttledLocationSearch()
      },
      searchedPlace(place) {
        this.$router.push({
          name: 'index',
          params: {
            placeId: place.placeId,
          },
        })
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
      onTextFieldEnter() {
        this.throttledLocationSearch()
      },
      onSearchIconClicked() {
        this.throttledLocationSearch()
      },
      throttledLocationSearch: throttle(async function() {
        if (this.searchQuery) {
          this.searchItems = await Api.queryPlaces(this.searchQuery.trim())
        } else {
          this.searchItems = []
        }
      }, 400),
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
      onMapClick(data) {
        if (data.placeId) {
          this.$router.push({
            name: 'index',
            params: {
              placeId: data.placeId,
            },
          })
        }
      },
      onPlaceUpdated(place) {
        this.mapCenter = place.location
        this.mapZoom = 18
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
