import Vue from 'vue'
import Vuex from 'vuex'

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
        }
    },
    getters: {
        isMuted: state => state.muted,
        hasBeenClickedOnce: state => state.clickedOnce
    }
})
