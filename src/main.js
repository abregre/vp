import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueParticles from 'particles.vue'
import VueScrollTo from 'vue-scrollto'
import VueDOMPurifyHTML from 'vue-dompurify-html'

Vue.use(VueDOMPurifyHTML)

Vue.use(VueParticles)
Vue.use(VueScrollTo)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
