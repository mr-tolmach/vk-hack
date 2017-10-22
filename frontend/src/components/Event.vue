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
        <div class="schedule">
            <div class="item">25.10</div>
            <div class="item">27.10</div>
            <div class="item">30.10</div>
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
.event .info .schedule {
    margin-top: 12px;
}

.event .info .schedule .item {
    display: inline-block;
    margin-right: 12px;
    padding: 5px 10px;
    border-radius: 2px;
    color: #FFF;
    border: 1px #fff solid;
    font-size: 0.9em;
}

.event .info .schedule .item:hover {
    background-color: #fff;
    color: #000;
}
</style>
