<template>
    <section id="workSection" class="work-section">
        <div class="section-header">
            <h2 class="main-content-title">WORKS</h2>
        </div>
        <div class="screen">
            <h2 class="works-title">Websites and Apps</h2>
            <div class="works-container">
                <a class="project-link" href="http://minimecha.io/" target="_blank">
                    <div class="card">
                        <div class="card-header">
                            <img :src="require('@/assets/work-previews/minimecha.png')" alt="preview devices image" class="card-image">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">Minimecha NFT Website</h3>
                            <p class="card-text">
                                Development of landing page for minimecha NFT website.
                            </p>
                        </div>
                    </div>
                </a>
                <a class="project-link" href="https://elpedisonxmas.elpedison.gr" target="_blank">
                    <div class="card">
                        <div class="card-header">
                            <img :src="require('@/assets/work-previews/elpedison.png')" alt="preview devices image" class="card-image">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">ElPedison Promo contest minisite</h3>
                            <p class="card-text">
                                Development of the minisite for ElPedison Promo contest. Form was has validation and recaptcha v3 verification.
                            </p>
                        </div>
                    </div>
                </a>
                <a class="project-link" href="https://cv.karelia.gr/" target="_blank">
                    <div class="card">
                        <div class="card-header">
                            <img :src="require('@/assets/work-previews/karelia.png')" alt="preview devices image" class="card-image">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">Karelia CV Submission Page</h3>
                            <p class="card-text">
                                Custom CV submission form for Karelia's website. Developed without a design based on the current website.
                            </p>
                        </div>
                    </div>
                </a>
                <a class="project-link" href="https://anedik.mpass.ltd" target="_blank">
                    <div class="card">
                        <div class="card-header">
                            <img :src="require('@/assets/work-previews/anedik.png')" alt="preview devices image" class="card-image">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">KRITIKOS Club Card Registration</h3>
                            <p class="card-text">
                                Fully developed the web app without a design. 4 different pages for registration, including OTP authentication, details submission and email verification.
                            </p>
                        </div>
                    </div>
                </a>
                <a class="project-link" href="https://my-market-gaiming.mpass.ltd/app" target="_blank">
                    <div class="card">
                        <div class="card-header">
                            <img :src="require('@/assets/work-previews/my-market.png')" alt="preview devices image" class="card-image">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">Cycling Gaiming Platform</h3>
                            <p class="card-text">
                                Development of the web app for the Cycling Gaiming Platform of MyMarket.
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="screen">
            <h2 class="works-title">Games</h2>
            <div class="works-container">
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
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    export default {
        mounted() {
            gsap.registerPlugin(ScrollTrigger)
            ScrollTrigger.batch('.card', {
                once: true,
                onEnter: batch => {
                    gsap.from(batch, {
                        autoAlpha: 0,
                        y: 100,
                        duration: 1,
                        stagger: 0.2
                    })
                }
            })
        }
    }
</script>

<style scoped>
.work-section {
    color: var(--font-color);
    position: relative;
    width: 90%;
    margin: 3rem auto 5rem;
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

.works-container + .works-title {
    margin-top: 2rem;
}

.works-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
}

.project-link {
    text-decoration: none;
    color: hsla(0, 0%, 0%, 0.75);
}

.card {
    width: 100%;
    max-width: 400px;
    display: grid;
    grid-template-rows: 250px 1fr;
    margin: 1rem;
}

.card.big-screen {
    max-width: 280px;
}

.card-header {
    width: 100%;
    border-radius: 10px;
    display: grid;
    place-items: center;
}

.card-image {
    width: 100%;
    height: auto;
}

.card-body {
    display: grid;
    grid-template-rows: 40px 1fr;
    align-items: flex-start;
    text-align: center;
    padding: 1rem 0;
}

.card-text {
    padding: 1rem 0;
}

@media screen and (min-width: 768px) {
    .main-content-title {
        font-size: var(--tablet-font-title);
    }
}

</style>
