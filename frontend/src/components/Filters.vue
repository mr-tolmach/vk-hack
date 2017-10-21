<template>
  <div class="filters">
    {{event}}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Filters',
  data () {
    return {}
  },
  computed: {
    ...mapState(['event'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
