<template>
  <div class="event" :style="{ 'background-image': 'url(' + imageLink + ')' }" @click="goToChoose">
      <div class="overlay"></div>
      <div class="top">
        <a @click.stop="goToExternal" target="_blank"><div class="afisha"></div></a>
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
  props: ['id', 'name', 'description', 'rate', 'imageLink', 'infoLink'],
  data () {
    return {}
  },
  methods: {
    goToExternal () {
      window.top.location.href = this.infoLink
    },
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
