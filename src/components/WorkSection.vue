<template>
    <section id="workSection" class="work-section">
        <div class="section-header">
            <h2 class="main-content-title">INFO</h2>
        </div>
        <div class="screen" />

    </section>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        methods: {

        }
    }
</script>

<style scoped>
.work-section {
    color: var(--font-color);
    position: relative;
    width: 90%;
    margin: 3rem auto 0;
    max-width: 1400px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main-content-title {
    font-size: var(--mobile-font-title);
    font-family: var(--font-headers);
    font-weight: 700;
    text-shadow: var(--text-shadow-light);
}

.screen {
    margin-top: 2rem;
    width: 100%;
    border: 3px solid #fff;
    box-shadow: var(--text-shadow-light);
    padding: 2rem 1rem;
    background: #fff;
    color: hsla(0, 0%, 0%, 0.75);
    font-size: 1.1rem;
    font-family: var(--font-headers);
    border-radius: 10px;
}

@media screen and (min-width: 768px) {
    .main-content-title {
        font-size: var(--tablet-font-title);
    }
}

/*
@media screen and (min-width: 1048px) {

} */
</style>
