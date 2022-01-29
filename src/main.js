import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueParticles from 'particles.vue'
import VueScrollTo from 'vue-scrollto'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import { init } from '@emailjs/browser'

Vue.use(VueDOMPurifyHTML)

Vue.use(VueParticles)
Vue.use(VueScrollTo)
Vue.config.productionTip = false
init('user_ZDzKQhpPRR139kexvPV1o')

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
