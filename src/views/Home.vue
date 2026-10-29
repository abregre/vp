<template>
    <div class="home" :class="{'fullscreen': !hasBeenClicked}">
        <hero-section />
        <div v-if="!hasBeenClicked" class="ToggleAudioOverlay" @click="startAudio">
            <span class="welcome-text">
                Click to start your journey
            </span>
        </div>
        <faq-section />
        <work-section />
        <tool-section />
        <info-section />
        <footer-bar />
    </div>
</template>

<script>
    import HeroSection from '@/components/HeroSection.vue'
    import FaqSection from '@/components/FAQSection.vue'
    import ToolSection from '@/components/ToolSection.vue'
    import InfoSection from '@/components/InfoSection.vue'
    import WorkSection from '@/components/WorkSection.vue'
    import FooterBar from '@/components/FooterBar.vue'
    import { gsap } from 'gsap'
    import { store, toggleMute } from '@/store'

    export default {
        components: {
            HeroSection,
            FaqSection,
            ToolSection,
            InfoSection,
            WorkSection,
            FooterBar
        },
        data() {
            return {

            }
        },
        computed: {
            hasBeenClicked() {
                return store.clickedOnce
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
                toggleMute()
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
