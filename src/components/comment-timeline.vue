<template>
  <!--v-timeline :dense="$vuetify.breakpoint.smAndDown">
    <v-timeline-item v-for="comment in comments" v-bind:key="comment.time" color="grey lighten-1" fill-dot right small>
      {{ comment.author }}
    </v-timeline-item>
  </v-timeline-->
  <div>
    <div v-for="comment in comments" v-bind:key="comment.time" class="comment-container">
      <comment v-bind:comment="comment" />
    </div>
  </div>
</template>

<script>
  import {comments} from '../mocks/timeline-comments.js'
  import Comment from './comment'

  export default {
    name: 'timeline',
    components: {Comment},
    props: [],
    data: () => ({
      comments,
    }),
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .comment-container {
    margin-bottom: 5px;
  }
</style>
