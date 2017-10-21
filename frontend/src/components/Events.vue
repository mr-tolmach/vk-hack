<template>
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
      evs: ['a', 'b', 'c']
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
        this.evs = response.data.result.filter(e => e.mainPhoto && e.mainPhoto !== '').slice(0, 10)
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
</style>
