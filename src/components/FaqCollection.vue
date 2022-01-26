<template>
    <div class="container">
        <h1 class="main-content-title">FAQ</h1>
        <div class="faq-container">
            <faq-item
                v-for="faqItem in faqItems"
                :key="faqItem.id"
                :faq-item="faqItem"
            />
        </div>
    </div>
</template>

<script>
    import FaqItem from '@/components/FaqItem'
    export default {
        components: {
            FaqItem
        },
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
        }
    }
</script>

<style scoped>

.container {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 15vh 1fr;
    grid-auto-flow: row;
}

.main-content-title {
    font-size: var(--mobile-font-title);
    line-height: 3.3rem;
    font-family: var(--font-headers);
    font-weight: 700;
    margin-bottom: 3rem;
}

.faq-container {
    width: 100%;
}

@media screen and (min-width: 768px) {
    .main-content-title {
        font-size: var(--tablet-font-title);
    }
}

@media screen and (min-width: 1048px) {
    .container {
        width: 95%;
        align-items: flex-start;
    }

    .main-content-title {
        margin-bottom: 5rem;
    }
}
</style>
