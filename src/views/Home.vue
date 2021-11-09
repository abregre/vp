<template>
    <div class="home">
        <hero-section />
    </div>
</template>

<script>
    import HeroSection from '@/components/HeroSection'

    export default {
        components: {
            HeroSection
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
