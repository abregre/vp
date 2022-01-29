<template>
    <div v-if="isScrolled" class="scroll-top" title="Scroll to top" @click="moveUp">
        <img :src="require('@/assets/svg/double-arrow-up.svg')" alt="scroll to top">
    </div>
</template>
<script>

    export default {
        data() {
            return {
                isScrolled: false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.checkPoint)
        },
        methods: {
            checkPoint() {
                if (window.scrollY > 100) {
                    this.isScrolled = true
                } else {
                    this.isScrolled = false
                }
            },
            moveUp() {
                window.scrollTo(0, 0)
            }
        }
    }
</script>

<style scoped>

.scroll-top {
    --border-radius: 20px;

    position: fixed;
    right: 0;
    bottom: 8vh;
    padding: 1rem;
    background: var(--base-color);
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    opacity: 0.5;
    transition: opacity 0.15s ease-in, max-width 0.4s ease-out 0.1s;
    display: flex;
    align-items: center;
    cursor: pointer;
    max-width: 100%;
    z-index: 1;
}

.scroll-top img {
    width: 2rem;
    height: 2rem;
}

.scroll-top:hover {
    opacity: 1;
}

</style>
