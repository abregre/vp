<template>
    <section id="workSection" class="work-section">
        <div class="section-header">
            <h2 class="main-content-title">WORKS</h2>
        </div>
        <div class="screen">
            <h2>Games</h2>
            <div class="games-container">
                <div class="card">
                    <div class="card-header">
                        <img :src="require('@/assets/work-previews/combo-game-1.png')" alt="preview devices image" class="card-image">
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">Drag N Drop Game</h3>
                        <p class="card-text">
                            Drop the items on the map based on their origins.
                        </p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <img :src="require('@/assets/work-previews/combo-game-2.png')" alt="preview devices image" class="card-image">
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">Word Completion Game</h3>
                        <p class="card-text">
                            Drag the words to complete the sentence.
                        </p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <img :src="require('@/assets/work-previews/combo-game-3.png')" alt="preview devices image" class="card-image">
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">Video Quiz Game</h3>
                        <p class="card-text">
                            Watch the video and answer the questions.
                        </p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <img :src="require('@/assets/work-previews/combo-game-4.png')" alt="preview devices image" class="card-image">
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">Catcher Game</h3>
                        <p class="card-text">
                            Move the player and catch all the falling items.
                        </p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <img :src="require('@/assets/work-previews/combo-game-5.png')" alt="preview devices image" class="card-image">
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">Find the Differences Game</h3>
                        <p class="card-text">
                            Find the differences between the two images.
                        </p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <img :src="require('@/assets/work-previews/combo-game-6.png')" alt="preview devices image" class="card-image">
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">Memory Cards Game</h3>
                        <p class="card-text">
                            Tap the cards to reveal and match them.
                        </p>
                    </div>
                </div>
            </div>
        </div>

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
    box-shadow: var(--text-shadow-light);
    padding: 2rem 1rem;
    background: var(--background-overlay);
    color: hsla(0, 0%, 0%, 0.75);
    font-size: 1.1rem;
    font-family: var(--font-headers);
    border-radius: 10px;
}

.games-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

.card {
    width: 100%;
    max-width: 300px;
}

.card-header {
    width: 100%;
    min-height: 200px;
    border-radius: 10px;
    display: grid;
    place-items: center;
}

.card-image {
    width: 100%;
    height: auto;
}

.card-body {
    text-align: center;
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
