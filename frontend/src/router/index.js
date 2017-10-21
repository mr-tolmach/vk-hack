import Vue from 'vue'
import Router from 'vue-router'
import Events from '@/components/Events'
import Filters from '@/components/Filters'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Events',
      component: Events
    },
    {
      path: '/filters',
      name: 'Filters',
      component: Filters
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})
