import Vue from 'vue';
import SimpleComparison from './SimpleComparison.vue';

const components = { SimpleComparison };

Object.keys(components).forEach((name) => {
  Vue.use(name, components[name]);
});

export default components;
