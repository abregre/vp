<template>
    <div id="app">
        <div class="crop tl" />
        <div class="crop tr" />
        <div class="crop bl" />
        <div class="crop br" />
        <move-top />
        <inspect-overlay />
        <div class="page">
            <div class="grid-fine" />
            <div class="grid-major" />
            <div class="vignette" />
            <home />
        </div>
    </div>
</template>

<script>
    import { markRaw } from 'vue'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import MoveTop from '@/components/MoveTop.vue'
    import InspectOverlay from '@/components/InspectOverlay.vue'
    import Home from '@/views/Home.vue'

    gsap.registerPlugin(ScrollTrigger)

    const glowSel = '.work-card,.faq-item,.tool,.tile,.shelf-detail,.btn,.work-link,.spine,.nav-links a,.socials a,.title-block,.ct-in,.mem-card'

    export default {
        components: {
            MoveTop, InspectOverlay, Home
        },
        data() {
            return {
                mm: null,
                last: null,
                queued: false
            }
        },
        mounted() {
            this.mm = markRaw(gsap.matchMedia())
            this.mm.add('(prefers-reduced-motion: no-preference)', () => {
                const page = this.$el.querySelector('.page')
                const scrub = { trigger: page, start: 'top top', end: 'bottom bottom', scrub: true }
                gsap.to('.grid-fine', { backgroundPositionY: '-240px', ease: 'none', scrollTrigger: scrub })
                gsap.to('.grid-major', { backgroundPositionY: '-720px', ease: 'none', scrollTrigger: scrub })
            })
            if (window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
                document.addEventListener('pointermove', this.queue, { passive: true })
                window.addEventListener('scroll', this.requeue, { passive: true })
            }
        },
        beforeUnmount() {
            this.mm.revert()
            document.removeEventListener('pointermove', this.queue)
            window.removeEventListener('scroll', this.requeue)
        },
        methods: {
            queue(e) {
                this.last = { clientX: e.clientX, clientY: e.clientY, target: e.target }
                this.requeue()
            },
            requeue() {
                if (this.last && !this.queued) {
                    this.queued = true
                    requestAnimationFrame(this.paint)
                }
            },
            paint() {
                this.queued = false
                if (!this.last) return
                let el = this.last.target
                while (el && el.nodeType === 1) {
                    if (el.matches(glowSel)) {
                        const r = el.getBoundingClientRect()
                        el.style.setProperty('--mx', (this.last.clientX - r.left) + 'px')
                        el.style.setProperty('--my', (this.last.clientY - r.top) + 'px')
                    }
                    el = el.parentElement
                }
            }
        }
    }
</script>

<style>

@import '@/global.css';

*,
*::before,
*::after { box-sizing: border-box; }

html {
    overflow-x: clip;
    scroll-behavior: smooth;
    scroll-padding-top: var(--nav-h);
    background: var(--bg);
}

body { overflow-x: clip; }

a { color: inherit; }

img {
    display: block;
    max-width: 100%;
}

strong {
    color: #fff;
    font-weight: 700;
}

.page {
    position: relative;
    overflow-x: clip;
}

.grid-fine,
.grid-major,
.vignette {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
}

.grid-fine {
    background-image: linear-gradient(var(--line-dim) 1px, transparent 1px), linear-gradient(90deg, var(--line-dim) 1px, transparent 1px);
    background-size: 24px 24px;
}

.grid-major {
    background-image: linear-gradient(rgba(155, 107, 255, 0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(155, 107, 255, 0.13) 1px, transparent 1px);
    background-size: 120px 120px;
    mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.vignette {
    background: radial-gradient(ellipse at 50% 0%, transparent 40%, var(--bg) 100%);
    opacity: 0.55;
}

.crop {
    position: fixed;
    width: 22px;
    height: 22px;
    z-index: 60;
    pointer-events: none;
    border: 0 solid var(--line-red);
    filter: drop-shadow(0 0 4px rgba(255, 45, 85, 0.6));
}

.crop.tl {
    top: 8px;
    left: 8px;
    border-top-width: 1px;
    border-left-width: 1px;
}

.crop.tr {
    top: 8px;
    right: 8px;
    border-top-width: 1px;
    border-right-width: 1px;
}

.crop.bl {
    bottom: 8px;
    left: 8px;
    border-bottom-width: 1px;
    border-left-width: 1px;
}

.crop.br {
    bottom: 8px;
    right: 8px;
    border-bottom-width: 1px;
    border-right-width: 1px;
}

section,
footer {
    position: relative;
    z-index: 1;
}

.wrap {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 calc(var(--pad) + 14px);
}

.sec { padding: 5rem 0; }

.sec-head {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.6rem;
    font-family: var(--font-headers);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.8rem;
}

.sec-head .no {
    color: var(--base-color);
    text-shadow: var(--text-shadow-light);
}

.sec-head h2 {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 500;
    color: #fff;
    letter-spacing: 0.14em;
}

.sec-head .ln {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--violet), var(--line) 40%);
    box-shadow: var(--glow-violet);
    transform-origin: left;
}

.sec-head .sheet { color: var(--muted); }

.btn {
    font-family: var(--font-headers);
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    color: #fff;
    background: transparent;
    border: 1px solid var(--base-color);
    padding: 0.8rem 1.4rem;
    cursor: pointer;
    position: relative;
    box-shadow: inset 0 0 0 1px rgba(255, 45, 85, 0.15), 0 0 14px rgba(255, 45, 85, 0.2);
    transition: background-color 0.25s, box-shadow 0.25s, color 0.25s;
}

.btn:hover {
    background: var(--base-color);
    box-shadow: var(--glow-red);
}

.btn.ghost {
    border-color: var(--line);
    box-shadow: none;
}

.btn.ghost:hover {
    background: transparent;
    border-color: var(--violet);
    box-shadow: var(--glow-violet);
}

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
    .work-card,
    .faq-item,
    .tool,
    .tile,
    .shelf-detail,
    .btn,
    .work-link,
    .spine,
    .nav-links a,
    .socials a,
    .title-block,
    .ct-in,
    .mem-card {
        position: relative;
        isolation: isolate;
    }

    .work-card::before,
    .faq-item::before,
    .tool::before,
    .tile::before,
    .shelf-detail::before,
    .btn::before,
    .work-link::before,
    .spine::before,
    .nav-links a::before,
    .socials a::before,
    .title-block::before,
    .ct-in::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
        background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(155, 107, 255, 0.15), rgba(255, 45, 85, 0.06) 45%, transparent 70%);
    }

    .work-card::after,
    .faq-item::after,
    .tool::after,
    .tile::after,
    .shelf-detail::after,
    .btn::after,
    .work-link::after,
    .spine::after,
    .nav-links a::after,
    .socials a::after,
    .title-block::after,
    .mem-card::after {
        content: '';
        position: absolute;
        inset: -1px;
        padding: 1px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
        background: radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), var(--base-color), var(--violet) 55%, transparent 80%);
        mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
    }

    .mem-card::after {
        inset: 0;
        z-index: 3;
    }

    .work-card:hover::before,
    .faq-item:hover::before,
    .tool:hover::before,
    .tile:hover::before,
    .shelf-detail:hover::before,
    .btn:hover::before,
    .work-link:hover::before,
    .spine:hover::before,
    .nav-links a:hover::before,
    .socials a:hover::before,
    .title-block:hover::before,
    .ct-in:hover::before,
    .work-card:hover::after,
    .faq-item:hover::after,
    .tool:hover::after,
    .tile:hover::after,
    .shelf-detail:hover::after,
    .btn:hover::after,
    .work-link:hover::after,
    .spine:hover::after,
    .nav-links a:hover::after,
    .socials a:hover::after,
    .title-block:hover::after,
    .mem-card:hover::after { opacity: 1; }

    .mem-card:hover .mem-back {
        background-image: radial-gradient(130px circle at var(--mx, 50%) var(--my, 50%), rgba(155, 107, 255, 0.28), rgba(255, 45, 85, 0.1) 50%, transparent 75%), linear-gradient(var(--line-dim) 1px, transparent 1px), linear-gradient(90deg, var(--line-dim) 1px, transparent 1px);
        background-size: 100% 100%, 10px 10px, 10px 10px;
    }

    .mem-card:hover .mem-face { background-image: radial-gradient(130px circle at var(--mx, 50%) var(--my, 50%), rgba(155, 107, 255, 0.2), rgba(255, 45, 85, 0.08) 50%, transparent 75%); }
}

@media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
}

</style>
