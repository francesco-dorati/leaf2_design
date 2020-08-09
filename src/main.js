import Vue from 'vue';
import Antd from 'ant-design-vue';
import VueScrollTo from 'vue-scrollto';
import 'ant-design-vue/dist/antd.less';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueScrollTo);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
