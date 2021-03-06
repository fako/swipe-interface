// JS import
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueOnsen from 'vue-onsenui'; // This already imports 'onsenui'
// eslint-disable-next-line
import VueSwing from 'vue-swing';

import axios from 'axios';
import VueAxios from 'vue-axios';

// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import App from './App.vue';
import Home from './Home.vue';
import Swipe from './Swipe.vue';


Vue.use(VueOnsen);
VueOnsen.platform.select('ios');

Vue.component('vue-swing', VueSwing);
window.VueSwing = VueSwing;

Vue.use(VueAxios, axios);

Vue.use(VueRouter);
const routes = [
  { path: '/', component: Home },
  { path: '/swipe', component: Swipe },
];
const router = new VueRouter({
  routes
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
