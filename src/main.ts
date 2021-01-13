import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './main.scss'
import Icons from './services/icons.service'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store';
// @ts-ignore
import VueLuxon from 'vue-luxon';

Icons.Initialize();

Vue.component('icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueLuxon, {
  output: 'short',
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
