import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './main.scss'
import Icons from './services/icons.service'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Icons.Initialize();

Vue.component('icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
