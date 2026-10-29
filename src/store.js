import { reactive, markRaw } from 'vue'
import soundUrl from '@/assets/cosmic-glow.mp3'

export const store = reactive({
    muted: true,
    sound: markRaw(new Audio(soundUrl)),
    clickedOnce: false
})

export function toggleMute() {
    if (!store.clickedOnce) {
        store.sound.currentTime = 0
        store.sound.volume = 0.3
        store.sound.loop = true
        store.clickedOnce = true
    }
    store.muted ? store.sound.play() : store.sound.pause()
    store.muted = !store.muted
}
