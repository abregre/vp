import Vue from 'vue'
import Vuex from 'vuex'
// import emailjs from '@emailjs/browser'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        muted: true,
        sound: new Audio(require('@/assets/cosmic-glow.mp3')),
        clickedOnce: false
    },
    mutations: {
        toggleMute(state) {
            if (!state.clickedOnce) {
                state.sound.currentTime = 0
                state.sound.volume = 0.3
                state.sound.loop = true
                state.clickedOnce = true
            }
            state.muted ? state.sound.play() : state.sound.pause()
            state.muted = !state.muted
        }
    },
    actions: {
        toggleMute({ commit }) {
            commit('toggleMute')
        },
        sendEmail(payload) {
            console.log(payload)
            // emailjs.send('PortfolioContact787', 'template_h5wzlho', payload, 'user_ZDzKQhpPRR139kexvPV1o')
            //     .then((response) => {
            //         console.log('SUCCESS!', response.status, response.text)
            //     }, (err) => {
            //         console.log('FAILED...', err)
            //     })
        }
    },
    getters: {
        isMuted: state => state.muted,
        hasBeenClickedOnce: state => state.clickedOnce
    }
})
