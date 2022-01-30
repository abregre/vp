<template>
    <div class="sound" :class="{'is-muted': isMuted}" @click="toggleMute">
        <img v-if="isMuted" class="sound-off" :src="require('@/assets/mute.png')" alt="muted">
        <img v-else class="sound-on" :src="require('@/assets/unmute.png')" alt="unmuted">
    </div>
</template>
<script>
    import { gsap } from 'gsap'
    export default {
        data() {
            return {
                tml: null
            }
        },
        computed: {
            isMuted() {
                return this.$store.getters.isMuted
            },
            hasBeenClicked() {
                return this.$store.getters.hasBeenClickedOnce
            }
        },
        watch: {
            hasBeenClicked(newVal) {
                if (newVal) {
                    this.tml.play()
                }
            }
        },
        mounted() {
            this.tml = gsap.timeline({ paused: true })
            this.tml.from('.sound', {
                duration: 1,
                x: 100,
                ease: 'none',
                delay: 1
            })
        },
        methods: {
            toggleMute() {
                this.$store.dispatch('toggleMute')
            }
        }
    }
</script>

<style scoped>

.sound {
    --border-radius: 20px;

    position: fixed;
    right: 0;
    top: 8vh;
    padding: 1rem 0.5rem 1rem 1rem;
    background: var(--base-color);
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    opacity: 0.5;
    transition: opacity 0.15s ease-in, max-width 0.4s ease-out 0.1s;
    display: flex;
    align-items: center;
    cursor: pointer;
    max-width: 100%;
    z-index: 1;
}

.sound.is-muted {
    opacity: 1;
}

.sound:hover {
    opacity: 1;
}

.sound-on,
.sound-off {
    width: 2rem;
}

@media screen and (min-width: 1024px) {
    .sound {
        top: 7.5vh;
    }
}

</style>
