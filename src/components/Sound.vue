<template>
    <div class="sound" :class="{'clicked': clickedOnce}" @click="toggleMute">
        <img v-if="muted" class="sound-off" :src="require('@/assets/mute.png')">
        <img v-else class="sound-on" :src="require('@/assets/unmute.png')">
        <span :class="{'clicked': clickedOnce}">Click here for better experience</span>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                muted: true,
                sound: new Audio(require('@/assets/cosmic-glow.mp3')),
                clickedOnce: false
            }
        },
        methods: {
            toggleMute() {
                if (!this.clickedOnce) {
                    this.sound.currentTime = 0
                    this.sound.volume = 0.4
                    this.sound.loop = true
                    this.clickedOnce = true
                }
                this.muted ? this.sound.play() : this.sound.pause()
                this.muted = !this.muted
            }
        }
    }
</script>

<style scoped>
.sound {
    --border-radius: 20px;

    position: fixed;
    right: 0;
    top: 5%;
    padding: 1rem;
    background: var(--base-color);
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    opacity: 0.7;
    transition: opacity 0.15s ease-in, max-width 0.4s ease-out 0.1s;
    display: flex;
    align-items: center;
    cursor: pointer;
    max-width: 100%;
    min-height: 5.5rem;
    z-index: 1;
}

.sound.clicked {
    max-width: 5rem;
}

span {
    color: var(--font-color);
    opacity: 1;
    visibility: visible;
    transition: all 0.4s ease-in-out;
}

span.clicked {
    transform: translateX(100px);
    opacity: 0;
    visibility: hidden;
}

.sound:hover {
    opacity: 1;
}

.sound-on,
.sound-off {
    margin-left: 0.5rem;
    width: 2rem;
}

</style>
