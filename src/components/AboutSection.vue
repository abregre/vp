<template>
    <section id="aboutSection" class="about-section">
        <h1 class="title">About Me</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi est tempora, aperiam nisi voluptatum ducimus ad, adipisci maiores aliquid tempore odio, quas ea distinctio reiciendis? Quibusdam amet nostrum quae excepturi eum nesciunt dignissimos dolor facere ab ratione sit expedita incidunt architecto ducimus, voluptatibus sint odit alias adipisci assumenda in nam perferendis aliquid! Itaque tempora, excepturi tempore accusantium recusandae, possimus debitis doloribus nisi placeat,</p><p> beatae alias dolorum in. Doloribus totam omnis itaque est, dolore hic ratione harum in, inventore dolorem quisquam officia deleniti perferendis voluptatum fuga?Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eum ipsa voluptate doloribus, quaerat in iste placeat natus officia voluptas tempore eos ullam veritatis, labore minima? Mollitia quibusdam magnam voluptatum numquam tempore excepturi iusto deserunt nostrum, culpa nesciunt omnis! Debitis iusto iste commodi officia deserunt obcaecati magnam eveniet assumenda facilis?</p>
    </section>
</template>

<script>
    export default {

    }
</script>

<style scoped>
.about-section {
    color: var(--font-color);
    position: relative;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: 2rem 0;
}

.title {
    font-size: var(--mobile-font-title);
    margin-bottom: 3rem;
}

p {
    margin: 0.75rem 0;
    font-size: var(--mobile-font-body);
    line-height: calc(var(--mobile-font-body) + 0.5rem);
    text-align: justify;
}
</style>
