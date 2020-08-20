import Vue from 'vue';
import App from './App.vue';
import SimpleComparison from '..';

Vue.config.productionTip = false;

Vue.use(SimpleComparison);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
