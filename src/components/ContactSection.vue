<template>
    <section id="contact" ref="root" class="sec">
        <div class="wrap">
            <div class="sec-head" data-rv>
                <span class="no">05</span><h2>Contact</h2><span class="ln" /><span class="sheet">Title block</span>
            </div>
            <div class="contact-wrap">
                <div class="cw main" data-rv>
                    <div class="ct">
                        <div class="ct-in main">
                            <div>
                                <div class="label">
                                    new message
                                </div>
                                <p class="contact-line">
                                    Have a product in mind or a project that needs a builder? Let's talk.
                                </p>
                            </div>
                            <div>
                                <button id="emailBtn" class="btn" type="button" @click="email">
                                    Email me
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cw" data-rv>
                    <div class="ct">
                        <div class="ct-in">
                            <div class="label">
                                location
                            </div>
                            <div class="loc-line">
                                Thessaloniki, Greece
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cw" data-rv>
                    <div class="ct">
                        <div class="ct-in">
                            <div class="label">
                                find me
                            </div>
                            <div class="socials">
                                <a href="https://github.com/abregre" target="_blank" rel="noopener">GitHub<span>&#8599;</span></a>
                                <a href="https://linkedin.com/in/vpaparidis" target="_blank" rel="noopener">LinkedIn<span>&#8599;</span></a>
                                <a href="https://stackoverflow.com/users/12664279/abregre" target="_blank" rel="noopener">StackOverflow<span>&#8599;</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    const root = ref(null)
    let mm = null

    const email = () => {
        const addr = ['v.paparidis', 'gmail.com'].join('@')
        location.href = 'mailto:' + addr
    }

    onMounted(() => {
        gsap.registerPlugin(ScrollTrigger)
        mm = gsap.matchMedia()
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            Array.from(root.value.querySelectorAll('[data-rv]')).forEach(el => {
                const ln = el.querySelector('.ln')
                const st = { trigger: el, start: 'top 88%', once: true }
                gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: st })
                if (ln) gsap.fromTo(ln, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.inOut', scrollTrigger: st })
            })
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
    padding: 5rem 0;
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

.ct-in .label {
    font-family: var(--font-headers);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--violet);
    margin-bottom: 0.9rem;
}

.contact-wrap {
    display: grid;
    gap: 1rem;
}

.cw {
    position: relative;
    filter: drop-shadow(0 0 8px rgba(255, 45, 85, 0.28));
}

.cw.main {
    filter: drop-shadow(0 0 14px rgba(255, 45, 85, 0.42));
}

.ct {
    height: 100%;
    padding: 1px;
    background: linear-gradient(135deg, var(--base-color), var(--violet) 60%, rgba(255, 255, 255, 0.25));
    clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px));
}

.ct-in {
    height: 100%;
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    background: var(--surface);
    clip-path: polygon(0 0, calc(100% - 17px) 0, 100% 17px, 100% 100%, 17px 100%, 0 calc(100% - 17px));
}

.ct-in.main {
    padding: 2rem 1.6rem;
    justify-content: space-between;
    background: linear-gradient(135deg, rgba(255, 45, 85, 0.1), transparent 55%), var(--surface);
}

.contact-line {
    margin: 0;
    font-size: clamp(1.6rem, 5vw, 2.6rem);
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.18;
    max-width: 20ch;
}

.loc-line {
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: -0.01em;
}

.socials {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: var(--font-headers);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.socials a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 0.9rem;
    color: #fff;
    text-decoration: none;
    border: 1px solid var(--line);
    background: var(--surface-2);
    transition: border-color 0.25s, box-shadow 0.25s, padding 0.25s;
}

.socials a span {
    color: var(--base-color);
}

.socials a:hover {
    border-color: var(--violet);
    box-shadow: var(--glow-violet);
    padding-left: 1.2rem;
}

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
    .btn, .socials a, .ct-in {
        position: relative;
        isolation: isolate;
    }

    .btn::before, .socials a::before, .ct-in::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
        background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(155, 107, 255, 0.15), rgba(255, 45, 85, 0.06) 45%, transparent 70%);
    }

    .btn::after, .socials a::after {
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

    .btn:hover::before, .socials a:hover::before, .ct-in:hover::before, .btn:hover::after, .socials a:hover::after {
        opacity: 1;
    }
}

@media (min-width: 1024px) {
    .contact-wrap {
        grid-template-columns: 1.5fr 1fr;
        grid-template-rows: auto 1fr;
    }

    .cw.main {
        grid-row: span 2;
    }
}
</style>
