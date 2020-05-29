import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import tooltipDirective from '@/directives/tooltip.directive'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import VueMeta from 'vue-meta'
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.directive('tooltip', tooltipDirective)
firebase.initializeApp({
  apiKey: 'AIzaSyC006XDMZ0sLjlirZpD6Js-axYOSUO-_88',
  authDomain: 'vue-crm-system-1488.firebaseapp.com',
  databaseURL: 'https://vue-crm-system-1488.firebaseio.com',
  projectId: 'vue-crm-system-1488',
  storageBucket: 'vue-crm-system-1488.appspot.com',
  messagingSenderId: '412116909294',
  appId: '1:412116909294:web:8c0e57ede4f14ae26147ff',
  measurementId: 'G-F8Y80J9YG3'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
