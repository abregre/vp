<template>
    <section class="faq-section">
        <div class="section-header">
            <h1 class="main-content-title">FAQ</h1>

            <img v-scroll-to="'#workSection'" :src="require('@/assets/svg/double-arrow-down.svg')" alt="skip section" class="skip-btn">

        </div>
        <div
            v-for="faq in faqItems"
            :key="faq.id"
            class="faq-item"
        >
            <div class="screen screen-1">
                <strong>Question:</strong> {{ faq.question }}
            </div>
            <div class="screen screen-2">
                <strong>Answer:</strong> {{ faq.answer }}
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
                        question: 'What is MiniMecha?',
                        answer: 'MiniMecha is a project launched by a team of gaming and crypto enthusiasts with a vision to expand blockchain based, play-to-earn gaming. This will commence with a collection of 10,000 unique NFTs on the Solana blockchain. We will let the art speak for itself.'
                    },
                    {
                        id: 2,
                        question: 'Why MiniMecha?',
                        answer: 'We are tired of card games. It’s time to work on a game that combines NFTs and play-to-earn gaming with the best elements from the games that have defined our childhood. We want to create immersive gaming with assets players can own; supported by a strong community.'
                    },
                    {
                        id: 3,
                        question: 'What network are MiniMecha NFTs on?',
                        answer: 'MiniMecha will be released on the Solana blockchain which means no high Eth gas fees.'
                    },
                    {
                        id: 4,
                        question: 'How was MiniMecha created?',
                        answer: 'Each component of the Generation 0 MiniMecha: Background, Aura, Body, Attachment, Weapon, Head, Mouth and Eye was illustrated first. These elements were then combined algorithmically to create unique Mechs.'
                    },
                    {
                        id: 5,
                        question: 'How much does it cost to mint a MiniMecha NFT?',
                        answer: 'Each Generation 0 MechaSmith will cost 2 SOL to mint. While transaction fees on Solana are minimal, please allow for a further 0.1 Solana on top for the minting.'
                    },
                    {
                        id: 6,
                        question: 'How many MiniMecha will be available?',
                        answer: 'A total of 10,000 Generation 0 MiniMecha NFTs will be available for minting.<br>Since each player needs a Mech before they can play MiniMecha, we may release future generations of Mechs to support game growth or development. However this will be done on an as needed basis. Any future MiniMecha minted will not replicate Generation 0 MiniMecha.'
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
                        duration: 1,
                        stagger: 0.2
                    })
                },
                onLeave: batch => {
                    gsap.to(batch, {
                        y: 0,
                        duration: 1,
                        stagger: 0.2
                    })
                },
                onEnterBack: batch => {
                    gsap.from(batch, {
                        y: -200,
                        duration: 1,
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
    margin: 0 auto;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main-content-title {
    font-size: var(--mobile-font-title);
    line-height: 3.3rem;
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

.faq-item {
    display: flex;
    flex-direction: column;
}

.screen {
    max-width: 250px;
    width: 100%;
    border: 3px solid #fff;
    box-shadow: var(--text-shadow-light);
    padding: 1rem;
    background: #fff;
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

    .faq-item {
        margin-top: 2rem;
    }

    .screen {
        max-width: 350px;
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

/* @media screen and (min-width: 1048px) {

} */
</style>
