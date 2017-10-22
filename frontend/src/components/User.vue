<template>
  <transition name="fade">
    <div class="user" v-if='isChecked'>
      <div class="image" :style="{ 'background-image': 'url(' + imageLink + ')' }"></div>
      <div class="info">
        <div class="name">
            {{firstName}}
        </div>
        <div class="description">
            {{description}}
        </div>
        <div class="similar" v-show="similar != null">
            {{formatedSimilar}}
        </div>
        <div class="actions">
            <div class="button" @click='accept'>Позвать</div>
            <div class="button light" @click='skip'>Скрыть</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { HTTP } from '../http/common'
import { mapState } from 'vuex'

export default {
  name: 'User',
  props: ['id', 'firstName', 'description', 'similar', 'imageLink'],
  data () {
    return {
      isChecked: true
    }
  },
  computed: {
    formatedSimilar () {
      if (this.similar != null && this.similar.length !== 0) {
        return 'Тоже собирался на «' + this.similar[0].eventName + '»'
      }
      return null
    },
    ...mapState(['info', 'event'])
  },
  methods: {
    accept () {
      console.log('target', this.id)
      console.log('info', this.info)
      HTTP.post('/addLike', {
        currentUserId: this.info.viewer_id,
        currenUserAccessToken: this.info.access_token,
        targetUserId: this.id,
        eventId: this.event
      })
      .then(response => { console.log(response) })
      .catch(response => { console.log(response) })
      this.isChecked = false
    },
    skip () {
      HTTP.post('/addSkip', {
        currentUserId: this.info.viewer_id,
        currenUserAccessToken: this.info.access_token,
        targetUserId: this.id,
        eventId: this.event
      })
      .catch(response => { console.log(response) })
      this.isChecked = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
    font-size: 14px !important;
}

.user {
    background-color: #FFFFFF;
    box-shadow: 0 1px 1px rgba(0,0,0,0.3);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
}

.user:last-child {
    margin-bottom: 0;
}

.user .image {
    background: no-repeat center;
    background-size: cover;
    float: left;
    width: 175px;
    height: 175px;
}

.user .info {
    float: left;
    position: relative;
    height: 175px;
    box-sizing: border-box;
    padding: 16px 24px;

    width: calc(100% - 175px);
}

.user .info .name {
    font-size: 1.4em;
    color: #040404;
    margin-bottom: 8px;
}

.user .info .description {
    color: #c4c4c4;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 8px;
}

.user .info .similar {
    color: #4D8A08;
    padding: 2px 0 2px 26px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background: url(../assets/users/green_star.png) no-repeat left;
    background-size: contain;
}

.user .info .actions {
    position: absolute;
    bottom: 0;
    padding: 16px 0;
}

.user .info .actions .button {
    display: inline-block;
    border-radius: 2px;

    font-weight: 400;
    padding: 10px 24px;
    line-height: 15px;
    text-align: center;
    background-color: #5e81a8;
    color: #fff;
    box-sizing: border-box;

    cursor: pointer;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.user .info .actions .button:hover {
    background-color: #6888ad;
}

.user .info .actions .button:active {
    background-color: #5779a1;
    /*padding: 11px 24px 9px;*/
}

.user .info .actions .button.light {
    background-color: #dae2ea;
    color: #55677d;
}

.user .info .actions .button.light:hover {
    background-color: #dfe6ed;
}

.user .info .actions .button.light:active {
    background-color: #dae2ea;
}

.clear {
    clear: both;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
