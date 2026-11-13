<template>
    <footer ref="root" class="footer">
        <div class="wrap footer-inner">
            <p class="footer-mono">
                VP / 2026
            </p>
            <p>Designed and built by me with my AI agent setup.</p>
            <p>Animations: GSAP (<a href="https://gsap.com" target="_blank" rel="noopener">gsap.com</a>) · Tool logos: <a href="https://simpleicons.org" target="_blank" rel="noopener">simpleicons.org</a></p>
            <p><a href="/vp/2021/">2021 version</a></p>
        </div>
    </footer>
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    const root = ref(null)
    let mm = null

    onMounted(() => {
        gsap.registerPlugin(ScrollTrigger)
        mm = gsap.matchMedia()
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.fromTo(Array.from(root.value.querySelectorAll('.footer-inner > *')), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: root.value, start: 'top 95%', once: true } })
        })
    })

    onBeforeUnmount(() => {
        if (mm) mm.revert()
        mm = null
    })
</script>

<style scoped>
.footer, .footer *, .footer *::before, .footer *::after {
    box-sizing: border-box;
}

.footer {
    position: relative;
    z-index: 1;
    border-top: 1px solid var(--line);
    padding: 2.4rem 0 3rem;
    color: var(--muted);
    font-size: 0.85rem;
}

.wrap {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 calc(var(--pad) + 14px);
}

.footer-inner {
    display: grid;
    gap: 0.4rem;
}

.footer-inner p {
    margin: 0;
}

.footer-mono {
    font-family: var(--font-headers);
    color: var(--base-color);
    letter-spacing: 0.1em;
    text-shadow: var(--text-shadow-light);
}

.footer a {
    color: var(--violet);
    text-decoration: none;
}

.footer a:hover {
    text-decoration: underline;
}
</style>
