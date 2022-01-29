<template>
    <section id="infoSection" class="info-section">
        <div class="section-header">
            <h2 class="main-content-title">INFO</h2>
        </div>
        <div class="screen social-container">
            <h3>Social Links</h3>
            <div class="social-container-links">

                <a href="https://github.com/abregre" class="social-link" target="_blank">
                    <img :src="require('@/assets/svg/social-icons/github-logo.svg')" alt="Github Link">
                </a>
                <a href="https://www.linkedin.com/in/vpaparidis/" class="social-link" target="_blank">
                    <img :src="require('@/assets/svg/social-icons/linkedin-logo.svg')" alt="Linkedin Link">
                </a>
                <a href="https://stackoverflow.com/users/12664279/abregre" class="social-link" target="_blank">
                    <img :src="require('@/assets/svg/social-icons/stackoverflow-logo.svg')" alt="Stackoverflow Link">
                </a>
            </div>
        </div>
        <div class="screen site-info">
            <h3 class="site-info-title">Site Info</h3>
            <ul class="site-info-body">
                <li>
                    This site is built on <a href="https://vuejs.org/" target="_blank">Vue.js</a> Framework.
                </li>
                <li>
                    UI/UX is fully custom and developed by me.
                </li>
                <li>
                    GSAP, ScrollTrigger and TextPlugin from <a href="https://greensock.com/" target="_blank">GreenSock
                    </a> are used for the animations.
                </li>
                <li>
                    Background photo by <a href="https://unsplash.com/@jeremythomasphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Jeremy Thomas</a> on <a href="https://unsplash.com/s/photos/space?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Unsplash</a>
                    and <a href="https://particles.js.org/" target="_blank">Particles.js</a>
                </li>
                <li>
                    SVG icons from <a href="https://freesvg.org/" target="_blank">freesvg.org</a>
                </li>
                <li>
                    Soundtrack Cosmic Glow by <a href="https://freesound.org/people/Andrewkn/" target="_blank">Andrewkn</a>
                </li>
            </ul>
        </div>

        <div class="logo-svg-container">
            <img :src="require('@/assets/svg/logo-svg.svg')" alt="logo" class="logo-svg">

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
.info-section {
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

.social-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.social-container-links {
    width: 100%;
    max-width: 400px;
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.social-link img {
    height: 60px;
    width: auto;
}

.site-info-title {
    font-size: 1.3rem;
    font-weight: 700;
}

.site-info-body {
    margin-top: 1rem;
    list-style: square;
    padding-left: 1rem;
}

.site-info-body a {
    font-size: calc(1.1rem * 1.1);
    font-weight: 700;
    text-decoration: none;
    color: var(--base-color);
}

.logo-svg-container {
    max-width: 300px;
    margin: 2rem auto 0;
}

.logo-svg {
    width: 100%;
}

@media screen and (min-width: 768px) {
    .main-content-title {
        font-size: var(--tablet-font-title);
    }

    .social-link img {
        height: 70px;
        width: auto;
    }

    .site-info-body {
        font-size: var(--tablet-font-body);
        line-height: calc(var(--tablet-font-body) * 1.5);
    }

    .site-info-body a {
        font-size: calc(var(--tablet-font-body) * 1.1);
    }
}

/*
@media screen and (min-width: 1048px) {

} */
</style>
