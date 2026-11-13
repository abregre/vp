<template>
    <section id="top" class="hero">
        <div class="wrap">
            <div class="hero-label"><b>Sheet 00</b><span>Vasilis Paparidis</span><span>Thessaloniki, Greece</span></div>
            <div class="draw">
                <div class="dim-h"><span class="tk a" /><span class="ln" /><span class="tk b" /><span class="dim-lab">{{ width }} px</span></div>
                <div class="dim-v"><span class="tk a" /><span class="ln" /><span class="tk b" /></div>
                <h1 class="sr">Frontend Engineer turned product builder</h1>
                <svg ref="svg" class="h1-svg" viewBox="0 0 1000 380" aria-hidden="true" role="presentation">
                    <text x="0" y="110" font-size="104">Frontend Engineer</text>
                    <text x="0" y="235" font-size="104">turned product</text>
                    <text class="v" x="0" y="360" font-size="104">builder</text>
                </svg>
                <div class="callout c1"><span class="dot" /><span class="ld" /><span class="tx"><b>A</b>CSS first</span></div>
                <div class="callout c2"><span class="dot" /><span class="ld" /><span class="tx"><b>B</b>Since 2020</span></div>
            </div>
            <p class="hero-sub">Remote, mostly part-time work or one-off freelance projects. If you have a product you want built, I'd like to hear about it.</p>
            <div class="hero-cta">
                <a class="btn" href="#works">View works</a>
                <a class="btn ghost" href="#contact">Contact</a>
            </div>
            <div class="title-block">
                <div><span>Name</span><em>V. Paparidis</em></div>
                <div><span>Rev.</span><em>2026</em></div>
                <div><span>Role</span><em>Frontend Engineer</em></div>
                <div><span>Base</span><em>Thessaloniki, GR</em></div>
            </div>
        </div>
    </section>
</template>

<script>
    import { markRaw } from 'vue'
    import { gsap } from 'gsap'

    export default {
        data() {
            return {
                mm: null,
                width: 0
            }
        },
        mounted() {
            this.measure()
            window.addEventListener('resize', this.measure)
            window.addEventListener('load', this.measure)
            this.mm = markRaw(gsap.matchMedia(this.$el))
            this.mm.add('(prefers-reduced-motion: no-preference)', () => {
                const texts = gsap.utils.toArray('.h1-svg text')
                gsap.set(texts, { strokeDasharray: 2600 })
                const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
                tl.fromTo('.hero-label > *', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 })
                    .fromTo('.dim-h .ln', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, 0.1)
                    .fromTo('.dim-v .ln', { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: 'power3.inOut' }, 0.1)
                    .fromTo('.dim-h .tk, .dim-v .tk, .dim-lab', { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.05 }, 0.5)
                    .fromTo(texts, { strokeDashoffset: 2600, fillOpacity: 0 }, { strokeDashoffset: 0, duration: 1.9, stagger: 0.25, ease: 'power2.inOut' }, 0.4)
                    .to(texts, { fillOpacity: 1, duration: 0.8, stagger: 0.1, ease: 'power1.out' }, 2.1)
                    .to(texts, { strokeOpacity: 0.35, duration: 0.8 }, 2.5)
                    .fromTo('.hero .callout .ld', { scaleX: 0 }, { scaleX: 1, duration: 0.7, stagger: 0.2 }, 2.2)
                    .fromTo('.hero .callout', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, stagger: 0.2, ease: 'power3.out' }, 2.2)
                    .fromTo('.hero-sub, .hero-cta, .title-block', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, 2.3)
            })
        },
        beforeUnmount() {
            window.removeEventListener('resize', this.measure)
            window.removeEventListener('load', this.measure)
            this.mm.revert()
        },
        methods: {
            measure() {
                this.width = Math.round(this.$refs.svg.getBoundingClientRect().width)
            }
        }
    }
</script>

<style scoped>
.hero {
    min-height: calc(100vh - var(--nav-h));
    display: flex;
    align-items: center;
    padding: 3.5rem 0 4rem;
}

.hero .wrap {
    width: 100%;
    position: relative;
}

.hero-label {
    font-family: var(--font-headers);
    font-size: 0.74rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
}

.hero-label b {
    color: var(--base-color);
    font-weight: 400;
    text-shadow: var(--text-shadow-light);
}

.draw {
    position: relative;
    padding: 2.6rem 0 2.6rem 2rem;
}

.dim-h {
    position: absolute;
    left: 2rem;
    right: 0;
    top: 0;
    height: 14px;
    display: flex;
    align-items: center;
}

.dim-h .ln {
    flex: 1;
    height: 1px;
    background: var(--violet);
    box-shadow: var(--glow-violet);
    transform-origin: left;
}

.dim-h .tk, .dim-v .tk {
    position: absolute;
    background: var(--violet);
}

.dim-h .tk {
    top: 0;
    width: 1px;
    height: 14px;
}

.dim-h .tk.a { left: 0; }

.dim-h .tk.b { right: 0; }

.dim-lab {
    position: absolute;
    top: -9px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg);
    padding: 0 0.6rem;
    font-family: var(--font-headers);
    font-size: 0.68rem;
    color: var(--violet);
    letter-spacing: 0.1em;
    white-space: nowrap;
}

.dim-v {
    position: absolute;
    left: 0;
    top: 2.6rem;
    bottom: 2.6rem;
    width: 14px;
}

.dim-v .ln {
    position: absolute;
    left: 6px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--violet);
    box-shadow: var(--glow-violet);
    transform-origin: top;
}

.dim-v .tk {
    left: 0;
    width: 14px;
    height: 1px;
}

.dim-v .tk.a { top: 0; }

.dim-v .tk.b { bottom: 0; }

.h1-svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
    filter: drop-shadow(0 0 5px rgba(255, 45, 85, 0.35));
}

.h1-svg text {
    font-family: var(--font-body);
    font-weight: 700;
    letter-spacing: -0.02em;
    fill: #f2f2f8;
    stroke: var(--base-color);
    stroke-width: 1.4;
    paint-order: stroke;
}

.h1-svg text.v { stroke: var(--violet); }

.sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
}

.callout {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-headers);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--base-color-hover);
    white-space: nowrap;
}

.callout .ld {
    height: 1px;
    background: var(--base-color);
    box-shadow: var(--glow-red);
    transform-origin: left;
}

.callout .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1px solid var(--base-color);
    box-shadow: var(--glow-red);
    flex: none;
}

.callout .tx {
    border: 1px solid var(--line-red);
    padding: 0.18rem 0.5rem;
    background: rgba(8, 8, 12, 0.8);
}

.callout .tx b {
    color: var(--violet);
    font-weight: 400;
    margin-right: 0.35rem;
}

.hero .callout.c1 {
    right: 0;
    top: 4%;
    flex-direction: row-reverse;
}

.hero .callout.c2 {
    right: 0;
    bottom: 6%;
    flex-direction: row-reverse;
}

.hero .callout .ld { width: 48px; }

.hero-sub {
    max-width: 52ch;
    font-size: var(--mobile-font-body);
    margin: 2.4rem 0 2.2rem 2rem;
    font-weight: 300;
    line-height: 1.6;
    color: #cfcfdb;
}

.hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-left: 2rem;
}

.title-block {
    margin: 3.6rem 0 0 2rem;
    max-width: 420px;
    border: 1px solid var(--line);
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: var(--font-headers);
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: rgba(13, 13, 19, 0.7);
}

.title-block div {
    padding: 0.5rem 0.7rem;
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
}

.title-block div:nth-child(2n) { border-right: 0; }

.title-block div:nth-last-child(-n+2) { border-bottom: 0; }

.title-block span {
    display: block;
    color: var(--muted);
    font-size: 0.6rem;
}

.title-block em {
    font-style: normal;
    color: #fff;
}

@media (min-width: 1024px) {
    .hero-sub {
        font-size: 1.3rem;
        line-height: 1.55;
    }
}

@media (max-width: 768px) {
    .hero .callout.c1, .hero .callout.c2 { display: none; }
    .draw { padding-left: 1.6rem; }
    .dim-h { left: 1.6rem; }
    .hero-sub, .hero-cta, .title-block { margin-left: 0; }
    .title-block { margin-top: 2rem; }
}
</style>
