<template>
  <div>
    <div>
      <v-icon>mdi-account-circle</v-icon>
      {{ comment.author }}
    </div>

    <div class="comment-text">{{ comment.text }}</div>
  </div>
</template>

<script>
  export default {
    name: 'comment',
    props: ['comment'],
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .comment-text {
    font-size: 12px;
    color: grey;
    margin: 5px 0 0 28px;
  }
</style>
