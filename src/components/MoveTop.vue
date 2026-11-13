<template>
    <button class="to-top" :class="{ show: isScrolled }" type="button" aria-label="Back to top" @click="moveUp">
        <svg viewBox="0 0 16 16"><path d="M8 14V2M3 7l5-5 5 5" /></svg>
    </button>
</template>

<script>
    export default {
        data() {
            return {
                isScrolled: false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.checkPoint, { passive: true })
            window.addEventListener('resize', this.checkPoint)
            this.checkPoint()
        },
        beforeUnmount() {
            window.removeEventListener('scroll', this.checkPoint)
            window.removeEventListener('resize', this.checkPoint)
        },
        methods: {
            checkPoint() {
                const hero = document.getElementById('top')
                this.isScrolled = window.scrollY > (hero ? hero.offsetHeight : 100)
            },
            moveUp() {
                const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                window.scrollTo({ top: 0, behavior: calm ? 'instant' : 'smooth' })
            }
        }
    }
</script>

<style scoped>
.to-top { display: none; }

@media (max-width: 768px) {
    .to-top {
        display: grid;
        place-items: center;
        position: fixed;
        right: 18px;
        bottom: 22px;
        z-index: 55;
        width: 44px;
        height: 44px;
        padding: 0;
        background: rgba(8, 8, 12, 0.88);
        border: 1px solid var(--line-red);
        box-shadow: var(--glow-red);
        color: #fff;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s, background-color 0.25s;
    }

    .to-top.show {
        opacity: 1;
        visibility: visible;
    }
    .to-top:hover, .to-top:focus-visible { background: var(--base-color); }

    .to-top svg {
        width: 16px;
        height: 16px;
        stroke: currentcolor;
        fill: none;
        stroke-width: 1.5;
    }

    .to-top::before {
        content: '';
        position: absolute;
        left: -6px;
        top: -6px;
        width: 10px;
        height: 10px;
        border-top: 1px solid var(--violet);
        border-left: 1px solid var(--violet);
    }
}
</style>
