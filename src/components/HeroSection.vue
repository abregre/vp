<template>
    <section class="hero-section">
        <div class="logo">
            <img :src="require('@/assets/logo.png')" alt="logo">
        </div>
        <div class="info-container">
            <h1 class="route-title">
                &lt;FRONT-END <br>ENGINEER &lt;&#47;&gt;
            </h1>
            <p class="availability">Who loves <span class="principles" />
                <span class="small-cursor">|</span>
            </p>
        </div>
        <nav-bar />
        <div class="scroll-downs">
            <div class="mousey">
                <div class="scroller" />
            </div>
        </div>
    </section>
</template>

<script>
    import NavBar from '@/components/NavBar'

    import { gsap, TextPlugin, SteppedEase } from 'gsap/all'
    export default {
        components: {
            NavBar
        },
        data() {
            return {
                tml: null
            }
        },
        computed: {
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
            gsap.registerPlugin(TextPlugin)

            this.tml = gsap.timeline({ paused: true })
            this.tml.from('.route-title', { autoAlpha: 0, y: 100, duration: 0.5, ease: 'none' })
            this.tml.from('.logo', { autoAlpha: 0, duration: 0.5, ease: 'none' }, '>')
            this.tml.from('.availability', { autoAlpha: 0, duration: 0.5, ease: 'none' }, '>')
            this.tml.from('.small-cursor', { autoAlpha: 0, x: -10, yoyo: true, repeat: -1, ease: SteppedEase.config(20) }, '<')
            this.tml.to('.principles', { text: { value: 'Web Development, Clean Code and CSS.' }, duration: 3, ease: 'none' }, '>')
            this.tml.from('.scroll-downs', { autoAlpha: 0, y: 100, duration: 1, ease: 'none' }, '>')
        },
        methods: {

        }
    }
</script>

<style scoped>
.hero-section {
    color: var(--font-color);
    position: relative;
    min-height: 100vh;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    padding: 2rem 0;
}

.logo {
    max-width: 90px;
    margin-top: 5vh;
}

.logo img {
    width: 100%;
}

.info-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

h1 {
    font-size: var(--mobile-font-title);
    line-height: var(--mobile-font-title);
    margin-bottom: 1rem;
    user-select: none;
    text-shadow: var(--text-shadow-light);
}

p {
    font-size: var(--mobile-font-body);
    padding-left: 0.5rem;
    user-select: none;
    text-shadow: var(--text-shadow-light);
}

.cursor {
    font-size: var(--mobile-font-title);
    line-height: var(--mobile-font-title);
    margin: 0;
}

.small-cursor {
    font-size: var(--mobile-font-body);
    line-height: var(--mobile-font-body);
    margin: 0;
}

@media screen and (min-width: 768px) {
    .logo {
        max-width: 100px;
    }

    .cursor,
    h1 {
        font-size: var(--tablet-font-title);
        line-height: var(--tablet-font-title);
    }

    .small-cursor,
    p {
        font-size: var(--tablet-font-body);
        line-height: var(--tablet-font-body);
    }
}

@media screen and (min-width: 1024px) {
    .logo {
        max-width: 120px;
    }

    .cursor,
    h1 {
        font-size: var(--desktop-font-title);
        line-height: var(--desktop-font-title);
    }

    .small-cursor {
        font-size: var(--desktop-font-body);
        line-height: var(--desktop-font-body);
    }

    p {
        font-size: 1.5rem;
        padding-left: 1rem;
    }

    .scroll-downs {
        position: absolute;
        bottom: 5vh;
        left: 50%;
        transform: translateX(-50%);
        width: 24px;
        height: 45px;
        user-select: none;
    }

    .hide {
        display: none;
    }

    .mousey {
        width: 3px;
        padding: 7px 12px;
        height: 35px;
        border: 2px solid #fff;
        border-radius: 25px;
        opacity: 0.75;
        box-sizing: content-box;
    }

    .scroller {
        width: 3px;
        height: 10px;
        border-radius: 25%;
        background-color: #fff;
        animation-name: scroll;
        animation-duration: 2s;
        animation-timing-function: cubic-bezier(0.15, 0.41, 0.69, 0.94);
        animation-iteration-count: infinite;
    }

    @keyframes scroll {
        0% {
            opacity: 0;
        }

        10% {
            transform: translateY(0);
            opacity: 1;
        }

        100% {
            transform: translateY(8px);
            opacity: 0;
        }
    }
}

</style>
