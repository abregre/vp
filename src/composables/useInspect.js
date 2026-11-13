import { ref } from 'vue'

const inspectOn = ref(false)

export function useInspect() {
    return { inspectOn }
}
