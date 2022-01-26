<template>
    <section id="infoSection" class="info-section">
        <div class="section-header">
            <h2 class="main-content-title">INFO</h2>
        </div>
        <form @submit.prevent="sendEmail">
            <label>Name</label>
            <input v-model="name" type="text" required>
            <button type="submit">Submit</button>
        </form>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                name: ''
            }
        },
        methods: {
            sendEmail() {
                this.$store.dispatch('sendEmail', { name: this.name })
            }
        }
    }
</script>

<style scoped>
.info-section {
    color: var(--font-color);
    position: relative;
    width: 90%;
    margin: 3rem auto;
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

@media screen and (min-width: 768px) {
    .main-content-title {
        font-size: var(--tablet-font-title);
    }
}

/*
@media screen and (min-width: 1048px) {

} */
</style>
