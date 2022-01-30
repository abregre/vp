<template>
    <section id="faqSection" class="faq-section">
        <div class="section-header">
            <h2 class="main-content-title">FAQ</h2>
            <img
                v-scroll-to="'#workSection'"
                :src="require('@/assets/svg/double-arrow-down.svg')"
                alt="skip section"
                class="skip-btn"
                title="Skip to next section"
            >
        </div>
        <p class="faq-intro">
            I know about pages can be really boring to read, so I decided to make a section with some frequently asked questions and answers about me. I hope you enjoy it.
        </p>
        <div
            v-for="faq in faqItems"
            :key="faq.id"
            class="faq-item"
        >
            <div class="screen screen-1">
                <strong>Question:</strong> <span v-dompurify-html="faq.question" />
            </div>
            <div class="screen screen-2">
                <strong>Answer:</strong> <span v-dompurify-html="faq.answer" />
            </div>
        </div>
    </section>
</template>

<script>
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    export default {
        data() {
            return {
                faqItems: [
                    {
                        id: 1,
                        question: 'Who are you?',
                        answer: 'Hey, I\'m Vasilis, a creative self-taught Frontend Engineer.I am from <strong>Greece</strong> and I currently live in the Thessaloniki. I have a keen eye for design and enjoy building interactive, effect heavy javascript applications with an eye on animated content.<br>Travelling is my passion, so I am always thrilled for a new trip. '
                    },
                    {
                        id: 2,
                        question: 'What\'s your work experience?',
                        answer: 'I have worked in different sectors in the past, but I am currently working as a frontend engineer. I have plenty of experience offering great user experiences as a salesman. I have some experience in photo edit and design tools through my photography professional engagement before.'
                    },
                    {
                        id: 3,
                        question: 'What\'s your strongest skills as a Frontend Engineer?',
                        answer: 'Clean code, fast and efficient development, and a good team player. I am always looking for new challenges and opportunities to grow my skills, but i consider myself good with the <strong>Vue Ecosystem</strong>, <strong>JavaScript</strong> and <strong>CSS</strong>.'
                    },
                    {
                        id: 4,
                        question: 'What production projects have you been involved?',
                        answer: `Below are some of the type of projects I 've been involved in.<br>
                                <ul style="list-style:square;padding-left:1rem;">
                                    <li>Custom CMS</li>
                                    <li>Full Web Apps</li>
                                    <li>Touch points Embedded Web App</li>
                                    <li>Javascript HTML5 Canvas mini Games</li>
                                    <li>Freelance Jobs as some NFT websites</li>
                                </ul>`
                    },
                    {
                        id: 5,
                        question: 'Can you tell me some skills you want to improve?',
                        answer: `As a Frontend Engineer, I want to improve my skills in:<br>
                                <ul style="list-style:square;padding-left:1rem;">
                                    <li>Unit Testing</li>
                                    <li>Graph Databases</li>
                                    <li>Animations/Transitions</li>
                                </ul>
                                Always interested for the entire frontend spectrum of web development, studying books for design patterns and clean arhitectures<br>`
                    },
                    {
                        id: 6,
                        question: 'Are there any technologies that you avoid?',
                        answer: 'Overall I\'m pretty open to new technologies, but I\'m not afraid to try new ones. I\'m also very open to learning new languages and frameworks, but there are some frameworks and libraries that I wouldn\'t like to use such as WordPress, JQuery and Angular.'
                    }

                ]
            }
        },
        mounted() {
            gsap.registerPlugin(ScrollTrigger)
            ScrollTrigger.batch('.faq-item', {
                onEnter: batch => {
                    gsap.from(batch, {
                        autoAlpha: 0,
                        y: 200,
                        duration: 0.5,
                        stagger: 0.2
                    })
                },
                onEnterBack: batch => {
                    gsap.from(batch, {
                        y: -200,
                        duration: 0.5,
                        stagger: 0.2
                    })
                }
            })
        }
    }
</script>

<style scoped>
.faq-section {
    color: var(--font-color);
    position: relative;
    width: 90%;
    margin: 3rem auto;
    max-width: 1400px;
}

strong {
    font-size: calc(1.1rem * 1.3);
    font-weight: bolder;
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

.skip-btn {
    margin: auto 0;
    width: 40px;
    height: 40px;
    cursor: pointer;
    filter: var(--box-shadow-light);
}

.faq-intro {
    font-size: var(--mobile-font-body);
    line-height: 1.5;
    margin: 2rem auto;
    text-shadow: var(--text-shadow-light);
    text-align: center;
    max-width: 60ch;
}

.faq-item {
    display: flex;
    flex-direction: column;
    max-width: 1500px;
    margin: 0 auto;
}

.screen {
    max-width: 30ch;
    width: 100%;
    box-shadow: var(--text-shadow-light);
    padding: 1rem;
    background: var(--background-overlay);
    color: hsla(0, 0%, 0%, 0.75);
    font-size: 1.1rem;
    font-family: var(--font-headers);
    border-radius: 10px;
}

.screen-1 {
    margin-top: 2rem;
    align-self: flex-start;
}

.screen-2 {
    margin-top: 1rem;
    align-self: flex-end;
}

@media screen and (min-width: 768px) {
    .main-content-title {
        font-size: var(--tablet-font-title);
    }

    .faq-intro {
        font-size: var(--tablet-font-body);
        line-height: 1.5;
        margin: 2rem auto;
        text-shadow: var(--text-shadow-light);
        text-align: center;
        max-width: 70ch;
    }

    .faq-item {
        margin-top: 2rem;
    }

    .screen {
        max-width: 50ch;
        padding: 1.3rem;
        font-size: 1.3rem;
    }

    .screen-1 {
        margin-top: 3rem;
    }

    .screen-2 {
        margin-top: 2rem;
    }
}

@media screen and (min-width: 1048px) {
    .screen {
        max-width: 60ch;
        padding: 1.5rem;
        font-size: 1.25rem;
    }
}
</style>
