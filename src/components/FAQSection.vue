<template>
    <section id="faq" class="sec">
        <div class="wrap">
            <div class="sec-head" data-rv><span class="no">02</span><h2>FAQ</h2><span class="ln" /><span class="sheet">7 notes</span></div>
            <p class="faq-intro" data-rv>I know, "About" pages can be really boring to read, so I decided to make a section with some frequently asked questions and answers about me. I hope you enjoy it.</p>
            <div class="faq-list">
                <div class="faq-spine" />
                <div v-for="(item, i) in items" :key="item.q" class="faq-item" :class="{ open: opened[i] }">
                    <i class="tick" />
                    <button class="faq-q" :aria-expanded="opened[i] ? 'true' : 'false'" @click="toggle(i)">
                        <span class="faq-n">NOTE 0{{ i + 1 }}</span><span class="faq-t">{{ item.q }}</span><span class="faq-i" />
                    </button>
                    <div class="faq-a">
                        <div><p v-dompurify-html="item.a" /></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { markRaw } from 'vue'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    export default {
        data() {
            return {
                mm: null,
                timer: null,
                opened: [true, false, false, false, false, false, false],
                items: [
                    {
                        q: 'Who are you?',
                        a: 'Hey, I\'m Vasilis, a self-taught Frontend Engineer turned product builder, from Thessaloniki, <strong>Greece</strong>. I still love CSS and animation heavy UIs, but these days I care most about the product: making things easier and nicer to use.<br>Travelling and motorcycles are my passion.'
                    },
                    {
                        q: 'What\'s your work experience?',
                        a: 'Since <strong>2020</strong> I work at <strong>MPASS</strong>, fully remote from day one, and between 2021 and 2023 I also took on freelance jobs. Since 2022 I lead the frontend of most projects I take on: I set things up, organise the work and share it with the rest of the team.<br>Before that I worked in sales, which taught me a lot about business and what a good user experience feels like.'
                    },
                    {
                        q: 'How do you work with AI?',
                        a: 'Every day, at work and on my own projects. I plan first, mockup before code and test on real devices. AI does more of the typing, the decisions and the quality stay mine.<br>This site is an example: planned, mocked up in five directions and built with my own AI agent setup, while the decisions stayed mine.'
                    },
                    {
                        q: 'What sets you apart?',
                        a: 'Business sense, organisation, responsibility and an eye for detail. I lead the frontend and split the work for the team.<br>On the technical side: CSS first, then <strong>Vue</strong> (Vue 3, Nuxt, Pinia) and JavaScript. At work I focus on the frontend. On my own projects I build full stack, Linux servers and basic DevOps included.<br>Security is always on my mind. I\'ve studied common attacks and vulnerabilities, so I know where what I build could break.'
                    },
                    {
                        q: 'What have you built lately?',
                        a: '<strong>Moto Life</strong>, a motorcycle route planner on the Play Store, born from my love for riding. <strong>Klaudio</strong>, which lets me talk to my AI agents from my phone, with Whisper running locally on my GPU. Both built on my own, in weeks.'
                    },
                    {
                        q: 'What are you learning now?',
                        a: 'Mostly AI: how it works and how to get the best out of it. Before that I studied security and got the Cisco <strong>Ethical Hacker</strong> and <strong>Introduction to Cybersecurity</strong> certifications (2025).'
                    },
                    {
                        q: 'Are you open to new work?',
                        a: 'Yes, remotely, mostly part-time work or one-off freelance projects. If you have a product you want built, I\'d like to hear about it.'
                    }
                ]
            }
        },
        mounted() {
            this.mm = markRaw(gsap.matchMedia(this.$el))
            this.mm.add('(prefers-reduced-motion: no-preference)', () => {
                const once = (el, extra) => Object.assign({ trigger: el, start: 'top 88%', once: true }, extra || {})
                gsap.utils.toArray('[data-rv]').forEach((el) => {
                    const ln = el.querySelector('.ln')
                    gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: once(el) })
                    if (ln) gsap.fromTo(ln, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.inOut', scrollTrigger: once(el) })
                })
                gsap.fromTo('.faq-spine', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.faq-list', start: 'top 75%', end: 'bottom 60%', scrub: true } })
                gsap.utils.toArray('.faq-item').forEach((it) => {
                    gsap.fromTo(it, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: once(it, { start: 'top 92%' }) })
                })
            })
        },
        beforeUnmount() {
            clearTimeout(this.timer)
            this.mm.revert()
        },
        methods: {
            toggle(i) {
                this.opened[i] = !this.opened[i]
                clearTimeout(this.timer)
                this.timer = setTimeout(() => ScrollTrigger.refresh(), 450)
            }
        }
    }
</script>

<style scoped>
.faq-intro {
    max-width: 62ch;
    color: #c6c6d2;
    margin: 0 0 2.4rem;
    font-weight: 300;
}

.faq-list {
    position: relative;
    padding-left: 2.2rem;
}

.faq-spine {
    position: absolute;
    left: 7px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--violet);
    box-shadow: var(--glow-violet);
    transform-origin: top;
}

.faq-item {
    position: relative;
    border-bottom: 1px solid var(--line);
}

.faq-item:first-of-type { border-top: 1px solid var(--line); }

.faq-item .tick {
    position: absolute;
    left: -2.2rem;
    top: 1.45rem;
    width: 15px;
    height: 1px;
    background: var(--violet);
    box-shadow: var(--glow-violet);
}

.faq-q {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: baseline;
    gap: 1rem;
    padding: 1.2rem 1rem;
}

.faq-q:focus-visible {
    outline: 1px solid var(--violet);
    outline-offset: 4px;
}

.faq-n {
    font-family: var(--font-headers);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    color: var(--base-color);
    text-shadow: var(--text-shadow-light);
    white-space: nowrap;
}

.faq-t {
    flex: 1;
    font-size: 1.15rem;
    font-weight: 500;
}

.faq-i {
    position: relative;
    width: 14px;
    height: 14px;
    flex: none;
    align-self: center;
}

.faq-i::before, .faq-i::after {
    content: '';
    position: absolute;
    background: var(--violet);
    left: 0;
    right: 0;
    top: 6px;
    height: 1px;
    transition: opacity 0.25s;
}

.faq-i::after {
    transform: rotate(90deg);
    transition: transform 0.3s;
}

.faq-item.open .faq-i::after { transform: rotate(0deg); }

.faq-item:hover .faq-t { color: var(--base-color-hover); }

.faq-a {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.4s ease;
}

.faq-item.open .faq-a { grid-template-rows: 1fr; }

.faq-a > div { overflow: hidden; }

.faq-a p {
    margin: 0;
    padding: 0 1rem 1.5rem calc(2.4rem + 2rem);
    max-width: 70ch;
    color: #c6c6d2;
    font-weight: 300;
}

@media (min-width: 1024px) {
    .faq-list { padding-left: 3rem; }

    .faq-item .tick {
        left: -3rem;
        width: 26px;
    }
}

@media (max-width: 768px) {
    .faq-a p { padding-left: 1rem; }
}
</style>
