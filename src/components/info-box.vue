<template>
  <v-slide-y-transition>
    <div v-if="value" class="info-box-container" :class="{mobile: $vuetify.breakpoint.smAndDown}">
      <v-card class="d-inline-block mx-auto pa-5">
        <template v-if="!!place">
          <v-icon size="20" class="close-icon" @click="$emit('input', false)">
            mdi-close
          </v-icon>

          <h2 class="place-name">{{ place.name }}</h2>
          <div class="grey--text pb-3">{{ place.vicinity }}</div>

          <!--
          <div>
            <v-icon size="20" color="green">mdi-clock-outline</v-icon>
            Geöffnet
          </div>

          <div>
            <v-icon size="20" color="red">mdi-alert</v-icon>
            Eingeschränktes Sortiment: Wein, Klopapier
          </div>

          <div>
            <v-icon size="20" color="orange">mdi-account-multiple</v-icon>
            Auslastung: mittel
          </div>
          -->

          <template v-if="place.comments.length">
            <comment-timeline :comments="place.comments" class="py-4" />
          </template>

          <v-btn depressed color="accent" @click="createCommentDialogOpen = true">
            <v-icon left>mdi-comment-plus-outline</v-icon>
            {{ place.comments.length ? 'Kommentieren' : 'Ersten Kommentar schreiben' }}
          </v-btn>
        </template>

        <div class="overlay" v-if="loading">
          <v-progress-circular size="20" indeterminate />
        </div>
      </v-card>

      <v-dialog v-model="createCommentDialogOpen" max-width="400">
        <v-card class="pa-5">
          <v-textarea
            required
            v-model="commentMessage"
            maxlength="200"
            counter
            label="Nachricht"
            auto-grow
            rows="3"
            autofocus
          />
          <v-combobox
            v-model="commentTags"
            :items="commentTagsAvailable"
            :search-input.sync="commentTagsSearch"
            hide-selected
            :loading="commentTagsLoading"
            hint="Max. 5 Tags"
            label="Tags hinzufügen"
            multiple
            maxlength="15"
            persistent-hint
            small-chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Es wurde kein Tag "<strong>{{ commentTagsSearch }}</strong
                    >" gefunden. Drücke <kbd>Enter</kbd>, um den Tag anzulegen
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
          <v-checkbox
            required
            v-model="commentPrivacy"
            hide-details
            label="Ich habe die Datenschutzerklärung gelesen und akzeptiert"
          />

          <router-link :to="{name: 'privacy'}">Datenschutzerklärung</router-link>

          <div class="d-flex justify-end pt-5">
            <v-btn depressed color="accent" :disabled="!commentPrivacy" :loading="loading" @click="submitComment">
              Absenden
              <v-icon right>mdi-send</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </v-slide-y-transition>
</template>

<script>
  import CommentTimeline from './comment-timeline'
  import {Api} from '../lib/Api'
  import throttle from 'lodash.throttle'

  export default {
    name: 'info-box',
    components: {CommentTimeline},
    props: ['placeId', 'value'],
    data: () => ({
      place: null,
      loading: false,
      createCommentDialogOpen: false,
      commentMessage: '',
      commentPrivacy: '',
      commentTags: [],
      commentTagsLoading: false,
      commentTagsSearch: '',
      commentTagsAvailable: [],
    }),
    watch: {
      placeId: {
        immediate: true,
        handler() {
          if (this.placeId) {
            this.fetchPlace()
          }
        },
      },
      commentTagsSearch() {
        this.fetchAvailableTags()
      },
      commentTags() {
        this.commentTagsSearch = ''
      },
    },
    methods: {
      async fetchPlace() {
        this.loading = true
        this.place = await Api.getPlaceById(this.placeId)
        this.$emit('place-updated', this.place)
        this.loading = false
      },
      fetchAvailableTags: throttle(async function() {
        this.commentTagsLoading = true
        try {
          this.commentTagsAvailable = await Api.getTags(this.commentTagsSearch || '')
        } catch (e) {
          console.error(e)
        }
        this.commentTagsLoading = false
      }, 300),
      async submitComment() {
        this.loading = true
        await Api.submitComment(this.placeId, this.commentMessage, this.commentTags)
        this.createCommentDialogOpen = false
        this.commentMessage = ''
        this.commentPrivacy = false
        this.commentTagsSearch = ''
        this.commentTags = []
        this.fetchPlace()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info-box-container {
    position: absolute;
    top: 32px;
    right: 32px;
    max-height: 500px;
    max-width: 400px;

    &.mobile {
      top: auto;
      left: 0;
      bottom: 0;
      right: 0;
      max-height: 75vh;
      max-width: none;
    }

    z-index: 10;

    .v-card {
      width: 100%;
      height: 100%;
    }

    .close-icon {
      float: right;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparentize(white, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .place-name {
    line-height: 1;
  }
</style>
