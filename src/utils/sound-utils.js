export default {
    playSound(sound) {
        sound.pause()
        sound.currentTime = 0
        if (this.muted) {
            return
        }
        sound.play()
    },
    toggleMute() {
        this.muted = !this.muted
    },
    isMuted() {
        return this.muted
    }
}
