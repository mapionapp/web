<template>
  <v-card class="floating-card">
    <slot />
  </v-card>
</template>

<script>
  export default {
    name: 'floating-card'
  }
</script>

<style lang="scss" scoped>
  .floating-card {
    position: fixed;
    top: 32px;
    left: 32px;
  }
</style>