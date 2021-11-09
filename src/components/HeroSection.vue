<template>
    <section class="hero-section">
        <div class="info-container">
            <h1 class="route-title"> &lt;FRONT-END <br>ENGINEER &lt;&#47;&gt;</h1>
            <p>Currently available for contract only</p>
        </div>
    </section>
</template>

<script>
    export default {

    }
</script>

<style scoped>
.hero-section {
    color: var(--font-color);
    position: relative;
    min-height: 100vh;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
}

h1 {
    font-size: 3.4rem;
    margin-bottom: 1rem;
    user-select: none;
}

p {
    font-size: 1.1rem;
    padding-left: 0.5rem;
    user-select: none;
}

@media screen and (min-width: 768px) {
    h1 {
        font-size: 6rem;
    }

    p {
        font-size: 1.4rem;
    }
}

@media screen and (min-width: 1024px) {
    .hero-section {
        width: 85%;
    }

    h1 {
        font-size: 10rem;
    }

    p {
        font-size: 1.5rem;
        padding-left: 1rem;
    }
}

</style>
