<template>
    <section id="tools" ref="root" class="sec">
        <div class="wrap">
            <div class="sec-head" data-rv>
                <span class="no">03</span><h2>Tools</h2><span class="ln" /><span class="sheet">Index</span>
            </div>
            <div class="tools-wrap">
                <div class="tile t-info" data-rv>
                    <div class="label">
                        stack
                    </div>
                    <div class="tools-info">
                        Here are some tools and technologies that I use.<br>My frontend framework to go is Vue, but I also use other frameworks such as React.<br>I also prefer vanilla CSS for most applications, but I also use SASS for some projects.
                    </div>
                </div>
                <div id="mem" class="tile mem" :data-mode="mode" data-rv>
                    <div class="mem-hud">
                        <div class="mem-stats">
                            <span>Moves<b>{{ pad(moves) }}</b></span><span>Pairs<b>{{ pairs }}</b>/8</span>
                        </div>
                        <div class="mem-actions">
                            <button id="memRestart" class="btn sm ghost" type="button" @click="restart">
                                Restart
                            </button>
                            <button id="memShowAll" class="btn sm show-all" type="button" @click="showAll">
                                Show all
                            </button>
                        </div>
                    </div>
                    <div class="mem-stage">
                        <div ref="board" class="mem-board">
                            <button
                                v-for="(card, k) in deck"
                                :key="gen + '-' + k"
                                type="button"
                                class="mem-card"
                                :class="{ flipped: card.flipped, matched: card.matched }"
                                :data-tool="card.tool.name"
                                :aria-label="'Memory card ' + pad(k + 1) + (card.flipped || card.matched ? ': ' + card.tool.name : '')"
                                :disabled="card.matched"
                                @click="flip(card)"
                            >
                                <div class="mem-in">
                                    <div class="mem-back">
                                        <span>//</span>
                                    </div>
                                    <div class="mem-face">
                                        <span class="lg" :class="{ plate: card.tool.plate }"><img :src="card.tool.src" :alt="card.tool.name"></span><span class="nm">{{ card.tool.name }}</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div class="mem-win">
                            <div class="mem-win-t">
                                STACK UNLOCKED
                            </div>
                            <div class="mem-win-s">
                                8/8 pairs
                            </div>
                        </div>
                    </div>
                    <div class="tools-container">
                        <div v-for="tool in tools" :key="tool.name" class="tool">
                            <span class="lg" :class="{ plate: tool.plate }"><img :src="tool.src" :alt="tool.name" :title="tool.name"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    const logos = import.meta.glob('@/assets/svg/tool-logos/*.svg', { eager: true, import: 'default' })

    const toolDefs = [
        ['JavaScript', 'js', false],
        ['Vue', 'vue', true],
        ['Nuxt', 'nuxt', true],
        ['React', 'react', false],
        ['CSS', 'css', false],
        ['HTML', 'html', false],
        ['Sass', 'sass', false],
        ['Git', 'git', false],
        ['Yarn', 'yarn', false],
        ['Npm', 'npm', false],
        ['Node', 'node', true],
        ['Ubuntu', 'ubuntu', false],
        ['Figma', 'figma', false],
        ['EsLint', 'eslint', true],
        ['StyleLint', 'stylelint', true],
        ['Jest', 'jest', false],
        ['JSON', 'json', true],
        ['Vite', 'vite', true],
        ['GSAP', 'gsap', true]
    ]
    const tools = toolDefs.map(([name, file, plate]) => ({
        name,
        plate,
        src: logos['/src/assets/svg/tool-logos/' + file + '-logo.svg']
    }))

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = ref(null)
    const board = ref(null)
    const mode = ref(calm ? 'list' : 'game')
    const deck = ref([])
    const moves = ref(0)
    const pairs = ref(0)
    const gen = ref(0)

    let open = []
    let busy = false
    let timers = []
    let fx = null
    let mm = null
    let alive = false

    const pad = n => (n < 10 ? '0' + n : '' + n)
    const later = (fn, ms) => timers.push(setTimeout(fn, ms))
    const clearTimers = () => {
        timers.forEach(clearTimeout)
        timers = []
    }
    const shuffle = a => {
        const r = a.slice()
        for (let i = r.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [r[i], r[j]] = [r[j], r[i]]
        }
        return r
    }
    const cardEls = () => Array.from(board.value ? board.value.children : [])
    const refresh = () => {
        nextTick(() => {
            if (alive) ScrollTrigger.refresh()
        })
    }
    const setMode = m => {
        mode.value = m
        refresh()
    }

    function build() {
        clearTimers()
        open = []
        busy = false
        moves.value = 0
        pairs.value = 0
        gen.value++
        const pick = shuffle(tools).slice(0, 8)
        deck.value = shuffle(pick.concat(pick)).map(tool => ({ tool, flipped: false, matched: false }))
        nextTick(() => {
            if (fx) fx.deal(cardEls())
        })
    }

    function flip(card) {
        if (busy || card.flipped || card.matched) return
        card.flipped = true
        open.push(card)
        if (open.length < 2) return
        busy = true
        moves.value++
        const [a, b] = open
        const els = [a, b].map(c => cardEls()[deck.value.indexOf(c)])
        if (a.tool.name === b.tool.name) {
            later(() => {
                a.flipped = false
                b.flipped = false
                a.matched = true
                b.matched = true
                if (fx) fx.match(els)
                pairs.value++
                open = []
                busy = false
                if (pairs.value === 8) win()
            }, calm ? 0 : 450)
        } else {
            later(() => fx && fx.miss(els), 450)
            later(() => {
                a.flipped = false
                b.flipped = false
                open = []
                busy = false
            }, calm ? 300 : 700)
        }
    }

    function win() {
        setMode('win')
        if (fx) nextTick(() => fx && fx.win())
        later(listAll, calm ? 600 : 1900)
    }

    function listAll() {
        clearTimers()
        setMode('won')
        if (fx) nextTick(() => fx && fx.list())
    }

    function showAll() {
        clearTimers()
        setMode('list')
        if (fx) nextTick(() => fx && fx.list())
    }

    function restart() {
        setMode('game')
        build()
    }

    build()

    onMounted(() => {
        alive = true
        gsap.registerPlugin(ScrollTrigger)
        const q = s => root.value.querySelector(s)
        const qa = s => Array.from(root.value.querySelectorAll(s))
        const once = (el, extra) => ({ trigger: el, start: 'top 88%', once: true, ...extra })
        mm = gsap.matchMedia()
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            qa('[data-rv]').forEach(el => {
                const ln = el.querySelector('.ln')
                gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: once(el) })
                if (ln) gsap.fromTo(ln, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.inOut', scrollTrigger: once(el) })
            })

            gsap.set(qa('.mem-card'), { opacity: 0 })
            fx = {
                deal: cards => {
                    gsap.fromTo(cards, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, stagger: { amount: 0.6, from: 'random' }, ease: 'power2.out' })
                },
                match: cards => {
                    gsap.fromTo(cards, { scale: 1 }, { scale: 1.07, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' })
                },
                miss: cards => {
                    gsap.fromTo(cards, { x: -4 }, { x: 4, duration: 0.07, yoyo: true, repeat: 3, ease: 'none', onComplete: () => gsap.set(cards, { x: 0 }) })
                },
                win: () => {
                    gsap.fromTo(q('.mem-win-t'), { opacity: 0, letterSpacing: '0.6em' }, { opacity: 1, letterSpacing: '0.1em', duration: 0.9, ease: 'expo.out' })
                    gsap.fromTo(q('.mem-win-s'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.5 })
                    gsap.fromTo(qa('.mem-win .cm'), { opacity: 0, scale: 2.4 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08 })
                },
                list: () => {
                    gsap.fromTo(qa('.tool'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: { amount: 0.7, from: 'random' }, ease: 'power2.out' })
                }
            }
            ScrollTrigger.create({ trigger: q('.mem-board'), start: 'top 92%', once: true, onEnter: () => fx && fx.deal(cardEls()) })
            gsap.fromTo(q('.mem-hud'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: once(q('.mem-hud')) })
            return () => {
                fx = null
            }
        })
    })

    onBeforeUnmount(() => {
        alive = false
        clearTimers()
        if (mm) mm.revert()
        mm = null
        fx = null
    })
</script>

<style scoped>
.sec, .sec *, .sec *::before, .sec *::after {
    box-sizing: border-box;
}

.sec {
    position: relative;
    z-index: 1;
    padding: 5rem 0 0;
}

.sec img {
    display: block;
    max-width: 100%;
}

.wrap {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 calc(var(--pad) + 14px);
}

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

.sec-head .sheet {
    color: var(--muted);
}

.tools-info {
    max-width: 62ch;
    color: #c9c6d3;
    margin: 0 0 2.2rem;
    font-weight: 300;
}

.tools-wrap {
    display: grid;
    gap: 14px;
    margin-bottom: 4rem;
}

.tile {
    position: relative;
    border-radius: 18px;
    padding: 1.3rem;
    background: linear-gradient(180deg, var(--surface-2), var(--surface));
    border: 1px solid var(--line);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 30px rgba(0, 0, 0, 0.35);
    overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.tile .label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-headers);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 1rem;
}

.tile .label::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 2px;
    background: var(--violet);
    box-shadow: 0 0 8px var(--violet);
}

.t-info .tools-info {
    margin: 0;
}

.tools-container {
    display: none;
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
    gap: 0.6rem;
}

.mem[data-mode="won"] .tools-container, .mem[data-mode="list"] .tools-container {
    display: grid;
}

.tool {
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    position: relative;
    border-radius: 12px;
    border: 1px solid var(--line);
    background: var(--surface);
    transition: border-color 0.25s, box-shadow 0.25s, translate 0.25s;
}

.lg {
    width: 54%;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
}

.lg img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: scale 0.25s;
}

.lg.plate {
    background: #eeecf4;
    border-radius: 7px;
    padding: 14%;
}

.tool:hover {
    translate: 0 -3px;
    border-color: var(--violet);
    box-shadow: 0 0 22px rgba(139, 92, 246, 0.35), inset 0 0 14px rgba(255, 42, 77, 0.15);
}

.tool:hover img {
    scale: 1.15;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font: 600 0.92rem var(--font-body);
    text-transform: none;
    letter-spacing: normal;
    color: #fff;
    padding: 0.7rem 1.3rem;
    border-radius: 12px;
    border: 1px solid transparent;
    background: linear-gradient(135deg, var(--base-color), #c4143a);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
    transition: translate 0.25s, box-shadow 0.25s, filter 0.25s, border-color 0.25s;
}

.btn:hover {
    translate: 0 -2px;
    box-shadow: 0 8px 28px rgba(255, 42, 77, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25);
    filter: brightness(1.1);
}

.btn.ghost {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.16);
    box-shadow: none;
}

.btn.ghost:hover {
    border-color: var(--violet);
    box-shadow: 0 0 24px rgba(139, 92, 246, 0.35);
    filter: none;
}

.btn.sm {
    padding: 0.45rem 0.9rem;
    font-size: 0.85rem;
}

.mem {
    padding: 1.1rem;
}

.mem-hud {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.7rem;
    margin: 0 auto 1rem;
    max-width: 520px;
}

.mem-stats {
    display: flex;
    gap: 1.2rem;
    font-family: var(--font-headers);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
}

.mem-stats b {
    color: #fff;
    font-weight: 500;
    margin-left: 0.3rem;
}

.mem-actions {
    display: flex;
    gap: 0.5rem;
}

.mem-stage {
    position: relative;
    max-width: 520px;
    margin: 0 auto;
}

.mem[data-mode="list"] .mem-stage, .mem[data-mode="won"] .mem-stage {
    display: none;
}

.mem-board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}

.mem-card {
    position: relative;
    perspective: 700px;
    border: 0;
    padding: 0;
    background: none;
    cursor: pointer;
    aspect-ratio: 1 / 1.06;
    display: block;
    width: 100%;
    font: inherit;
    color: inherit;
}

.mem-card:focus-visible {
    outline: 2px solid var(--violet);
    outline-offset: 3px;
    border-radius: 14px;
}

.mem-in {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
    transition: transform 0.5s;
}

.mem-card.flipped .mem-in, .mem-card.matched .mem-in {
    transform: rotateY(180deg);
}

.mem-back, .mem-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    display: grid;
    place-items: center;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.16);
}

.mem-back {
    background: linear-gradient(160deg, #1a1a26, var(--surface));
    transition: border-color 0.25s, box-shadow 0.25s;
}

.mem-back span {
    font-family: var(--font-headers);
    color: var(--violet);
    font-size: 1.1rem;
}

.mem-card:hover .mem-back {
    border-color: var(--violet);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.35), inset 0 0 16px rgba(255, 42, 77, 0.12);
}

.mem-face {
    transform: rotateY(180deg);
    background: var(--surface);
    align-content: center;
    gap: 0.4rem;
    text-align: center;
}

.mem-face .lg {
    width: 44%;
    margin: 0 auto;
}

.mem-face span.nm {
    font-family: var(--font-headers);
    font-size: 0.6rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #c9c6d3;
}

.mem-card.matched .mem-face {
    border-color: var(--violet);
    box-shadow: 0 0 22px rgba(139, 92, 246, 0.35), inset 0 0 18px rgba(255, 42, 77, 0.14);
}

.mem-card.matched {
    cursor: default;
}

.mem-win {
    position: absolute;
    inset: 0;
    display: none;
    place-content: center;
    text-align: center;
    background: rgba(8, 8, 12, 0.86);
    border-radius: 14px;
    z-index: 5;
}

.mem[data-mode="win"] .mem-win {
    display: grid;
}

.mem-win-t {
    font-size: clamp(1.6rem, 7vw, 2.6rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(100deg, #ff4d6d, var(--violet));
    background-clip: text;
    color: transparent;
}

.mem-win-s {
    font-family: var(--font-headers);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 0.5rem;
}

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
    .tool, .tile, .mem-card {
        isolation: isolate;
    }

    .tool::before, .tile::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        z-index: -1;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
        background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(155, 107, 255, 0.15), rgba(255, 45, 85, 0.06) 45%, transparent 70%);
    }

    .tool::after, .tile::after, .mem-card::after {
        content: '';
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        padding: 1px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
        background: radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), var(--base-color), var(--violet) 55%, transparent 80%);
        mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
    }

    .mem-card::after {
        inset: 0;
        border-radius: 14px;
        z-index: 3;
    }

    .tool:hover::before, .tile:hover::before, .tool:hover::after, .tile:hover::after, .mem-card:hover::after {
        opacity: 1;
    }

    .mem-card:hover .mem-back {
        background-image: radial-gradient(130px circle at var(--mx, 50%) var(--my, 50%), rgba(155, 107, 255, 0.28), rgba(255, 45, 85, 0.1) 50%, transparent 75%), linear-gradient(160deg, #1a1a26, var(--surface));
    }

    .mem-card:hover .mem-face {
        background-image: radial-gradient(130px circle at var(--mx, 50%) var(--my, 50%), rgba(155, 107, 255, 0.2), rgba(255, 45, 85, 0.08) 50%, transparent 75%);
    }
}

@media (min-width: 768px) {
    .mem-face span.nm {
        font-size: 0.7rem;
    }

    .mem-board {
        gap: 12px;
    }

    .tools-container {
        grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
    }
}

@media (min-width: 1024px) {
    .tools-wrap {
        grid-template-columns: 1fr 2fr;
        align-items: start;
    }
}

@media (prefers-reduced-motion: reduce) {
    .mem-in {
        transition: none;
    }
}
</style>
