<template>
    <div class="navbar-container">
        <div class="custom-btn" @click="scrollTo('#faqSection')">
            <span class="noselect">FAQ</span>
        </div>
        <div class="custom-btn" @click="scrollTo('#workSection')">
            <span class="noselect">Works</span>
        </div>
        <div class="custom-btn" @click="scrollTo('#toolSection')">
            <span class="noselect">Tools</span>
        </div>
        <div class="custom-btn" @click="scrollTo('#infoSection')">
            <span class="noselect">Info</span>
        </div>
    </div>
</template>

<script>
    import { markRaw } from 'vue'
    import { gsap } from 'gsap'
    import { store } from '@/store'
    export default {
        data() {
            return {
                tml: null
            }
        },
        computed: {
            hasBeenClicked() {
                return store.clickedOnce
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
            this.tml = markRaw(gsap.timeline({ paused: true, delay: 1 }))
            gsap.utils.toArray('.custom-btn').forEach((btn, i) => {
                this.tml.from(btn, {
                    duration: 1,
                    autoAlpha: 0,
                    ease: 'none'
                }, i * 0.1)
            })
        },
        methods: {
            scrollTo(selector) {
                document.querySelector(selector).scrollIntoView({ behavior: 'smooth' })
            }
        }
    }
</script>

<style scoped>
.navbar-container {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    font-family: var(--font-headers);
    text-shadow: var(--text-shadow-light);
}

.custom-btn {
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    width: 100%;
    max-width: 80px;
    min-height: 40px;
    display: grid;
    place-items: center;
    position: relative;
    user-select: none;
    text-align: center;
}

.custom-btn::before {
    transition: 300ms;
    height: 2px;
    content: "";
    position: absolute;
    background-color: hsla(0, 0%, 100%, 0.7);
    width: 0;
    bottom: 0;
}

.custom-btn:hover::before {
    width: 100%;
    animation: rotate 0.5s ease-in-out;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(180deg);
    }
}

@media screen and (min-width: 768px) {
    .custom-btn {
        font-size: 1.75rem;
    }
}

@media screen and (min-width: 1024px) {
    .custom-btn {
        max-width: 200px;
        min-height: 50px;
        font-size: 2rem;
    }

    .custom-btn::before {
        height: 3px;
        bottom: -0.5rem;
    }
}

</style>
