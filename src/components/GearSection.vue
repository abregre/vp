<template>
    <section id="gearSection" class="gear-section">
        <div class="gear-container">
            <div class="gear-1">
                <img :src="require('@/assets/svg/gear.svg')" alt="">
                <div class="screen-1">
                    Hello World
                </div>
            </div>
            <div class="gear-2">
                <img :src="require('@/assets/svg/gear.svg')" alt="">
            </div>
        </div>
    </section>

</template>

<script>
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    export default {
        mounted() {
            gsap.registerPlugin(ScrollTrigger)

            gsap.from('.gear-section', {
                scrollTrigger: {
                    trigger: '.gear-section',
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
.gear-section {
    color: var(--font-color);
    position: relative;
    width: 100%;
    overflow: hidden;
}

.gear-container {
    min-height: 500px;
    width: 100%;
}

.gear-1,
.gear-2 {
    position: absolute;
    top: 0;
    transform: rotate(0deg);
    width: 500px;
}

.gear-1 {
    left: -20%;
}

.screen-1 {
    position: absolute;
    top: 50%;
    left: 100%;
    width: 200px;
    height: 200px;
    border: 1px solid red;
    transform: translateY(-50%);
}

.gear-2 {
    right: -20%;
}

.gear-container:hover .gear-1,
.gear-container:hover .gear-2 {
    animation: rotating 2.5s linear infinite;
}

@keyframes rotating {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

</style>
