<template>
  <div class="timeline-container">
    <div v-for="(comment, index) in comments" :key="index" class="comment-container">
      <div class="timeline-decor pr-2">
        <v-avatar color="primary" size="32">
          <v-icon dark size="18">mdi-comment-outline</v-icon>
        </v-avatar>
        <div class="timeline-line" />
      </div>
      <comment :comment="comment" class="comment" />
    </div>
  </div>
</template>

<script>
  import Comment from './comment'

  export default {
    name: 'comment-timeline',
    components: {Comment},
    props: {
      comments: {
        type: Array,
        default: () => [],
      },
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .timeline-container {
    width: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .comment-container {
      display: flex;

      .timeline-decor {
        display: flex;
        flex-direction: column;
        align-items: center;

        .timeline-line {
          width: 2px;
          background-color: #dfdfdf;
          flex-grow: 1;
        }
      }

      &:last-of-type {
        .timeline-line {
          display: none;
        }

        .comment {
          margin-bottom: 0;
        }
      }

      .comment {
        flex-grow: 1;
        margin-bottom: 8px;
      }
    }
  }
</style>
