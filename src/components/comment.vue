<template>
  <div>
    <div class="comment-date">{{ comment.date }}</div>
    <div>
      <v-icon>mdi-account-circle</v-icon>
      {{ comment.author }}
    </div>

    <div class="comment-text">{{ comment.text }}</div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'comment',
    props: ['comment'],
    created() {
      this.formatDates()
    },
    methods: {
      formatDates() {
        this.comment.date = moment(new Date(this.comment.date)).format('DD MMM, hh:mm')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .comment-date {
    font-size: 10px;
    font-weight: 200;
    color: #bbbbbb;
  }

  .comment-text {
    font-size: 12px;
    color: grey;
    margin: 5px 0 0 28px;
  }
</style>
