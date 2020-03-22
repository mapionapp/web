<template>
  <v-card outlined class="pa-2">
    <div>
      <v-icon>mdi-account-circle</v-icon>
      {{ comment.author }}
    </div>

    {{ comment.text }}
  </v-card>
</template>

<script>
  export default {
    name: 'comment',
    props: ['comment'],
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
