<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
    padding: 0px;
    margin: 0px;
    outline: none;
}

body {
    background-color: #F0F0F0;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 18px;

    height: 100%;
}

html {
    height: 100%;
}

@font-face {
    font-family: HelveticaLight;
    src: url(./assets/fonts/HelveticaNeue-Thin.otf);
}

#app {
    height: 100%;
    overflow-y: scroll;
    padding: 10px;
    box-sizing: border-box;
}

.event {
    background: no-repeat center;
    background-size: cover;
    padding-bottom: 35%;
    border-radius: 2px;
    cursor: pointer;
    overflow: hidden;

    color: #FFF;
    position: relative;

    margin-bottom: 8px;
}

.event:last-child {
    margin-bottom: 0;
}

.event .overlay {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    position: absolute;
}

.event:hover .overlay {
    background-color: rgba(0, 0, 0, 0.8);
}

.event .info {
    position: absolute;
    padding: 32px 48px;
    bottom: 0;
}

.event .info .title {
    font-size: 1.4em;
}

.event .info .description {
    margin-top: 8px;
    font-family: HelveticaLight, sans-serif;
    font-weight: 100;
    line-height: 1.1em;
}

.event .top {
    position: absolute;
    top: 0;
    right: 0;
    padding: 24px 48px;

    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
}

.event .top > div {
    margin-left: 16px;
}

.event .top .star {
    background: no-repeat center url(./assets/star.png);
    width: 20px;
    height: 20px;
    background-size: contain;
}

.event .top .afisha {
    background: no-repeat center url(./assets/afisha.png);
    width: 20px;
    height: 20px;
    background-size: contain;
}

.event .top .rating {
    font-family: HelveticaLight, sans-serif;
    font-weight: 100;
    font-size: 1.2em;
    padding-top: 5px; /* to compensate wrong font height */
}


*::-webkit-input-placeholder {
    color: #929EB0;
}
*:-moz-placeholder {
    /* FF 4-18 */
    color: #929EB0;
}
*::-moz-placeholder {
    /* FF 19+ */
    color: #929EB0;
}
*:-ms-input-placeholder {
    /* IE 10+ */
    color: #929EB0;
}
</style>
