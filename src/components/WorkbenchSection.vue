<template>
    <section id="workbench" ref="root" class="sec">
        <div class="wrap">
            <div class="sec-head" data-rv>
                <span class="no">04</span>
                <h2>Workbench</h2>
                <span class="ln" />
                <span class="sheet">4 tools</span>
            </div>
            <p class="tools-info" data-rv>
                Tools I built this site with.
            </p>
            <div class="wb-grid">
                <article class="tile wb-tile">
                    <div class="wb-head">
                        <span class="label">neon glow</span>
                        <span class="wb-prop">box-shadow, text-shadow</span>
                    </div>
                    <div class="wb-stage">
                        <div class="wb-glow-box" :style="glowStyle">
                            Neon
                        </div>
                    </div>
                    <div class="wb-ctl">
                        <div class="ctl">
                            <div class="ctl-h">
                                <span>Colour</span>
                                <output>{{ glow.color }}</output>
                            </div>
                            <div class="ctl-row">
                                <input v-model="glow.color" type="color" aria-label="Glow colour">
                                <button
                                    v-for="c in glowColors"
                                    :key="c.hex"
                                    class="chip"
                                    type="button"
                                    :aria-pressed="glow.color === c.hex"
                                    @click="glow.color = c.hex"
                                >
                                    {{ c.name }}
                                </button>
                            </div>
                        </div>
                        <div class="ctl">
                            <div class="ctl-h">
                                <span>Target</span>
                            </div>
                            <div class="ctl-row">
                                <button
                                    v-for="t in glowTargets"
                                    :key="t"
                                    class="chip"
                                    type="button"
                                    :aria-pressed="glow.target === t"
                                    @click="setGlowTarget(t)"
                                >
                                    {{ t }}
                                </button>
                            </div>
                        </div>
                        <div class="ctl">
                            <label class="ctl-h" for="wb-glow-blur"><span>Blur</span><output>{{ glow.blur }} px</output></label>
                            <input id="wb-glow-blur" v-model.number="glow.blur" type="range" min="0" max="40" step="1">
                        </div>
                        <div class="ctl">
                            <label class="ctl-h" for="wb-glow-spread"><span>Spread</span><output>{{ glowUse.box ? glow.spread + ' px' : 'box only' }}</output></label>
                            <input id="wb-glow-spread" v-model.number="glow.spread" type="range" min="0" max="16" step="1" :disabled="!glowUse.box">
                        </div>
                        <div class="ctl">
                            <label class="ctl-h" for="wb-glow-int"><span>Intensity</span><output>{{ glow.intensity }} %</output></label>
                            <input id="wb-glow-int" v-model.number="glow.intensity" type="range" min="0" max="100" step="1">
                        </div>
                    </div>
                    <div class="wb-out">
                        <pre class="wb-code"><code>{{ glowOut }}</code></pre>
                        <div class="wb-btns">
                            <button class="btn sm" type="button" aria-live="polite" @click="copy('glow', glowOut)">
                                {{ labels.glow }}
                            </button>
                            <button class="btn sm ghost" type="button" @click="resetGlow">
                                Reset
                            </button>
                        </div>
                    </div>
                </article>

                <article class="tile wb-tile">
                    <div class="wb-head">
                        <span class="label">cut corners</span>
                        <span class="wb-prop">clip-path</span>
                    </div>
                    <div class="wb-stage">
                        <div class="wb-cut" :style="{ clipPath: cutValue }">
                            Cut
                        </div>
                    </div>
                    <div class="wb-ctl">
                        <div class="ctl">
                            <div class="ctl-h">
                                <span>Corners</span>
                            </div>
                            <div class="ctl-row">
                                <button
                                    v-for="k in corners"
                                    :key="k"
                                    class="chip"
                                    type="button"
                                    :aria-pressed="cut.on[k]"
                                    @click="cut.on[k] = !cut.on[k]"
                                >
                                    {{ k.toUpperCase() }}
                                </button>
                            </div>
                        </div>
                        <div class="ctl">
                            <div class="ctl-h">
                                <span>Size</span>
                            </div>
                            <div class="ctl-row">
                                <button class="chip" type="button" :aria-pressed="cut.linked" @click="toggleLink">
                                    Link
                                </button>
                            </div>
                        </div>
                        <div v-if="cut.linked" class="ctl">
                            <label class="ctl-h" for="wb-cut-size"><span>All corners</span><output>{{ cut.size }} px</output></label>
                            <input id="wb-cut-size" v-model.number="cut.size" type="range" min="4" max="48" step="1">
                        </div>
                        <div v-else class="cut-many">
                            <div v-for="k in corners" :key="k" class="ctl">
                                <label class="ctl-h" :for="'wb-cut-' + k"><span>{{ k.toUpperCase() }}</span><output>{{ cut.on[k] ? cut.each[k] + ' px' : 'off' }}</output></label>
                                <input :id="'wb-cut-' + k" v-model.number="cut.each[k]" type="range" min="4" max="48" step="1" :disabled="!cut.on[k]">
                            </div>
                        </div>
                    </div>
                    <div class="wb-out">
                        <pre class="wb-code"><code>{{ cutOut }}</code></pre>
                        <div class="wb-btns">
                            <button class="btn sm" type="button" aria-live="polite" @click="copy('cut', cutOut)">
                                {{ labels.cut }}
                            </button>
                            <button class="btn sm ghost" type="button" @click="resetCut">
                                Reset
                            </button>
                        </div>
                    </div>
                </article>

                <article class="tile wb-tile">
                    <div class="wb-head">
                        <span class="label">clamp() type</span>
                        <span class="wb-prop">font-size</span>
                    </div>
                    <div class="wb-stage vp">
                        <div class="wb-vp" :style="{ width: (type.sim / 16) + '%' }">
                            <span class="wb-vp-lab">{{ type.sim }} px</span>
                            <span class="wb-vp-txt" :style="{ fontSize: typeCalc.px + 'px' }">Fluid</span>
                        </div>
                    </div>
                    <div class="wb-ctl">
                        <div class="ctl">
                            <div class="ctl-h">
                                <span>Preset</span>
                            </div>
                            <div class="ctl-row">
                                <button
                                    v-for="p in presets"
                                    :key="p.name"
                                    class="chip"
                                    type="button"
                                    :aria-pressed="parseFloat(type.min) === p.min && parseFloat(type.max) === p.max"
                                    @click="applyPreset(p)"
                                >
                                    {{ p.name }}
                                </button>
                            </div>
                        </div>
                        <div class="ctl">
                            <div class="ctl-h">
                                <span>Size</span>
                            </div>
                            <div class="ctl-pair">
                                <label class="num" for="wb-cl-min">Min px<input id="wb-cl-min" v-model.number="type.min" type="number" min="1" step="1" inputmode="decimal"></label>
                                <label class="num" for="wb-cl-max">Max px<input id="wb-cl-max" v-model.number="type.max" type="number" min="1" step="1" inputmode="decimal"></label>
                            </div>
                        </div>
                        <div class="ctl">
                            <div class="ctl-h">
                                <span>Viewport</span>
                            </div>
                            <div class="ctl-pair">
                                <label class="num" for="wb-cl-vmin">Min px<input id="wb-cl-vmin" v-model.number="type.vmin" type="number" min="1" step="1" inputmode="decimal"></label>
                                <label class="num" for="wb-cl-vmax">Max px<input id="wb-cl-vmax" v-model.number="type.vmax" type="number" min="1" step="1" inputmode="decimal"></label>
                            </div>
                        </div>
                        <div class="ctl">
                            <div class="ctl-h">
                                <span>Output</span>
                            </div>
                            <div class="ctl-pair split">
                                <div class="ctl-row">
                                    <button
                                        v-for="u in units"
                                        :key="u"
                                        class="chip"
                                        type="button"
                                        :aria-pressed="type.unit === u"
                                        @click="type.unit = u"
                                    >
                                        {{ u }}
                                    </button>
                                </div>
                                <label class="num" for="wb-cl-root">Root px<input id="wb-cl-root" v-model.number="type.root" type="number" min="1" step="1" inputmode="decimal" :disabled="type.unit !== 'rem'"></label>
                            </div>
                        </div>
                        <div class="ctl">
                            <label class="ctl-h" for="wb-cl-sim"><span>Simulated width</span><output>{{ type.sim }} px → {{ typeCalc.shown }} px</output></label>
                            <input id="wb-cl-sim" v-model.number="type.sim" type="range" min="320" max="1600" step="10">
                        </div>
                    </div>
                    <div class="wb-out">
                        <pre class="wb-code"><code>{{ typeCalc.out }}</code></pre>
                        <div class="wb-maths">
                            <span>{{ typeCalc.m1 }}</span>
                            <span>{{ typeCalc.m2 }}</span>
                            <span>{{ typeCalc.m3 }}</span>
                        </div>
                        <div class="wb-btns">
                            <button class="btn sm" type="button" aria-live="polite" @click="copy('type', typeCalc.out)">
                                {{ labels.type }}
                            </button>
                            <button class="btn sm ghost" type="button" @click="resetType">
                                Reset
                            </button>
                        </div>
                    </div>
                </article>

                <article class="tile wb-tile">
                    <div class="wb-head">
                        <span class="label">palette</span>
                        <span class="wb-prop">--c-100 to --c-900</span>
                    </div>
                    <div class="wb-stage pal">
                        <div class="wb-sws" :style="{ gridTemplateColumns: 'repeat(' + palRows.length + ', minmax(0, 1fr))' }">
                            <div v-for="r in palRows" :key="r.n" class="wb-sw" :title="'--c-' + r.n + ': ' + r.shown">
                                <i :style="{ background: r.hex }" />
                                <span>{{ r.n }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="wb-ctl">
                        <div class="ctl">
                            <div class="ctl-h">
                                <span>Base colour</span>
                                <output>{{ pal.color }}</output>
                            </div>
                            <div class="ctl-row">
                                <input v-model="pal.color" type="color" aria-label="Base colour">
                            </div>
                        </div>
                        <div class="ctl">
                            <div class="ctl-h">
                                <span>Steps</span>
                            </div>
                            <div class="ctl-row">
                                <button
                                    v-for="n in palSteps"
                                    :key="n"
                                    class="chip"
                                    type="button"
                                    :aria-pressed="pal.steps === n"
                                    @click="setPalSteps(n)"
                                >
                                    {{ n }}
                                </button>
                            </div>
                        </div>
                        <div class="ctl">
                            <div class="ctl-h">
                                <span>Format</span>
                            </div>
                            <div class="ctl-row">
                                <button
                                    v-for="f in palFormats"
                                    :key="f"
                                    class="chip"
                                    type="button"
                                    :aria-pressed="pal.format === f"
                                    @click="pal.format = f"
                                >
                                    {{ f }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="wb-out">
                        <pre class="wb-code"><code>{{ palOut }}</code></pre>
                        <div class="wb-btns">
                            <button class="btn sm" type="button" aria-live="polite" @click="copy('pal', palOut)">
                                {{ labels.pal }}
                            </button>
                            <button class="btn sm ghost" type="button" @click="resetPal">
                                Reset
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref, reactive, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    const root = ref(null)
    let mm = null
    let alive = false

    const refresh = () => {
        nextTick(() => {
            if (alive) ScrollTrigger.refresh()
        })
    }

    const fmt = (n, d) => String(+n.toFixed(d == null ? 4 : d))
    const hex2rgb = h => {
        const n = parseInt(h.slice(1), 16)
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    }

    const glowDefaults = { color: '#ff2d55', target: 'both', blur: 12, spread: 0, intensity: 70 }
    const glowColors = [
        { name: 'Crimson', hex: '#ff2d55' },
        { name: 'Violet', hex: '#9b6bff' }
    ]
    const glowTargets = ['box', 'text', 'both']
    const glow = reactive({ ...glowDefaults })
    const glowUse = computed(() => ({ box: glow.target !== 'text', text: glow.target !== 'box' }))
    const glowCss = computed(() => {
        const rgb = hex2rgb(glow.color).join(', ')
        const bl = glow.blur
        const sp = glow.spread
        const i = glow.intensity / 100
        const spx = sp ? ' ' + sp + 'px' : ''
        return {
            box: '0 0 ' + Math.round(bl / 2) + 'px' + spx + ' rgba(' + rgb + ', ' + fmt(i, 2) + '), 0 0 ' + Math.round(bl * 1.5) + 'px' + spx + ' rgba(' + rgb + ', ' + fmt(i * 0.36, 2) + ')',
            text: '0 0 ' + Math.round(bl * 0.67) + 'px rgba(' + rgb + ', ' + fmt(i * 0.57, 2) + ')'
        }
    })
    const glowStyle = computed(() => ({
        borderColor: glowUse.value.box ? glow.color : undefined,
        boxShadow: glowUse.value.box ? glowCss.value.box : 'none',
        textShadow: glowUse.value.text ? glowCss.value.text : 'none'
    }))
    const glowOut = computed(() => [
        glowUse.value.box ? 'box-shadow: ' + glowCss.value.box + ';' : '',
        glowUse.value.text ? 'text-shadow: ' + glowCss.value.text + ';' : ''
    ].filter(Boolean).join('\n'))
    const setGlowTarget = t => {
        glow.target = t
        refresh()
    }
    const resetGlow = () => {
        Object.assign(glow, glowDefaults)
        refresh()
    }

    const corners = ['tl', 'tr', 'br', 'bl']
    const cutDefaults = {
        linked: true,
        size: 18,
        on: { tl: false, tr: true, br: false, bl: true },
        each: { tl: 18, tr: 18, br: 18, bl: 18 }
    }
    const cutFresh = () => ({
        ...cutDefaults,
        on: { ...cutDefaults.on },
        each: { ...cutDefaults.each }
    })
    const cut = reactive(cutFresh())
    const cutValue = computed(() => {
        const c = cut.on
        const z = {}
        corners.forEach(k => {
            z[k] = (cut.linked ? cut.size : cut.each[k]) + 'px'
        })
        const p = []
        if (c.tl) {
            p.push('0 ' + z.tl)
            p.push(z.tl + ' 0')
        } else p.push('0 0')
        if (c.tr) {
            p.push('calc(100% - ' + z.tr + ') 0')
            p.push('100% ' + z.tr)
        } else p.push('100% 0')
        if (c.br) {
            p.push('100% calc(100% - ' + z.br + ')')
            p.push('calc(100% - ' + z.br + ') 100%')
        } else p.push('100% 100%')
        if (c.bl) {
            p.push(z.bl + ' 100%')
            p.push('0 calc(100% - ' + z.bl + ')')
        } else p.push('0 100%')
        return 'polygon(' + p.join(', ') + ')'
    })
    const cutOut = computed(() => 'clip-path: ' + cutValue.value + ';')
    const toggleLink = () => {
        cut.linked = !cut.linked
        if (!cut.linked) corners.forEach(k => {
            cut.each[k] = cut.size
        })
        refresh()
    }
    const resetCut = () => {
        Object.assign(cut, cutFresh())
        refresh()
    }

    const typeDefaults = { min: 16, max: 48, vmin: 375, vmax: 1240, unit: 'rem', root: 16, sim: 800 }
    const presets = [
        { name: 'Body', min: 16, max: 18 },
        { name: 'H2', min: 24, max: 36 },
        { name: 'H1', min: 32, max: 64 }
    ]
    const units = ['rem', 'px']
    const type = reactive({ ...typeDefaults })
    let typeLast = null
    const typeCalc = computed(() => {
        const mn = parseFloat(type.min)
        const mx = parseFloat(type.max)
        const v1 = parseFloat(type.vmin)
        let v2 = parseFloat(type.vmax)
        const rt = parseFloat(type.root)
        const vp = type.sim
        const rem = type.unit === 'rem'
        if (isNaN(mn) || isNaN(mx) || isNaN(v1) || isNaN(v2) || !(rt > 0)) return typeLast
        if (v2 <= v1) v2 = v1 + 1
        const slope = (mx - mn) / (v2 - v1)
        const ic = mn - slope * v1
        const vw = slope * 100
        const u = px => (rem ? fmt(px / rt) + 'rem' : fmt(px) + 'px')
        const decl = 'clamp(' + u(mn) + ', ' + u(ic) + ' ' + (vw < 0 ? '-' : '+') + ' ' + fmt(Math.abs(vw)) + 'vw, ' + u(mx) + ')'
        const px = Math.max(mn, Math.min(ic + slope * vp, mx))
        typeLast = {
            out: 'font-size: ' + decl + ';',
            m1: 'slope = (' + fmt(mx) + ' − ' + fmt(mn) + ') / (' + fmt(v2) + ' − ' + fmt(v1) + ') = ' + fmt(slope),
            m2: 'vw = slope × 100 = ' + fmt(vw) + 'vw',
            m3: 'intercept = ' + fmt(mn) + ' − ' + fmt(slope) + ' × ' + fmt(v1) + ' = ' + fmt(ic) + 'px' + (rem ? ' = ' + fmt(ic / rt) + 'rem' : ''),
            px,
            shown: fmt(px, 1)
        }
        return typeLast
    })
    const applyPreset = p => {
        type.min = p.min
        type.max = p.max
    }
    const resetType = () => {
        Object.assign(type, typeDefaults)
    }

    const lin = c => {
        c /= 255
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    }
    const enc = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055)
    const toLch = h => {
        const q = hex2rgb(h)
        const r = lin(q[0])
        const g = lin(q[1])
        const b = lin(q[2])
        const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
        const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
        const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
        const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s
        const A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s
        const B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
        return [L, Math.hypot(A, B), Math.atan2(B, A)]
    }
    const lch2lin = (L, C, H) => {
        const A = C * Math.cos(H)
        const B = C * Math.sin(H)
        const l = Math.pow(L + 0.3963377774 * A + 0.2158037573 * B, 3)
        const m = Math.pow(L - 0.1055613458 * A - 0.0638541728 * B, 3)
        const s = Math.pow(L - 0.0894841775 * A - 1.2914855480 * B, 3)
        return [
            4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
            -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
            -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
        ]
    }
    const inGamut = v => v.every(x => x >= -0.0001 && x <= 1.0001)
    const lch2hex = (L, C, H) => {
        let lo = 0
        let hi = C
        if (inGamut(lch2lin(L, C, H))) lo = C
        else {
            for (let i = 0; i < 24; i++) {
                const mid = (lo + hi) / 2
                if (inGamut(lch2lin(L, mid, H))) lo = mid
                else hi = mid
            }
        }
        return '#' + lch2lin(L, lo, H).map(x => {
            const n = Math.round(Math.min(1, Math.max(0, enc(Math.min(1, Math.max(0, x))))) * 255)
            return (n < 16 ? '0' : '') + n.toString(16)
        }).join('')
    }
    const hsl = h => {
        const q = hex2rgb(h).map(x => x / 255)
        const mx = Math.max(...q)
        const mn = Math.min(...q)
        const l = (mx + mn) / 2
        const d = mx - mn
        let hh = 0
        let ss = 0
        if (d) {
            ss = d / (1 - Math.abs(2 * l - 1))
            hh = mx === q[0] ? ((q[1] - q[2]) / d) % 6 : mx === q[1] ? (q[2] - q[0]) / d + 2 : (q[0] - q[1]) / d + 4
            hh = (hh * 60 + 360) % 360
        }
        return 'hsl(' + Math.round(hh) + ' ' + Math.round(ss * 100) + '% ' + Math.round(l * 100) + '%)'
    }
    const oklch = h => {
        const c = toLch(h)
        const H = c[2] * 180 / Math.PI
        return 'oklch(' + fmt(c[0] * 100, 1) + '% ' + fmt(c[1], 3) + ' ' + fmt(H < 0 ? H + 360 : H, 1) + ')'
    }

    const stepNames = [100, 200, 300, 400, 500, 600, 700, 800, 900]
    const Ls = [0.96, 0.9, 0.82, 0.73, 0.64, 0.55, 0.45, 0.35, 0.25]
    const Cf = [0.3, 0.5, 0.7, 0.88, 1, 1, 0.92, 0.78, 0.6]
    const palSteps = [5, 9]
    const palFormats = ['hex', 'hsl', 'oklch']
    const palDefaults = { color: '#ff2d55', steps: 9, format: 'hex' }
    const pal = reactive({ ...palDefaults })
    const palRows = computed(() => {
        const base = pal.color
        const lch = toLch(base)
        const idx = pal.steps === 5 ? [0, 2, 4, 6, 8] : [0, 1, 2, 3, 4, 5, 6, 7, 8]
        let k = 0
        let best = 9
        idx.forEach(j => {
            const d = Math.abs(Ls[j] - lch[0])
            if (d < best) {
                best = d
                k = j
            }
        })
        const show = h => (pal.format === 'hsl' ? hsl(h) : pal.format === 'oklch' ? oklch(h) : h)
        return idx.map(i => {
            const hex = i === k ? base : lch2hex(Ls[i], lch[1] * Cf[i], lch[2])
            return { n: stepNames[i], hex, shown: show(hex) }
        })
    })
    const palOut = computed(() => ':root {\n' + palRows.value.map(r => '  --c-' + r.n + ': ' + r.shown + ';').join('\n') + '\n}')
    const setPalSteps = n => {
        pal.steps = n
        refresh()
    }
    const resetPal = () => {
        Object.assign(pal, palDefaults)
        refresh()
    }

    const labels = reactive({ glow: 'Copy CSS', cut: 'Copy CSS', type: 'Copy CSS', pal: 'Copy CSS' })
    const copyTimers = {}
    const legacyCopy = text => {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.top = '0'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        let ok = false
        try {
            ok = document.execCommand('copy')
        } catch {
            ok = false
        }
        document.body.removeChild(ta)
        return ok
    }
    const copy = async(key, text) => {
        let ok = false
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(text)
                ok = true
            }
        } catch {
            ok = false
        }
        if (!ok) ok = legacyCopy(text)
        labels[key] = ok ? 'Copied' : 'Copy failed'
        clearTimeout(copyTimers[key])
        copyTimers[key] = setTimeout(() => {
            labels[key] = 'Copy CSS'
        }, 1500)
    }

    onMounted(() => {
        alive = true
        gsap.registerPlugin(ScrollTrigger)
        const qa = s => Array.from(root.value.querySelectorAll(s))
        const once = (el, extra) => ({ trigger: el, start: 'top 88%', once: true, ...extra })
        mm = gsap.matchMedia()
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            qa('[data-rv]').forEach(el => {
                const ln = el.querySelector('.ln')
                gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: once(el) })
                if (ln) gsap.fromTo(ln, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.inOut', scrollTrigger: once(el) })
            })
            qa('.wb-tile').forEach((el, i) => {
                gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, delay: (i % 2) * 0.1, ease: 'power2.out', scrollTrigger: once(el) })
            })
        })
    })

    onBeforeUnmount(() => {
        alive = false
        Object.values(copyTimers).forEach(clearTimeout)
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

.tools-info {
    max-width: 62ch;
    color: #c9c6d3;
    margin: 0 0 2.2rem;
    font-weight: 300;
}

.wb-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(0, 1fr);
}

.wb-tile {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 1.2rem;
    background: rgba(13, 13, 19, 0.78);
    border: 1px solid var(--line);
}

.wb-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 1.1rem;
    flex-wrap: wrap;
}

.wb-head .label {
    font-family: var(--font-headers);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--violet);
    margin-bottom: 0;
}

.wb-prop {
    font-family: var(--font-headers);
    font-size: 0.64rem;
    letter-spacing: 0.08em;
    color: var(--muted);
}

.wb-stage {
    position: relative;
    height: 168px;
    display: grid;
    place-items: center;
    border: 1px solid var(--line);
    background-color: var(--surface-2);
    background-image: linear-gradient(var(--line-dim) 1px, transparent 1px), linear-gradient(90deg, var(--line-dim) 1px, transparent 1px);
    background-size: 12px 12px;
}

.wb-glow-box {
    padding: 0.9rem 1.8rem;
    border: 1px solid var(--base-color);
    background: var(--surface);
    font-family: var(--font-headers);
    font-size: 1.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #fff;
}

.wb-cut {
    width: 170px;
    height: 100px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, var(--base-color), var(--violet));
    font-family: var(--font-headers);
    font-size: 1.1rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #fff;
}

.wb-stage.vp {
    place-items: center start;
    padding: 0 1rem;
    overflow: hidden;
}

.wb-vp {
    position: relative;
    height: 136px;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 1px dashed var(--violet-soft);
    background: rgba(8, 8, 12, 0.7);
    min-width: 0;
}

.wb-vp-lab {
    position: absolute;
    top: 5px;
    left: 7px;
    font-family: var(--font-headers);
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    color: var(--violet);
}

.wb-vp-txt {
    font-family: var(--font-body);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: #fff;
    white-space: nowrap;
}

.wb-stage.pal {
    display: block;
    place-items: normal;
    padding: 0.8rem;
}

.wb-sws {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(9, minmax(0, 1fr));
    gap: 4px;
}

.wb-sw {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    min-width: 0;
}

.wb-sw i {
    flex: 1;
    border: 1px solid var(--line);
}

.wb-sw span {
    font-family: var(--font-headers);
    font-size: 0.6rem;
    letter-spacing: 0.04em;
    color: var(--muted);
    text-align: center;
    line-height: 1.2;
}

.wb-ctl {
    display: grid;
    gap: 1rem;
    margin-top: 1.4rem;
}

.ctl {
    display: grid;
    gap: 0.5rem;
}

.ctl-h {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-family: var(--font-headers);
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
}

.ctl-h output {
    color: #fff;
    letter-spacing: 0.04em;
}

.ctl-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
}

.ctl-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
}

.ctl-pair.split {
    grid-template-columns: auto 1fr;
    align-items: end;
}

.cut-many {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.8rem 1rem;
}

.num {
    display: grid;
    gap: 0.3rem;
    font-family: var(--font-headers);
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
}

.num input {
    width: 100%;
    min-width: 0;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 0;
    color: #fff;
    font-family: var(--font-headers);
    font-size: 1rem;
    padding: 0.45rem 0.6rem;
}

.num input:focus-visible {
    outline: 1px solid var(--violet);
    outline-offset: 2px;
    border-color: var(--violet);
}

.wb-tile input[type="color"] {
    appearance: none;
    width: 40px;
    height: 32px;
    padding: 0;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 0;
    cursor: pointer;
}

.wb-tile input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 3px;
}

.wb-tile input[type="color"]::-webkit-color-swatch {
    border: 0;
}

.wb-tile input[type="color"]::-moz-color-swatch {
    border: 0;
}

.wb-tile input[type="color"]:hover {
    border-color: var(--violet);
}

.wb-tile input[type="color"]:focus-visible {
    outline: 1px solid var(--violet);
    outline-offset: 3px;
}

.chip {
    background: transparent;
    border: 1px solid var(--line);
    color: var(--muted);
    font-family: var(--font-headers);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.45rem 0.85rem;
    cursor: pointer;
}

.chip:hover {
    border-color: var(--violet);
    color: #fff;
}

.chip:focus-visible {
    outline: 1px solid var(--violet);
    outline-offset: 3px;
}

.chip[aria-pressed="true"] {
    color: #fff;
    border-color: var(--base-color);
    background: rgba(255, 45, 85, 0.12);
}

.wb-tile input[type="range"] {
    appearance: none;
    width: 100%;
    height: 22px;
    margin: 0;
    background: transparent;
    cursor: pointer;
}

.wb-tile input[type="range"]::-webkit-slider-runnable-track {
    height: 1px;
    background: var(--line);
}

.wb-tile input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    margin-top: -6px;
    background: var(--bg);
    border: 1px solid var(--base-color);
    transform: rotate(45deg);
}

.wb-tile input[type="range"]::-moz-range-track {
    height: 1px;
    background: var(--line);
}

.wb-tile input[type="range"]::-moz-range-thumb {
    width: 11px;
    height: 11px;
    background: var(--bg);
    border: 1px solid var(--base-color);
    border-radius: 0;
    transform: rotate(45deg);
}

.wb-tile input[type="range"]:hover::-webkit-slider-thumb,
.wb-tile input[type="range"]:focus-visible::-webkit-slider-thumb {
    box-shadow: var(--glow-red);
}

.wb-tile input[type="range"]:hover::-moz-range-thumb,
.wb-tile input[type="range"]:focus-visible::-moz-range-thumb {
    box-shadow: var(--glow-red);
}

.wb-tile input[type="range"]:focus-visible {
    outline: none;
}

.chip:disabled,
.num input:disabled,
.wb-tile input[type="range"]:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.wb-out {
    margin-top: auto;
    padding-top: 1.4rem;
    display: grid;
    gap: 0.8rem;
}

.wb-code {
    margin: 0;
    padding: 0.9rem 1rem;
    background: var(--surface);
    border: 1px solid var(--line);
    font-family: var(--font-headers);
    font-size: 0.74rem;
    line-height: 1.65;
    color: #cfcfdb;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    min-width: 0;
}

.wb-maths {
    display: grid;
    gap: 0.15rem;
    font-family: var(--font-headers);
    font-size: 0.64rem;
    line-height: 1.5;
    color: var(--muted);
    overflow-wrap: anywhere;
}

.wb-btns {
    display: flex;
    gap: 0.6rem;
}

.btn.sm {
    padding: 0.45rem 0.9rem;
    font-size: 0.7rem;
}

@media (min-width: 768px) {
    .wb-tile {
        padding: 1.5rem;
    }
}

@media (min-width: 1024px) {
    .wb-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .wb-tile {
        padding: 1.8rem;
    }
}

@media (prefers-reduced-motion: no-preference) {
    .chip,
    .wb-tile input[type="color"],
    .num input {
        transition: border-color 0.25s, color 0.25s, background-color 0.25s;
    }
}
</style>
