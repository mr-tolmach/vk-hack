<template>
  <div class="user">
    <div class="image" :style="{ 'background-image': 'url(' + imageLink + ')' }"></div>
    <div class="info">
      <div class="name">
          {{name}}
      </div>
      <div class="description">
          {{description}}
      </div>
      <div class="similar">
          {{similar}}
      </div>
      <div class="actions">
          <div class="button">Позвать</div>
          <div class="button light">Скрыть</div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: ['id', 'name', 'description', 'similar', 'imageLink'],
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    font-size: 14px;
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
</style>
