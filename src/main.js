import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

import Dashboard from './components/Dashboard';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';
import ContractList from './components/ContractList';
import ContractPartyList from './components/ContractPartyList';
import Settings from './components/Settings';

const router = new VueRouter({routes:[
  { path: '/', component: Dashboard },
  { path: '/invoices', component: InvoiceList },
  { path: '/invoice-form/:number', component: InvoiceForm },
  { path: '/contracts', component: ContractList },
  { path: '/contract-parties', component: ContractPartyList },
  { path: '/settings', component: Settings },
]});

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
