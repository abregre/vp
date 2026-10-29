import { createApp } from 'vue'
import App from './App.vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

createApp(App)
    .use(VueDOMPurifyHTML)
    .use(Particles, {
        init: async engine => {
            await loadSlim(engine)
        }
    })
    .mount('#root')
