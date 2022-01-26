<template>
    <div class="home" :class="{'fullscreen': !hasBeenClicked}">
        <hero-section />
        <about-section />
        <div v-if="!hasBeenClicked" class="ToggleAudioOverlay" @click="startAudio">
            <span class="welcome-text">
                Click to start your journey
            </span>
        </div>
        <gear-section />
    </div>
</template>

<script>
    import HeroSection from '@/components/HeroSection'
    import AboutSection from '@/components/AboutSection'
    import GearSection from '@/components/GearSection'
    import { gsap } from 'gsap'

    export default {
        components: {
            HeroSection,
            AboutSection,
            GearSection
        },
        data() {
            return {

            }
        },
        computed: {
            hasBeenClicked() {
                return this.$store.getters.hasBeenClickedOnce
            }
        },
        mounted() {
            gsap.from('.welcome-text', {
                duration: 1,
                autoAlpha: 0.25,
                repeat: -1,
                ease: 'bounce.inOut'
            })
        },
        methods: {
            startAudio() {
                this.$store.dispatch('toggleMute')
            }
        }
    }
</script>

<style scoped>
.home {
    width: 100%;
}

.home.fullscreen {
    max-height: 100vh;
    overflow: hidden;
}

.ToggleAudioOverlay {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--mobile-font-title);
    font-family: var(--font-headers);
    text-align: center;
    background-color: rgba(0, 0, 0, 0.75);
    color: var(--font-color);
    overflow: hidden;
    user-select: none;
}

@media screen and (min-width: 768px) {
    .ToggleAudioOverlay {
        font-size: var(--tablet-font-title);
    }
}

</style>
