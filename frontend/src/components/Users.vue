<template>
  <div class="users" v-show="isSuccess">
    <user v-for="ev in evs" 
      :id='ev' 
      :name='ev' 
      :description="ev" 
      :similar='ev' 
      :imageLink='ev' 
      :key="ev">    
    </user>
  </div>
</template>

<script>
import User from './User.vue'
import GlobalStatus from '../common/global-status'
import { HTTP } from '../http/common'

export default {
  components: { User },
  name: 'Users',
  data () {
    return {
      loadingStatus: GlobalStatus.Trying,
      evs: ['a', 'b', 'c']
    }
  },
  mounted () {
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
      HTTP.get('/users/')
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
