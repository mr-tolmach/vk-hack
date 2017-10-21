<template>
  <div id="pzdc">
    <div class="content">
        <div class="header">
          <router-link to="/filters">
            <div class="back">
                Фильтры
            </div>
          </router-link>
          <div class="title">Люди</div>
        </div>
    </div>
    <div class="users" v-show="isSuccess">
      <user v-for="ev in evs" 
        :id='ev.uid' 
        :name='ev.name' 
        :description="ev.city_name + ' • ' + ev.occupation.name" 
        :similar='ev' 
        :imageLink='ev.photo' 
        :key="ev.uid">    
      </user>
    </div>
  </div>
</template>

<script>
import User from './User.vue'
import GlobalStatus from '../common/global-status'
import { HTTP } from '../http/common'
import { mapState } from 'vuex'

export default {
  components: { User },
  name: 'Users',
  data () {
    return {
      loadingStatus: GlobalStatus.Trying,
      evs: []
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
    },
    ...mapState(['event', 'filters', 'info'])
  },
  methods: {
    loadEvents () {
      console.log(this.info.access_token)
      console.log(this.event)
      HTTP.get('/users/', { params: {eventId: this.event, apiResult: this.info.api_result} })
      .then(response => {
        console.log(response.data.result)
        this.evs = response.data.result
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

<style>
body {
  font-size: 14px !important;
  font-weight: 400 !important;
}

.content {
    background-color: #FFFFFF;
    box-shadow: 0 0 1px rgba(0,0,0,0.3);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
}

.content .header {
    position: relative;
}

.content .header .back {
    display: inline-block;
    padding: 15px 20px 15px 36px;
    height: 19px;
    background: url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%229%22%20height%3D%2216%22%20viewBox%3D%220%200%209%2016%22%3E%3Cpath%20fill%3D%22%23828A99%22%20d%3D%22M8%2015.9c-.2%200-.4-.1-.6-.3l-7-7c-.3-.3-.3-.9%200-1.2l7-7c.3-.3.9-.3%201.2%200%20.3.3.3.9%200%201.2l-6.4%206.4%206.4%206.4c.3.3.3.9%200%201.2-.2.2-.4.3-.6.3z%22%20opacity%3D%22.7%22%2F%3E%3C%2Fsvg%3E') 15px 16px no-repeat;
    color: #818d99;
    text-decoration: none;
    line-height: 19px;
    cursor: pointer;

    position: absolute;
    left: 0;
}

.content .header .back:hover {
    background: url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%229%22%20height%3D%2216%22%20viewBox%3D%220%200%209%2016%22%3E%3Cpath%20fill%3D%22%23828A99%22%20d%3D%22M8%2015.9c-.2%200-.4-.1-.6-.3l-7-7c-.3-.3-.3-.9%200-1.2l7-7c.3-.3.9-.3%201.2%200%20.3.3.3.9%200%201.2l-6.4%206.4%206.4%206.4c.3.3.3.9%200%201.2-.2.2-.4.3-.6.3z%22%20opacity%3D%22.7%22%2F%3E%3C%2Fsvg%3E') 15px 16px no-repeat, linear-gradient(90deg, #f0f2f5 50%, #fff);
    color: #707d8c;
}

.content .header .title {
    text-align: center;
    font-weight: 700;
    color: #222;
    padding: 15px 20px;
}
</style>
