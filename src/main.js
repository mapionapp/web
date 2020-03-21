import Vue from 'vue'
import App from './app.vue'
// import './registerServiceWorker'
import router from './router'
import { store } from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import './lib/Geolocation'
import { googleApiKey } from './lib/Api'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: googleApiKey,
    libraries: 'places',
  },
  installComponents: true,
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
