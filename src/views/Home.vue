<template>
    <div class="home">
        <nav-bar />
        <hero-section />
        <work-section />
        <faq-section />
        <tool-section />
        <books-section />
        <contact-section />
        <footer-bar />
    </div>
</template>

<script>
    import NavBar from '@/components/NavBar.vue'
    import HeroSection from '@/components/HeroSection.vue'
    import WorkSection from '@/components/WorkSection.vue'
    import FaqSection from '@/components/FAQSection.vue'
    import ToolSection from '@/components/ToolSection.vue'
    import BooksSection from '@/components/BooksSection.vue'
    import ContactSection from '@/components/ContactSection.vue'
    import FooterBar from '@/components/FooterBar.vue'

    export default {
        components: {
            NavBar,
            HeroSection,
            WorkSection,
            FaqSection,
            ToolSection,
            BooksSection,
            ContactSection,
            FooterBar
        }
    }
</script>

<style scoped>
.home {
    width: 100%;
}

</style>
