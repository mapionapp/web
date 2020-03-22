<template>
  <div>
    <div class="comment-date">{{ comment.date }}</div>
    <div>
      {{ comment.content }}
    </div>
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
        this.comment.date = moment(this.comment.createdAt).format('DD MMM, hh:mm')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .comment-date {
    font-size: 10px;
    font-weight: 400;
    color: #8e8e8e;
  }
</style>
