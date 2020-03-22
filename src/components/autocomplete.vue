<template>
  <floating-card
    class="pa-1 search-bar"
    :class="{ 'elevation-24': searchFocused }"
  >
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      :append-icon="icon"
      :label="label"
      :class="{
        expanded: searchShouldExpand,
        mobile: $vuetify.breakpoint.smAndDown,
      }"
      @input="onInput"
      @keyup="onKeyUp"
      @click:append="onIconClick"
      @focus="searchFocused = true"
      @blur="searchFocused = false"
      class="mx-4 search-input"
      cache-items
      flat
      hide-no-data
      hide-details
      solo-inverted
    ></v-autocomplete>
  </floating-card>
</template>

<script>
  // TODO Try search function as an input
  export default {
    name: 'info-box',
    props: ['label', 'suggestions', 'isLoading', 'icon'],
    data() {
      return {
        searchFocused: false,
        items: [], // can be {text, value}
        loading: false,
        search: null,
        select: null,
      }
    },
    computed: {
      searchShouldExpand() {
        return this.searchFocused || this.searchQuery
      },
    },
    watch: {
      search(val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
    methods: {
      querySelections(v) {
        this.loading = true
        this.items = this.suggestions.filter(
          e => (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        )
      },
      onInput(e) {
        this.$emit('suggestionSelected', e)
      },
      onKeyUp() {
        this.$emit('searchChanged', this.search)
      },
      onIconClick() {
        this.$emit('iconClicked', this.icon)
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
</style>
