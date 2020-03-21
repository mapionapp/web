<template>
  <div class="info-box-container">
    <v-card class="d-inline-block mx-auto" max-width="300">
      <v-container>
        <v-icon size="20" class="close-icon" @click="$emit('close')">
          mdi-close
        </v-icon>

        <v-card-title>Kaufland</v-card-title>
        <v-card-subtitle>Address 1</v-card-subtitle>

        <v-card-text>
          <v-row justify="start">
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
          </v-row>
        </v-card-text>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'info-box',
    props: ['title'],
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .info-box-container {
    position: absolute;
    top: 70px;
    right: 10px;

    width: 30%;
    max-height: 500px;

    z-index: 10;

    .v-card {
      width: 100%;
      height: 100%;
    }

    .v-card__title,
    .v-card__subtitle {
      padding-left: 6px;
      padding-right: 6px;
    }

    .close-icon {
      float: right;
    }
  }
</style>
