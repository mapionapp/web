<template>
  <v-container>
    <div class="d-flex justify-center">
      <img src="../assets/preview-gradient.png" alt="mapion" />
    </div>
    <router-link to="/">
      <v-btn @click="to = '/'" rounded color="primary" depressed dark>Zurück</v-btn>
    </router-link>
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
  }
</style>
