<template>
    <nav class="nav">
        <a class="nav-logo" href="#top">VP<i>/</i><span>Paparidis</span></a>
        <div class="nav-links">
            <a href="#works"><b>01</b>Works</a>
            <a href="#faq"><b>02</b>FAQ</a>
            <a href="#tools"><b>03</b>Tools</a>
            <a href="#workbench"><b>04</b><span class="lg">Workbench</span><span class="sh">Bench</span></a>
            <a href="#contact"><b>05</b>Contact</a>
        </div>
        <div class="nav-end">
            <button class="insp" type="button" :aria-pressed="inspectOn ? 'true' : 'false'" aria-label="Inspect mode" @click="inspectOn = !inspectOn">
                <span class="dot" />Inspect<span class="st">{{ inspectOn ? 'on' : 'off' }}</span>
            </button>
            <div class="nav-rev">Rev. 2026</div>
        </div>
        <div class="nav-prog" />
    </nav>
</template>

<script>
    import { markRaw } from 'vue'
    import { gsap } from 'gsap'
    import { useInspect } from '@/composables/useInspect'

    export default {
        setup() {
            const { inspectOn } = useInspect()
            return { inspectOn }
        },
        data() {
            return {
                mm: null
            }
        },
        mounted() {
            this.mm = markRaw(gsap.matchMedia())
            this.mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.fromTo(this.$el.querySelector('.nav-prog'), { scaleX: 0 }, {
                    scaleX: 1,
                    ease: 'none',
                    scrollTrigger: { trigger: document.querySelector('.page'), start: 'top top', end: 'bottom bottom', scrub: true }
                })
            })
        },
        beforeUnmount() {
            this.mm.revert()
        }
    }
</script>

<style scoped>
.nav {
    position: sticky;
    top: 0;
    z-index: 50;
    height: var(--nav-h);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 calc(var(--pad) + 14px);
    background: rgba(8, 8, 12, 0.82);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
    font-family: var(--font-headers);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.nav-logo {
    text-decoration: none;
    font-weight: 500;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.nav-logo i {
    font-style: normal;
    color: var(--base-color);
    text-shadow: var(--text-shadow-light);
}

.nav-links {
    display: flex;
    gap: 0.3rem;
}

.nav-links a {
    text-decoration: none;
    color: var(--muted);
    display: flex;
    gap: 0.35rem;
    padding: 0.4rem 0.6rem;
}

.nav-links a b {
    font-weight: 400;
    color: var(--violet);
}

.nav-links a:hover { color: #fff; }

.nav-links a .sh { display: none; }

.nav-end {
    display: flex;
    align-items: center;
    gap: 1.2rem;
}

.insp {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.3rem 0.7rem;
    background: transparent;
    border: 1px solid var(--line);
    color: var(--muted);
    font-family: var(--font-headers);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
}

.insp:hover {
    border-color: var(--violet);
    color: #fff;
}

.insp:focus-visible {
    outline: 1px solid var(--violet);
    outline-offset: 3px;
}

.insp .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1px solid currentcolor;
    flex: none;
}

.insp .st { color: var(--muted); }

.insp[aria-pressed="true"] {
    border-color: var(--violet);
    color: #fff;
}

.insp[aria-pressed="true"] .dot {
    background: var(--base-color);
    border-color: var(--base-color);
    box-shadow: var(--glow-red);
}

.insp[aria-pressed="true"] .st { color: var(--violet); }

.nav-rev {
    display: none;
    color: var(--muted);
}

.nav-prog {
    position: absolute;
    left: 0;
    bottom: -1px;
    height: 1px;
    width: 100%;
    background: var(--base-color);
    box-shadow: var(--glow-red);
    transform: scaleX(0);
    transform-origin: left;
}

@media (min-width: 768px) {
    .nav-links { gap: 0.8rem; }
}

@media (min-width: 1024px) {
    .nav-rev { display: block; }
}

@media (hover: none) {
    .insp { display: none; }
}

@media (max-width: 768px) {
    .nav-end { display: none; }
    .nav-links { gap: 0.1rem; }
    .nav-links a { padding: 0.4rem 0.45rem; }
    .nav-links a b { display: none; }
    .nav-logo span { display: none; }
    .nav-links a .lg { display: none; }
    .nav-links a .sh { display: inline; }
}
</style>
