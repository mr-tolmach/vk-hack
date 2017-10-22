<template>
  <div>
    <div class="content">
      <input class="search" type="text" placeholder="Поиск по событиям"/>
    </div>
    <div class="events" v-show="isSuccess">
      <event v-for="ev in evs" 
        :id='ev.eventId' 
        :name='ev.eventName' 
        :description="ev.description" 
        :rate='ev.rating' 
        :imageLink="ev.mainPhoto"
        :infoLink='ev.widgetDescription'
        :key="ev.eventId"></event>
    </div>
  </div>
</template>

<script>
import Event from './Event.vue'
import GlobalStatus from '../common/global-status'
import { SET_INFO } from '../common/mutation-types'
import { HTTP } from '../http/common'

export default {
  components: { Event },
  name: 'Events',
  data () {
    return {
      loadingStatus: GlobalStatus.Trying,
      evs: []
    }
  },
  mounted () {
    let params = this.$route.query
    this.$store.commit(SET_INFO, params)
    console.log(params)
    this.loadEvents()
  },
  computed: {
    isTrying () {
      return this.loadingStatus === GlobalStatus.Trying
    },
    isSuccess () {
      return this.loadingStatus === GlobalStatus.Success
    },
    isFailed () {
      return this.loadingStatus === GlobalStatus.Failed
    }
  },
  methods: {
    loadEvents () {
      HTTP.get('/events/')
      .then(response => {
        console.log(response.data.result)
        this.evs = response.data.result
          .filter(e => e.mainPhoto && e.mainPhoto !== '')
          .slice(0, 10)
          .sort((l, r) => {
            if (l.rating < r.rating) return 1
            if (l.rating > r.rating) return -1
            return 0
          })
        this.loadingStatus = GlobalStatus.Success
      })
      .catch(response => {
        console.log(response)
        this.loadingStatus = GlobalStatus.Success
      })
    }
  }
}
</script>

<style scoped>
.content {
    background-color: #FFFFFF;
    box-shadow: 0 0 1px rgba(0,0,0,0.3);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
}
.search {
    padding: 15px 10px 15px 36px;
    height: 48px;
    background: url(../assets/events/search.png) no-repeat;
    background-size: 14px 16px;
    background-position: 14px 16px;

    /*border-left: 15px solid transparent;*/
    border: none;
    font-size: 0.8em;
    color: #000;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    line-height: 18px;
    outline: none;
    box-shadow: none;
}
</style>
