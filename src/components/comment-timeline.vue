<template>
  <div class="timeline-container">
    <v-timeline :dense="$vuetify.breakpoint.smAndDown" align-top>
      <v-timeline-item
        v-for="comment in comments"
        v-bind:key="comment.date"
        color="grey lighten-1"
        fill-dot
        right
        small
      >
        <comment v-bind:comment="comment" />
      </v-timeline-item>
    </v-timeline>
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
    created() {
      this.comments = this.comments.sort((c1, c2) => {
        return new Date(c2.date) - new Date(c1.date)
      })
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .timeline-container {
    width: 100%;
    height: 200px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .v-timeline {
    padding-top: 0;
  }

  .v-timeline-item {
    justify-content: flex-end;
  }

  .v-timeline-item__divider {
    min-width: 40px;
    width: 40px;
    justify-content: flex-start;
  }

  // .v-application--is-ltr .v-timeline--dense:not(.v-timeline--reverse):before {
  //   left: calc(20px - 1px);
  // }

  // .v-timeline-item__dot--small {
  //   width: 12px;
  //   height: 12px;
  // }
</style>
