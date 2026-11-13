<template>
    <Teleport to="body">
        <div ref="ov" class="io" hidden aria-hidden="true">
            <div ref="box" class="io-box" />
            <div ref="padT" class="io-pad" />
            <div ref="padR" class="io-pad" />
            <div ref="padB" class="io-pad" />
            <div ref="padL" class="io-pad" />
            <div ref="plab" class="io-pl" />
            <div ref="hl" class="io-h">
                <span class="tk a" /><span class="ln" /><span class="tk b" /><span ref="hlab" class="io-lab" />
            </div>
            <div ref="vl" class="io-v">
                <span class="tk a" /><span class="ln" /><span class="tk b" /><span ref="vlab" class="io-lab" />
            </div>
        </div>
    </Teleport>
</template>

<script setup>
    import { ref, watch, onBeforeUnmount } from 'vue'
    import { useInspect } from '@/composables/useInspect'

    const { inspectOn } = useInspect()

    const ov = ref(null)
    const box = ref(null)
    const padT = ref(null)
    const padR = ref(null)
    const padB = ref(null)
    const padL = ref(null)
    const plab = ref(null)
    const hl = ref(null)
    const vl = ref(null)
    const hlab = ref(null)
    const vlab = ref(null)

    let mx = -1
    let my = -1
    let queued = false
    let mq = null

    function put(el, x, y, w, h) {
        el.style.left = x + 'px'
        el.style.top = y + 'px'
        if (w != null) {
            el.style.width = Math.max(w, 0) + 'px'
            el.style.height = Math.max(h, 0) + 'px'
        }
    }

    function frame() {
        queued = false
        if (!ov.value) return
        if (!inspectOn.value || mx < 0) {
            ov.value.hidden = true
            return
        }
        const el = document.elementFromPoint(mx, my)
        if (!el || el === document.documentElement || el === document.body) {
            ov.value.hidden = true
            return
        }
        const r = el.getBoundingClientRect()
        if (r.width < 1 && r.height < 1) {
            ov.value.hidden = true
            return
        }
        const cs = getComputedStyle(el)
        const pt = parseFloat(cs.paddingTop) || 0
        const pr = parseFloat(cs.paddingRight) || 0
        const pb = parseFloat(cs.paddingBottom) || 0
        const pl = parseFloat(cs.paddingLeft) || 0
        const bt = parseFloat(cs.borderTopWidth) || 0
        const br = parseFloat(cs.borderRightWidth) || 0
        const bb = parseFloat(cs.borderBottomWidth) || 0
        const bl = parseFloat(cs.borderLeftWidth) || 0
        const vw = window.innerWidth
        const vh = window.innerHeight
        ov.value.hidden = false
        put(box.value, r.left, r.top, r.width, r.height)
        const ix = r.left + bl
        const iy = r.top + bt
        const iw = r.width - bl - br
        const ih = r.height - bt - bb
        put(padT.value, ix, iy, iw, pt)
        put(padB.value, ix, iy + ih - pb, iw, pb)
        put(padL.value, ix, iy + pt, pl, ih - pt - pb)
        put(padR.value, ix + iw - pr, iy + pt, pr, ih - pt - pb)
        if (pt || pr || pb || pl) {
            const q = [pt, pr, pb, pl].map(Math.round)
            plab.value.textContent = 'pad ' + (q[0] === q[1] && q[1] === q[2] && q[2] === q[3] ? q[0] : q.join(' '))
            plab.value.hidden = false
            put(plab.value, ix + 4, iy + 4)
        } else {
            plab.value.hidden = true
        }
        const x1 = Math.max(r.left, 0)
        const x2 = Math.min(r.right, vw)
        const y1 = Math.max(r.top, 0)
        const y2 = Math.min(r.bottom, vh)
        const hy = r.top >= 22 ? r.top - 18 : (r.bottom <= vh - 22 ? r.bottom + 4 : y1 + 4)
        const vx = r.left >= 22 ? r.left - 18 : (r.right <= vw - 22 ? r.right + 4 : x1 + 4)
        put(hl.value, x1, hy, x2 - x1, 14)
        put(vl.value, vx, y1, 14, y2 - y1)
        hlab.value.textContent = Math.round(r.width) + ' px'
        vlab.value.textContent = Math.round(r.height) + ' px'
    }

    function sched() {
        if (!queued) {
            queued = true
            requestAnimationFrame(frame)
        }
    }

    function onMove(e) {
        mx = e.clientX
        my = e.clientY
        sched()
    }

    function onLeave() {
        mx = -1
        sched()
    }

    function onKey(e) {
        if (e.key === 'Escape') inspectOn.value = false
    }

    function onMq(e) {
        if (e.matches) inspectOn.value = false
    }

    function attach() {
        document.addEventListener('pointermove', onMove, { passive: true })
        document.documentElement.addEventListener('pointerleave', onLeave)
        window.addEventListener('scroll', sched, { passive: true })
        window.addEventListener('resize', sched)
        document.addEventListener('keydown', onKey)
        mq = window.matchMedia('(max-width: 768px), (hover: none)')
        mq.addEventListener('change', onMq)
        if (mq.matches) inspectOn.value = false
        sched()
    }

    function detach() {
        document.removeEventListener('pointermove', onMove)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        window.removeEventListener('scroll', sched)
        window.removeEventListener('resize', sched)
        document.removeEventListener('keydown', onKey)
        if (mq) {
            mq.removeEventListener('change', onMq)
            mq = null
        }
        mx = -1
        if (ov.value) ov.value.hidden = true
    }

    watch(inspectOn, (v) => {
        if (v) attach()
        else detach()
    })

    onBeforeUnmount(() => {
        detach()
        inspectOn.value = false
    })
</script>

<style scoped>
.io {
    position: fixed;
    inset: 0;
    z-index: 70;
    pointer-events: none;
    contain: strict;
}

.io[hidden] { display: none; }

.io-box {
    position: absolute;
    border: 1px solid var(--violet);
    background: rgba(155, 107, 255, 0.07);
    box-shadow: var(--glow-violet);
}

.io-pad {
    position: absolute;
    background: repeating-linear-gradient(135deg, rgba(255, 45, 85, 0.45) 0 1px, transparent 1px 5px), rgba(255, 45, 85, 0.08);
}

.io-pl {
    position: absolute;
    padding: 0.1rem 0.35rem;
    background: rgba(8, 8, 12, 0.88);
    border: 1px solid var(--line-red);
    font-family: var(--font-headers);
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    color: var(--base-color-hover);
    white-space: nowrap;
    line-height: 1.3;
}

.io-h {
    position: absolute;
    height: 14px;
    display: flex;
    align-items: center;
}

.io-h .ln {
    flex: 1;
    height: 1px;
    background: var(--violet);
    box-shadow: var(--glow-violet);
}

.io-h .tk,
.io-v .tk {
    position: absolute;
    background: var(--violet);
}

.io-h .tk {
    top: 0;
    width: 1px;
    height: 14px;
}

.io-h .tk.a { left: 0; }

.io-h .tk.b { right: 0; }

.io-v {
    position: absolute;
    width: 14px;
}

.io-v .ln {
    position: absolute;
    left: 6px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--violet);
    box-shadow: var(--glow-violet);
}

.io-v .tk {
    left: 0;
    width: 14px;
    height: 1px;
}

.io-v .tk.a { top: 0; }

.io-v .tk.b { bottom: 0; }

.io-lab {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bg);
    padding: 0.1rem 0.5rem;
    font-family: var(--font-headers);
    font-size: 0.66rem;
    line-height: 1.2;
    letter-spacing: 0.1em;
    color: var(--violet);
    white-space: nowrap;
}

.io-v .io-lab {
    left: 7px;
    transform: translate(-50%, -50%) rotate(-90deg);
}
</style>
