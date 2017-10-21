<template>
  <div class="event" :style="{ 'background-image': 'url(' + link + ')' }" @click="goToChoose">
      <div class="overlay"></div>
      <div class="top">
          <a href="https://google.ru"><div class="afisha"></div></a>
          <div class="star"></div>
          <div class="rating">{{rate}}</div>
      </div>
      <div class="info">
          <div class="title">
              {{name}}
          </div>
          <div class="description">
              {{description}}
          </div>
      </div>
  </div>
</template>

<script>
import { SET_EVENT } from '../common/mutation-types'

export default {
  name: 'Event',
  props: ['id', 'name', 'description', 'rate', 'link'],
  data () {
    return {}
  },
  methods: {
    goToChoose () {
      this.$store.commit(SET_EVENT, this.id)
      this.$router.push('filters')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
