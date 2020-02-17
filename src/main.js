import Vue from 'vue'
import App from './App.vue'

import { create, all } from 'mathjs'

const config = {
  number: 'BigNumber',     
  precision: 26 }
const math = create(all, config)

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$mathjs', { value: math });

new Vue({
  render: h => h(App),
}).$mount('#app')
