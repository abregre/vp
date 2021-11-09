import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueParticles from 'particles.vue'
Vue.config.productionTip = false

Vue.use(VueParticles)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')