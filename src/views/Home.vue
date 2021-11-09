<template>
    <div class="home">
        <hero-section />
        <about-section />
    </div>
</template>

<script>
    import HeroSection from '@/components/HeroSection'
    import AboutSection from '@/components/AboutSection'

    export default {
        components: {
            HeroSection,
            AboutSection
        },
        data() {
            return {

            }
        }

    }
</script>

<style scoped>
.home {
    width: 100%;
}

</style>
