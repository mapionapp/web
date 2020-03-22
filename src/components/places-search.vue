<template>
  <floating-card class="pa-1 search-bar" :class="{'elevation-24': searchFocused}">
    <v-autocomplete
      v-model="select"
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

  export default {
    name: 'info-box',
    components: {FloatingCard},
    data() {
      return {
        isLoading: false,
        searchFocused: false,
        suggestions: [], // can be {text, value}
        loading: false,
        search: null,
        select: null,
      }
    },
    computed: {
      searchShouldExpand() {
        return this.searchFocused || this.search
      },
    },
    watch: {
      search(v) {
        v && v !== this.select && this.updateSuggestions(v) // TODO Check if select === search should be prevented elsewhere
      },
      select(v) {
        console.log(v)
      },
    },
    methods: {
      async updateSuggestions(v) {
        if (!v.trim()) {
          return
        }
        this.loading = true
        const response = await Api.getPlaceSuggestions(v.trim())
        this.suggestions = response.map(suggestion => ({
          text: suggestion.name,
          value: suggestion,
        }))
        console.log(this.suggestions)
        this.loading = false
      },
      onIconClick() {
        this.search ? this.onSearchIconClicked() : this.onCenterIconClicked()
      },
      async onSearchIconClicked() {
        await this.updateSuggestions()
        this.select = this.suggestions.length > 0 ? this.suggestions[0] : null
        // TODO Update store?
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
      margin: 0 !important;
      transition: transform 400ms;

      &.expanded {
        // transform: scale(1.1);
        // transform-origin: top left;
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
