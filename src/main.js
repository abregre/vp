import { createApp } from 'vue'
import App from './App.vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'

createApp(App)
    .use(VueDOMPurifyHTML)
    .mount('#root')
