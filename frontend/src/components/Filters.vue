<template>
  <div class="content">
    <div class="header">
      <router-link to="/">
        <router-link to="/">
          <div class="back">
            События
          </div>
        </router-link>
      </router-link>
      <div class="title">Фильтры</div>
    </div>
    <div class="form">
      <div class="filters">
        <div class="filter">
          <div class="title">Пол</div>

          <div class="radio-button" :class='{on: male}' @click='changeRadio(0)'>Мужской</div>
          <div class="radio-button" :class='{on: female}' @click='changeRadio(1)'>Женский</div>
          <div class="radio-button" :class='{on: any}' @click='changeRadio(2)'>Любой</div>
        </div>
        <div class="filter">
          <div class="title">Возраст</div>
          <div>
            <input type="number" max="80" min="16" placeholder="От" v-model='lowAge'/>
            –
            <input type="number" max="80" min="16" placeholder="До" v-model='highAge'/>
          </div>
        </div>
        <div class="filter">
          <div class="title">Другое</div>
          <div class="checkbox" :class='{on: needPhoto}' @click='needPhoto = !needPhoto'>Только с фотографией</div>
          <div class="checkbox" :class='{on: onlymyCity}' @click='onlymyCity = !onlymyCity'>Только мой город</div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="actions">
        <router-link to="/users">
          <div class="button" @click='goToUsers'>Найти</div>
        </router-link>
        <div class="button light" @click='tryLuck'>Мне повезёт</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SET_FILTERS } from '../common/mutation-types'
import { HTTP } from '../http/common'

export default {
  name: 'Filters',
  data () {
    return {
      male: false,
      female: false,
      any: true,
      needPhoto: false,
      onlymyCity: true,
      lowAge: null,
      highAge: null
    }
  },
  mounted () {
    HTTP.post('/user', { eventId: this.event, userId: this.info.viewer_id })
    if (this.filters) {
      this.male = this.filters.male
      this.female = this.filters.female
      this.any = this.filters.any
      this.needPhoto = this.filters.needPhoto
      this.onlymyCity = this.filters.onlymyCity
      this.lowAge = this.filters.lowAge
      this.highAge = this.filters.highAge
    }
  },
  computed: {
    ...mapState(['event', 'filters', 'info'])
  },
  methods: {
    changeRadio (id) {
      switch (id) {
        case 0:
          this.male = true
          this.female = this.any = false
          break
        case 1:
          this.female = true
          this.any = this.male = false
          break
        case 2:
          this.any = true
          this.female = this.male = false
          break
      }
    },
    goToUsers () {
      let filters = {
        male: this.male,
        female: this.female,
        any: this.any,
        needPhoto: this.needPhoto,
        onlymyCity: this.onlymyCity,
        lowAge: this.lowAge,
        highAge: this.highAge
      }
      console.log(filters)
      this.$store.commit(SET_FILTERS, filters)
      this.$router.push('/users')
    },
    tryLuck () {
      this.$store.commit(SET_FILTERS, {})
      this.$router.push('/users')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  font-size: 14px !important;
  font-weight: 400 !important;
}

.content {
    background-color: #FFFFFF;
    box-shadow: 0 1px 1px rgba(0,0,0,0.3);
    border-radius: 2px;
    overflow: hidden;
}

.form {
    padding: 24px;
}

.content .header {
    border-bottom: 1px solid #e4e6e9;
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

.filters .filter {
    width: 33%;
    float: left;
}

.filter .title {
    color: #656565;
    font-weight: 700;
    margin-bottom: 12px;
}

.filter .radio-button {
    cursor: pointer;
    margin-top: 8px;
}

.filter .radio-button:before {
    background-image: url(../assets/filters/radio.png);
    background-size: 14px 70px;
    display: block;
    width: 14px;
    margin: 1px 7px 1px 0;
    height: 14px;
    content: '';
    float: left;
}

.filter .radio-button:hover:before {
    background-position: 0 -28px;
}

.filter .radio-button.on:before {
    background-position: 0 -14px;
}

.filter .radio-button.on:hover:before {
    background-position: 0 -42px;
}

.filter input {
    color: rgb(124, 127, 130);
    width: 50px;
    padding: 8px 6px;
    box-sizing: border-box;
    font-size: 0.9em;
    border-radius: 1px;
    border: 1px #c9d0d6 solid;
}

.filter .checkbox {
    cursor: pointer;
    margin-top: 8px;
}

.filter .checkbox:before {
    background-image: url(../assets/filters/check.png);
    background-size: 14px 70px;
    display: block;
    width: 14px;
    margin: 1px 7px 1px 0;
    height: 14px;
    content: '';
    float: left;
}

.filter .checkbox:hover:before {
    background-position: 0 -28px;
}

.filter .checkbox.on:before {
    background-position: 0 -14px;
}

.filter .checkbox.on:hover:before {
    background-position: 0 -42px;
}

.form .actions {
    margin-top: 24px;
}

.actions .button {
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

.actions .button:hover {
    background-color: #6888ad;
}

.actions .button:active {
    background-color: #5779a1;
    /*padding: 11px 24px 9px;*/
}

.actions .button.light {
    background-color: #dae2ea;
    color: #55677d;
}

.actions .button.light:hover {
    background-color: #dfe6ed;
}

.actions .button.light:active {
    background-color: #dae2ea;
}

.clear {
    clear: both;
}
</style>
