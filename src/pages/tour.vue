<template>
  <v-container>
    <v-btn :to="{name: 'index'}" rounded color="primary" depressed dark>Zurück</v-btn>
    <div class="d-flex justify-center">
      <img src="../assets/preview-gradient.png" alt="mapion" />
    </div>
    <p>Quelle: <a href="https://www.e-recht24.de">eRecht24</a></p>
  </v-container>
</template>

<script>
  export default {
    name: 'imprint-page',
  }
</script>

<style lang="scss" scoped>
  img {
    max-width: 600px;
    width: 100%;
    height: 100%;
  }
</style>
