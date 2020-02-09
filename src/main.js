import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {router} from "./router/route";
import VueAudioRecorder from 'vue-audio-recorder'

import {store} from "./store/store";

Vue.config.productionTip = false;
Vue.use(VueAudioRecorder);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
