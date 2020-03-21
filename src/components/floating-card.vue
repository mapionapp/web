<template>
  <v-card class="floating-card" :class="{mobile: $vuetify.breakpoint.smAndDown}">
    <slot />
  </v-card>
</template>

<script>
  export default {
    name: 'floating-card',
  }
</script>

<style lang="scss" scoped>
  .floating-card {
    position: fixed;
    top: 32px;
    left: 32px;

    &.mobile {
      top: 0;
      left: 0;
    }
  }
</style>
