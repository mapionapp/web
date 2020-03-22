<template>
  <div>
    <div class="comment-date">{{ comment.date }}</div>
    <div>
      {{ comment.content }}
    </div>
    <v-chip-group>
      <v-chip x-small v-for="tag in comment.tags" :key="tag" class="my-0">{{ tag }}</v-chip>
    </v-chip-group>
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
