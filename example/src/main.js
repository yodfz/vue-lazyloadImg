import Vue from 'vue'
import App from './App'
import lazyImg from 'vue-lazyloadimg'
Vue.use(lazyImg)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
