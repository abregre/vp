<template>
    <section id="books" ref="root" class="sec">
        <div class="wrap">
            <div class="books-info" data-rv>
                Here are some books that I am reading through over and over again.<br>I want to suggest these books since they are a great source of deep knowledge and guides to write better code.
            </div>
            <div class="shelf">
                <div class="shelf-stage">
                    <div class="shelf-scroll">
                        <div class="shelf-row">
                            <div v-for="(book, i) in books" :key="book.id" class="book">
                                <button
                                    class="spine"
                                    type="button"
                                    :aria-expanded="selected === i ? 'true' : 'false'"
                                    aria-controls="shelfDetail"
                                    :style="{ '--w': book.w + 'px', '--h': book.h + 'px', '--accent': book.accent }"
                                    @click="selected = i"
                                    @mouseenter="hoverSelect(i)"
                                >
                                    <i class="band t" /><i class="band b" /><span class="spine-i">{{ pad(i + 1) }}</span><span class="spine-t">{{ book.spine }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="shelf-board" />
                </div>
                <div id="shelfDetail" class="shelf-detail" aria-live="polite">
                    <span class="cm tl" /><span class="cm tr" /><span class="cm bl" /><span class="cm br" />
                    <div class="sd-tb">
                        <b>Shelf</b><span>Book {{ pad(selected + 1) }}</span>
                    </div>
                    <div class="sd-body">
                        <img class="book-cover" :src="covers['/src/assets/covers/' + current.cover]" :alt="current.alt">
                        <div class="book-info">
                            <div class="book-title">
                                <span class="strong-text">{{ current.strong }}</span>{{ current.rest }}
                            </div>
                            <p class="book-desc">
                                {{ current.desc }}
                            </p>
                            <div class="book-author">
                                <a :href="current.url" target="_blank" rel="noopener" class="strong-text">{{ current.author }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    const covers = import.meta.glob('@/assets/covers/*.png', { eager: true, import: 'default' })

    const books = [
        {
            id: 1,
            spine: 'Clean Code',
            w: 64,
            h: 300,
            accent: 'var(--base-color)',
            cover: 'cleanCode-cover.png',
            alt: 'Clean Code',
            strong: 'Clean Code',
            rest: ': A Handbook of Agile Software Craftsmanship',
            desc: 'A handbook of principles and examples for writing readable, maintainable code.',
            author: 'Robert C. Martin',
            url: 'https://cleancoder.com'
        },
        {
            id: 2,
            spine: 'The Clean Coder',
            w: 60,
            h: 290,
            accent: 'var(--violet)',
            cover: 'cleanCoder-cover.png',
            alt: 'The Clean Coder',
            strong: 'The Clean Coder',
            rest: ': A Code of Conduct for Professional Programmers',
            desc: 'A guide to professional conduct for programmers: estimating, committing to deadlines and saying no.',
            author: 'Robert C. Martin',
            url: 'https://cleancoder.com'
        },
        {
            id: 3,
            spine: 'Refactoring',
            w: 64,
            h: 310,
            accent: 'var(--base-color)',
            cover: 'refactoring-cover.png',
            alt: 'Refactoring',
            strong: 'Refactoring',
            rest: ': Improving the Design of Existing Code, 2nd Edition',
            desc: 'A catalogue of techniques for improving the design of existing code in small, safe steps.',
            author: 'Martin Fowler',
            url: 'https://martinfowler.com'
        },
        {
            id: 4,
            spine: 'Eloquent JavaScript',
            w: 68,
            h: 330,
            accent: 'var(--violet)',
            cover: 'eloquent-cover.png',
            alt: 'Eloquent JavaScript, 3rd Edition',
            strong: 'Eloquent JavaScript',
            rest: ', 3rd Edition: A Modern Introduction to Programming',
            desc: 'An introduction to programming with JavaScript, with exercises and projects for the browser and Node.js.',
            author: 'Marijn Haverbeke',
            url: 'https://marijnhaverbeke.nl'
        },
        {
            id: 5,
            spine: 'Head First Design Patterns',
            w: 78,
            h: 360,
            accent: 'var(--base-color)',
            cover: 'headFirst-cover.png',
            alt: 'Head First Design Patterns, 2nd Edition',
            strong: 'Head First Design Patterns',
            rest: ', 2nd Edition',
            desc: 'A visual, hands-on introduction to object-oriented design patterns, explained through examples and exercises.',
            author: 'Eric Freeman & Elisabeth Robson',
            url: 'https://github.com/bethrobson/Head-First-Design-Patterns'
        },
        {
            id: 6,
            spine: 'CSS Secrets',
            w: 58,
            h: 270,
            accent: 'var(--violet)',
            cover: 'cssSecrets-cover.png',
            alt: 'CSS Secrets',
            strong: 'CSS Secrets',
            rest: '',
            desc: 'A collection of tips and tricks for solving everyday CSS problems with clever, compact solutions.',
            author: 'Lea Verou',
            url: 'https://lea.verou.me'
        }
    ]

    const root = ref(null)
    const selected = ref(0)
    const current = computed(() => books[selected.value])
    const pad = n => (n < 10 ? '0' + n : '' + n)
    const hoverSelect = i => {
        if (window.matchMedia('(hover: hover)').matches) selected.value = i
    }

    let mm = null

    onMounted(() => {
        gsap.registerPlugin(ScrollTrigger)
        const q = s => root.value.querySelector(s)
        const qa = s => Array.from(root.value.querySelectorAll(s))
        mm = gsap.matchMedia()
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            const el = q('.books-info')
            gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
            const shelfT = gsap.timeline({ scrollTrigger: { trigger: q('.shelf'), start: 'top 82%', once: true }, defaults: { ease: 'power2.out' } })
            shelfT.fromTo(q('.shelf-board'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.inOut' })
                .fromTo(qa('.book'), { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)' }, 0.3)
                .fromTo(q('.shelf-detail'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        })
    })

    onBeforeUnmount(() => {
        if (mm) mm.revert()
        mm = null
    })
</script>

<style scoped>
.sec, .sec *, .sec *::before, .sec *::after {
    box-sizing: border-box;
}

.sec {
    position: relative;
    z-index: 1;
    padding: 0 0 5rem;
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

.books-info {
    max-width: 62ch;
    color: #c6c6d2;
    margin: 0 0 2.2rem;
    font-weight: 300;
}

.shelf {
    display: grid;
    gap: 2rem;
}

.shelf-stage {
    min-width: 0;
}

.shelf-scroll {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    padding: 44px 8px 0;
    scrollbar-width: none;
    overscroll-behavior-x: contain;
}

.shelf-scroll::-webkit-scrollbar {
    display: none;
}

.shelf-row {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    width: max-content;
    min-width: 100%;
}

.book {
    flex: none;
    scroll-snap-align: center;
}

.spine {
    all: unset;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: var(--w);
    height: var(--h);
    padding: 14px 4px 12px;
    cursor: pointer;
    background: linear-gradient(180deg, #181824, #0d0d13);
    border: 1px solid var(--line-red);
    box-shadow: 0 0 14px rgba(255, 45, 85, 0.22), inset 0 0 14px rgba(255, 45, 85, 0.08);
    transition: transform 0.35s, border-color 0.25s, box-shadow 0.25s;
}

.spine .band {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--accent);
    box-shadow: 0 0 6px var(--accent);
}

.spine .band.t {
    top: 32px;
}

.spine .band.b {
    bottom: 12px;
}

.spine:hover, .spine[aria-expanded="true"], .spine:focus-visible {
    transform: translateY(-18px);
    border-color: var(--base-color);
    box-shadow: 0 0 22px rgba(255, 45, 85, 0.6), 0 0 44px rgba(155, 107, 255, 0.25), inset 0 0 18px rgba(255, 45, 85, 0.14);
}

.spine:focus-visible {
    outline: 1px solid var(--violet);
    outline-offset: 3px;
}

.spine-i {
    font-family: var(--font-headers);
    font-size: 0.62rem;
    color: var(--accent);
    letter-spacing: 0.1em;
}

.spine-t {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    flex: 1;
    margin-top: 22px;
    font-family: var(--font-headers);
    font-size: 0.92rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}

.spine[aria-expanded="true"] .spine-t {
    text-shadow: var(--text-shadow-light);
}

.shelf-board {
    height: 14px;
    margin: 0 -2px;
    background: repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0 1px, transparent 1px 7px), linear-gradient(#1a0b10, #0b0508);
    border-top: 2px solid var(--base-color);
    box-shadow: 0 -2px 18px rgba(255, 45, 85, 0.55), 0 12px 28px rgba(0, 0, 0, 0.8);
    transform-origin: left;
}

.shelf-detail {
    position: relative;
    border: 1px solid var(--line);
    background: rgba(13, 13, 19, 0.78);
}

.shelf-detail .cm {
    position: absolute;
    width: 14px;
    height: 14px;
    border: 0 solid var(--base-color);
    filter: drop-shadow(0 0 4px rgba(255, 45, 85, 0.7));
}

.shelf-detail .cm.tl {
    top: -6px;
    left: -6px;
    border-top-width: 1px;
    border-left-width: 1px;
}

.shelf-detail .cm.tr {
    top: -6px;
    right: -6px;
    border-top-width: 1px;
    border-right-width: 1px;
}

.shelf-detail .cm.bl {
    bottom: -6px;
    left: -6px;
    border-bottom-width: 1px;
    border-left-width: 1px;
}

.shelf-detail .cm.br {
    bottom: -6px;
    right: -6px;
    border-bottom-width: 1px;
    border-right-width: 1px;
}

.sd-tb {
    padding: 0.6rem 0.9rem;
    border-bottom: 1px solid var(--line);
    font-family: var(--font-headers);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
}

.sd-tb b {
    color: var(--base-color);
    font-weight: 400;
    margin-right: 0.8rem;
    text-shadow: var(--text-shadow-light);
}

.sd-body {
    display: flex;
    gap: 1.4rem;
    align-items: flex-start;
    padding: 1.4rem;
}

.book-cover {
    width: 120px;
    flex: none;
    border: 1px solid var(--line-red);
    box-shadow: 0 0 0 1px rgba(255, 45, 85, 0.15), 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 26px rgba(255, 45, 85, 0.3);
}

.book-info {
    min-width: 0;
}

.book-title {
    font-size: 1.05rem;
    line-height: 1.45;
    color: #c6c6d2;
    font-weight: 300;
}

.book-title .strong-text {
    color: #fff;
    font-weight: 700;
    font-size: inherit;
}

.book-desc {
    margin: 0.6rem 0 0;
    font-size: 0.92rem;
    line-height: 1.5;
    color: var(--muted);
    font-weight: 300;
}

.book-author {
    margin-top: 0.7rem;
    font-family: var(--font-headers);
    font-size: 0.78rem;
}

.book-author a {
    color: var(--violet);
    text-decoration: none;
}

.book-author a.strong-text {
    font-size: inherit;
}

.book-author a:hover {
    text-shadow: var(--glow-violet);
}

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
    .shelf-detail, .spine {
        position: relative;
        isolation: isolate;
    }

    .shelf-detail::before, .spine::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
        background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(155, 107, 255, 0.15), rgba(255, 45, 85, 0.06) 45%, transparent 70%);
    }

    .shelf-detail::after, .spine::after {
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

    .shelf-detail:hover::before, .spine:hover::before, .shelf-detail:hover::after, .spine:hover::after {
        opacity: 1;
    }
}

@media (min-width: 768px) {
    .book-cover {
        width: 150px;
    }
}

@media (min-width: 1024px) {
    .shelf {
        grid-template-columns: minmax(0, 560px) 1fr;
        align-items: end;
    }

    .book-cover {
        width: 170px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .spine {
        transition: none;
    }
}
</style>
