<template>
    <section id="aboutSection" class="about-section">
        <div class="about-info">
            <faq-collection />
        </div>
        <div class="about-image-container">
            <div class="about-image" />
        </div>
    </section>
</template>

<script>
    import FaqCollection from '@/components/FaqCollection'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    export default {
        components: {
            FaqCollection
        },
        mounted() {
            gsap.registerPlugin(ScrollTrigger)

            gsap.from('.about-section', {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top center',
                    end: 'center center',
                    toggleActions: 'play none none none'
                },
                autoAlpha: 0,
                y: 250,
                duration: 1
            })
        }
    }
</script>

<style scoped>
.about-section {
    color: var(--font-color);
    position: relative;
    width: 90%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 2rem;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 2rem 1rem;
    overflow: hidden;
}

.about-image-container {
    position: relative;
    margin: 5vh auto;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 45rem;
}

.about-image {
    background-image: url('~@/assets/about-image.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin: 2rem auto 0;
    width: 100%;
    min-height: 500px;
    position: relative;
    border-radius: 20px;
    transition: all 0.5s ease-in-out;
    box-shadow: var(--text-shadow);
}

.about-image:hover,
.about-image:focus,
.about-image:active {
    background-image: url('~@/assets/about-image.gif');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.about-image::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(265, 31%, 37%, 0.2);
    transition: background-color 0.25s;
}

.about-image:hover::after,
.about-image:focus::after,
.about-image:active::after {
    background-color: transparent;
    cursor: pointer;
}

.title {
    font-size: var(--mobile-font-title);
    margin-bottom: 5rem;
}

p {
    margin: 0.75rem 0;
    font-size: var(--mobile-font-body);
    line-height: calc(var(--mobile-font-body) + 0.5rem);
    text-align: justify;
    text-shadow: var(--text-shadow-color);
}

@keyframes rotating {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@media screen and (min-width: 768px) {
    .about-image {
        width: 90%;
        min-height: 600px;
    }

    .title {
        font-size: var(--tablet-font-title);
    }

    p {
        margin: 0.75rem 0;
        font-size: var(--tablet-font-body);
        line-height: calc(var(--tablet-font-body) + 0.75rem);
        text-align: left;
    }
}

@media screen and (min-width: 1024px) {
    .about-info {
        padding: 2rem;
    }

    .about-image-container {
        perspective: 45rem;
        padding: 2rem;
        margin: 0;
    }

    .about-image {
        transform-style: preserve-3d;
        transform: rotateY(-20deg);
        backface-visibility: hidden;
    }

    .about-image:hover {
        background: url('~@/assets/about-image.gif');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        transform: scale(1.1) rotateY(-10deg);
    }

    p {
        font-size: var(--desktop-font-body);
        line-height: calc(var(--dekstop-font-body) + 0.75rem);
    }
}

@media screen and (min-width: 1600px) {
    .about-image {
        max-width: 500px;
        min-height: 600px;
    }
}
</style>
