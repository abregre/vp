<template>
    <div class="faq-item">
        <div class="faq-item-title">
            <div class="faq-item-question"><span>{{ faqItem.question }}</span></div>
        </div>
        <div class="accordion-panel">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="faq-item-text" v-html="faqItem.answer">
                {{ faqItem.answer }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            faqItem: {
                type: Object,
                required: true
            }
        }

    }
</script>

<style scoped>
.faq-item + .faq-item {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #fff;
}

.faq-item-title {
    font-size: var(--desktop-font-body);
    text-shadow: var(--text-shadow);
    font-family: var(--font-headers);
    font-weight: 700;
    margin: auto 0 1rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
}

.faq-item-text {
    font-size: var(--mobile-font-body);
    opacity: 0.7;
}

@media screen and (min-width: 1048px) {
    .faq-item-title {
        font-size: calc(var(--desktop-font-body) + 0.5rem);
    }
}
</style>
