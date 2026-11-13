<template>
    <section id="works" class="sec">
        <div class="wrap">
            <div class="sec-head" data-rv><span class="no">01</span><h2>Works</h2><span class="ln" /><span class="sheet">4 specs</span></div>
            <div class="works-grid">
                <article v-for="(work, i) in works" :key="work.title" class="work-card">
                    <span class="cm tl" /><span class="cm tr" /><span class="cm bl" /><span class="cm br" />
                    <div class="tb"><span class="n">Spec 0{{ i + 1 }}</span><span class="t">{{ work.title }}</span><span class="s">Sheet {{ i + 1 }}/4</span></div>
                    <div class="wc-body">
                        <div class="fig">
                            <div class="dim-h"><span class="tk a" /><span class="ln" /><span class="tk b" /><span class="dim-lab">{{ dims[i].w }} px</span></div>
                            <div class="dim-v"><span class="tk a" /><span class="ln" /><span class="tk b" /><span class="dim-lab">{{ dims[i].h }} px</span></div>
                            <div class="shot">
                                <img :src="work.img" :alt="work.title" @load="measure">
                                <div class="callout"><span class="dot" /><span class="ld" /><span class="tx"><b>{{ work.callout.key }}</b>{{ work.callout.text }}</span></div>
                            </div>
                        </div>
                        <div class="spec">
                            <h3>{{ work.title }}</h3>
                            <p>{{ work.text }}</p>
                            <table class="spec-table">
                                <tr v-for="row in work.specs" :key="row[0]"><th>{{ row[0] }}</th><td>{{ row[1] }}</td></tr>
                            </table>
                            <div class="work-links">
                                <a v-for="link in work.links" :key="link.href" :href="link.href" target="_blank" rel="noopener" class="work-link">{{ link.label }}</a>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script>
    import { markRaw } from 'vue'
    import { gsap } from 'gsap'
    import gamesBond from '@/assets/work-previews/games-bond.png'
    import motoLife from '@/assets/work-previews/moto-life.png'
    import caseUnknown from '@/assets/work-previews/case-unknown.png'
    import klaudio from '@/assets/work-previews/klaudio.png'

    export default {
        data() {
            return {
                mm: null,
                dims: [{ w: 0, h: 0 }, { w: 0, h: 0 }, { w: 0, h: 0 }, { w: 0, h: 0 }],
                works: [
                    {
                        title: 'Games Bond (FRAwards)',
                        img: gamesBond,
                        callout: { key: 'A', text: 'Vue 2 → Vue 3' },
                        text: 'A gamification platform for FraAlliance: missions, quizzes, leaderboards and rewards. I lead the frontend of the web app, the kiosk app and the CMS since 2022, and rewrote it from Vue 2 to Vue 3.',
                        specs: [['Scope', 'web app, kiosk app, CMS'], ['Migration', 'Vue 2 → Vue 3'], ['Role', 'Frontend lead, since 2022']],
                        links: [{ href: 'https://frawards.fra-alliance.com/web', label: 'Open site' }]
                    },
                    {
                        title: 'Moto Life',
                        img: motoLife,
                        callout: { key: 'B', text: 'Road surface map' },
                        text: 'A motorcycle route planner for Greece that finds rides for you, on a map that shows the road surface. Android and web, built on my own with Vue 3, Capacitor, MapLibre and a self-hosted GraphHopper.',
                        specs: [['Platform', 'Android, web'], ['Stack', 'Vue 3, Capacitor, MapLibre, GraphHopper (self-hosted)'], ['Role', 'Built on my own']],
                        links: [
                            { href: 'https://play.google.com/store/apps/details?id=gr.motolife.app', label: 'Play Store' },
                            { href: 'https://seperimenw.gr/', label: 'Web' }
                        ]
                    },
                    {
                        title: 'CASE//UNKNOWN',
                        img: caseUnknown,
                        callout: { key: 'C', text: 'Fully offline' },
                        text: 'A mobile deduction game. You get a case, inspect the evidence and find the contradiction that breaks someone\'s story. Greek and English, fully offline.',
                        specs: [['Type', 'Mobile deduction game'], ['Languages', 'Greek and English'], ['Mode', 'Fully offline']],
                        links: []
                    },
                    {
                        title: 'Klaudio',
                        img: klaudio,
                        callout: { key: 'D', text: 'Whisper on my GPU' },
                        text: 'Talk to Claude Code from your phone, even with the screen off. Whisper transcribes live on my GPU, the text goes to the coding session, and replies and approvals come back to the phone.',
                        specs: [['Input', 'Voice, from the phone'], ['Speech to text', 'Whisper on my GPU'], ['Screen', 'Works with the screen off']],
                        links: []
                    }
                ]
            }
        },
        mounted() {
            this.measure()
            window.addEventListener('resize', this.measure)
            window.addEventListener('load', this.measure)
            this.mm = markRaw(gsap.matchMedia(this.$el))
            this.mm.add('(prefers-reduced-motion: no-preference)', () => {
                const once = (el, extra) => Object.assign({ trigger: el, start: 'top 88%', once: true }, extra || {})
                gsap.utils.toArray('[data-rv]').forEach((el) => {
                    const ln = el.querySelector('.ln')
                    gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: once(el) })
                    if (ln) gsap.fromTo(ln, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.inOut', scrollTrigger: once(el) })
                })
                gsap.utils.toArray('.work-card').forEach((card) => {
                    const t = gsap.timeline({ scrollTrigger: once(card, { start: 'top 82%' }), defaults: { ease: 'power2.out' } })
                    t.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 })
                        .fromTo(card.querySelectorAll('.cm'), { opacity: 0, scale: 2.2 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08 }, 0.1)
                        .fromTo(card.querySelectorAll('.spec > *'), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }, 0.3)
                        .fromTo(card.querySelectorAll('.spec-table tr'), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.08 }, 0.7)
                        .fromTo(card.querySelector('.shot .ld'), { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0.9)
                        .fromTo(card.querySelector('.shot .callout'), { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 0.9)
                    gsap.fromTo(card.querySelector('.fig .dim-h .ln'), { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 25%', scrub: true } })
                    gsap.fromTo(card.querySelector('.fig .dim-v .ln'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top 60%', end: 'bottom 50%', scrub: true } })
                })
            })
        },
        beforeUnmount() {
            window.removeEventListener('resize', this.measure)
            window.removeEventListener('load', this.measure)
            this.mm.revert()
        },
        methods: {
            measure() {
                this.$el.querySelectorAll('.shot').forEach((shot, i) => {
                    const r = shot.getBoundingClientRect()
                    this.dims[i] = { w: Math.round(r.width), h: Math.round(r.height) }
                })
            }
        }
    }
</script>

<style scoped>
.works-grid {
    display: grid;
    gap: 2.4rem;
}

.work-card {
    position: relative;
    border: 1px solid var(--line);
    background: rgba(13, 13, 19, 0.78);
}

.work-card .cm {
    position: absolute;
    width: 14px;
    height: 14px;
    border: 0 solid var(--base-color);
    filter: drop-shadow(0 0 4px rgba(255, 45, 85, 0.7));
    transform-origin: center;
}

.work-card .cm.tl {
    top: -6px;
    left: -6px;
    border-top-width: 1px;
    border-left-width: 1px;
}

.work-card .cm.tr {
    top: -6px;
    right: -6px;
    border-top-width: 1px;
    border-right-width: 1px;
}

.work-card .cm.bl {
    bottom: -6px;
    left: -6px;
    border-bottom-width: 1px;
    border-left-width: 1px;
}

.work-card .cm.br {
    bottom: -6px;
    right: -6px;
    border-bottom-width: 1px;
    border-right-width: 1px;
}

.tb {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid var(--line);
    font-family: var(--font-headers);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
}

.tb > span { padding: 0.6rem 0.9rem; }

.tb .n {
    color: var(--base-color);
    border-right: 1px solid var(--line);
    text-shadow: var(--text-shadow-light);
}

.tb .t {
    flex: 1;
    color: #fff;
    padding-left: 0;
}

.tb .s {
    border-left: 1px solid var(--line);
    display: none;
}

.wc-body {
    display: grid;
    grid-template-columns: 1fr;
}

.fig {
    position: relative;
    padding: 2.4rem 1.6rem 2.4rem 2.4rem;
    border-bottom: 1px solid var(--line);
}

.dim-h {
    position: absolute;
    left: 2.4rem;
    right: 1.6rem;
    top: 0.9rem;
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
    font-size: 0.62rem;
    color: var(--violet);
    letter-spacing: 0.1em;
    white-space: nowrap;
}

.dim-v {
    position: absolute;
    left: 0.9rem;
    top: 2.4rem;
    bottom: 2.4rem;
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

.dim-v .dim-lab {
    top: 50%;
    left: 3px;
    transform: translate(-50%, -50%) rotate(-90deg);
    padding: 0 0.5rem;
}

.shot {
    position: relative;
    border: 1px solid var(--line-red);
    box-shadow: 0 0 22px rgba(255, 45, 85, 0.14);
    background: #000;
}

.shot img {
    width: 100%;
    height: auto;
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
    z-index: 2;
    left: 0.6rem;
    bottom: 0.6rem;
}

.callout .ld {
    width: 28px;
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

.spec {
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
}

.spec h3 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.15;
}

.spec p {
    margin: 0;
    color: #c6c6d2;
    font-weight: 300;
    font-size: 1rem;
}

.spec-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-headers);
    font-size: 0.75rem;
}

.spec-table tr { border-top: 1px solid var(--line); }

.spec-table tr:last-child { border-bottom: 1px solid var(--line); }

.spec-table th {
    text-align: left;
    font-weight: 400;
    color: var(--violet);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.55rem 0.8rem 0.55rem 0;
    width: 30%;
    vertical-align: top;
    white-space: nowrap;
}

.spec-table td {
    padding: 0.55rem 0;
    color: #fff;
    line-height: 1.5;
}

.work-links {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
}

.work-link {
    font-family: var(--font-headers);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: #fff;
    border: 1px solid var(--line-red);
    padding: 0.35rem 0.8rem;
    transition: background-color 0.25s, box-shadow 0.25s;
}

.work-link:hover {
    background: var(--base-color);
    box-shadow: var(--glow-red);
}

@media (min-width: 768px) {
    .tb .s { display: block; }
    .spec h3 { font-size: 2rem; }
}

@media (min-width: 1024px) {
    .wc-body { grid-template-columns: 1.35fr 1fr; }

    .fig {
        border-bottom: 0;
        border-right: 1px solid var(--line);
    }
    .spec { padding: 2rem; }
}

@media (max-width: 768px) {
    .fig { padding: 2.2rem 1rem 1.4rem 2rem; }

    .dim-h {
        left: 2rem;
        right: 1rem;
    }
    .dim-v { left: 0.7rem; }
    .callout { font-size: 0.6rem; }
}
</style>
