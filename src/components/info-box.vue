<template>
  <v-slide-y-transition>
    <div v-if="value" class="info-box-container">
      <v-card class="d-inline-block mx-auto pa-5" max-width="300">
        <v-icon size="20" class="close-icon" @click="$emit('input', false)">
          mdi-close
        </v-icon>

        <h2>Kaufland</h2>
        <div class="grey--text pb-3">Address 1</div>

        <div>
          <v-icon size="20" color="green">mdi-clock-outline</v-icon>
          Geöffnet
        </div>

        <div>
          <v-icon size="20" color="red">mdi-alert</v-icon>
          Eingeschränktes Sortiment: Wein, Klopapier
        </div>

        <div>
          <v-icon size="20" color="orange">mdi-account-multiple</v-icon>
          Auslastung: mittel
        </div>
      </v-card>
    </div>
  </v-slide-y-transition>
</template>

<script>
  export default {
    name: 'info-box',
    props: ['title', 'value', 'placeId'],
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .info-box-container {
    position: absolute;
    top: 32px;
    right: 32px;
    max-height: 500px;

    z-index: 10;

    .v-card {
      width: 100%;
      height: 100%;
    }

    .close-icon {
      float: right;
    }
  }
</style>