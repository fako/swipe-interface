// JS import
import Vue from 'vue';
import VueOnsen from 'vue-onsenui'; // This already imports 'onsenui'
// eslint-disable-next-line
import VueSwing from 'vue-swing';

import axios from 'axios';
import VueAxios from 'vue-axios';

// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import App from './App.vue';

Vue.use(VueOnsen);
VueOnsen.platform.select('ios');

Vue.component('vue-swing', VueSwing);
window.VueSwing = VueSwing;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
