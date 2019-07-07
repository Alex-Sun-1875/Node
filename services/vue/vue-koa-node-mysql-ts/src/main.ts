import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import { Button, Select } from 'element-ui';
import service from './utils/https';
import urls from './utils/urls';

Vue.use(Button);
Vue.use(Select);

Vue.prototype.$https = service; // 其它页面使用 axios 的时候直接 this.$https 就可以了
Vue.prototype.$urls = urls; // 其它页面在使用 urls 的时候直接 this.$urls 就可以了

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
