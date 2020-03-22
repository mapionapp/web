<template>
  <floating-card class="pa-1 search-bar" :class="{'elevation-24': searchFocused}">
    <v-autocomplete
      v-model="selectedSuggestion"
      :search-input.sync="search"
      :loading="loading"
      :items="suggestions"
      :append-icon="search ? 'mdi-magnify' : 'mdi-crosshairs-gps'"
      :class="{
        expanded: searchShouldExpand,
        mobile: $vuetify.breakpoint.smAndDown,
      }"
      @click:append="onIconClick"
      @focus="searchFocused = true"
      @blur="searchFocused = false"
      class="mx-4 autocomplete"
      label="Standort suchen"
      cache-items
      flat
      hide-no-data
      hide-details
      solo
    ></v-autocomplete>
  </floating-card>
</template>

<script>
  import FloatingCard from '../components/floating-card'
  import {Api} from '../lib/Api'
  import throttle from 'lodash.throttle'

  export default {
    name: 'places-search',
    components: {FloatingCard},
    data() {
      return {
        suggestions: [],
        selectedSuggestion: null,
        searchFocused: false,
        loading: false,
        search: null,
      }
    },
    computed: {
      searchShouldExpand() {
        return this.searchFocused || this.search
      },
    },
    watch: {
      search(search) {
        search && this.updateSuggestions(search)
      },
      selectedSuggestion(selectedSuggestion) {
        this.$store.commit('setSelectedPlace', selectedSuggestion)
      },
    },
    methods: {
      updateSuggestions: throttle(async function(search) {
        if (!search.trim() || (this.selectedSuggestion && this.selectedSuggestion.text === search)) {
          return
        }
        this.loading = true
        const response = await Api.getPlaceSuggestions(search.trim())
        this.suggestions = response.map(suggestion => ({
          text: suggestion.name,
          value: suggestion,
        }))
        this.loading = false
      }, 50),
      onIconClick() {
        this.search ? this.onSearchIconClicked() : this.onCenterIconClicked()
      },
      async onSearchIconClicked() {
        await this.updateSuggestions(this.search)
        if (this.suggestions.length > 0) {
          this.selectedSuggestion = this.suggestions[0]
          this.$store.commit('setSelectedPlace', this.selectedSuggestion)
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

<style lang="scss">
  @import '../style/variables';

  .search-bar {
    z-index: 1;

    .autocomplete {
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

      &.v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
        -webkit-transform: none !important;
        transform: none !important;
      }
    }
  }
</style>
