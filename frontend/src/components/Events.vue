<template>
  <div class="events" v-show="isSuccess">
    <event v-for="ev in evs" :id='ev' :name='ev' :description="ev" :rate='ev' :link="ev" :key="ev"></event>
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
    this.$store.commit(SET_INFO, this.$route.query)
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
        console.log(response)
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
