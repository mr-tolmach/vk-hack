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
<style scoped>
body {
    background-color: #F0F0F0;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 18px;
    letter-spacing: 1px;
}

@font-face {
    font-family: HelveticaLight;
    src: url(../assets/fonts/HelveticaNeue-Thin.otf);
}

.event {
    background: no-repeat center;
    background-size: cover;
    padding-bottom: 35%;
    border-radius: 10px;

    color: #FFF;
    position: relative;

    margin-top: 8px;
}

.event:last-child {
    margin-bottom: 0;
}

.event .overlay {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    position: absolute;

    border-radius: 10px;
}

.event .overlay:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

.event .info {
    position: absolute;
    padding: 32px 48px;
    bottom: 0;
}

.event .info .title {
    font-size: 1.4em;
}

.event .info .description {
    margin-top: 8px;
    font-family: HelveticaLight, sans-serif;
    font-weight: 100;
    line-height: 1.1em;
}

.event .top {
    position: absolute;
    top: 0;
    right: 0;
    padding: 24px 48px;

    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
}

.event .top > div {
    margin-left: 16px;
}

.event .top .star {
    background: no-repeat center url(../assets/star.png);
    width: 20px;
    height: 20px;
    background-size: contain;
}

.event .top .afisha {
    background: no-repeat center url(../assets/afisha.png);
    width: 20px;
    height: 20px;
    background-size: contain;
}

.event .top .rating {
    font-family: HelveticaLight, sans-serif;
    font-weight: 100;
    font-size: 1.2em;
    padding-top: 5px; /* to compensate wrong font height */
}
</style>
