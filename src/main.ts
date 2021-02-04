import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './main.scss'
import Icons from './services/icons.service'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store';
// @ts-ignore
import VueLuxon from 'vue-luxon';

import HModal from './components/HModal.vue';
import HTable from './components/HTable.vue';
import HForm from './components/HForm.vue';
import HCrudView from './components/HCrudView.vue';
import HLoader from './components/elements/HLoader.vue';
import HButton from './components/elements/HButton.vue';
import HArraySelector from './components/elements/HArraySelector.vue';
import HCheckboxSelector from './components/elements/HCheckboxSelector.vue';
import HCollapsible from './components/HCollapsible.vue';
import Notifications from 'vue-notification';

Icons.Initialize();

Vue.component('icon', FontAwesomeIcon)

Vue.component('h-modal', HModal);
Vue.component('h-table', HTable);
Vue.component('h-form', HForm);
Vue.component('h-crud-view', HCrudView);
Vue.component('h-loader', HLoader);
Vue.component('h-button', HButton);
Vue.component('h-array-selector', HArraySelector);
Vue.component('h-checkbox-selector', HCheckboxSelector);
Vue.component('h-collapsible', HCollapsible);

Vue.config.productionTip = false

Vue.use(Notifications);

Vue.use(VueLuxon, {
  output: 'short',
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
